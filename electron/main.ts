import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { app, BrowserWindow, ipcMain } from "electron";

import type { AdventureState } from "../src/domain/types/AdventureState";
import type { AdventureSummary } from "../src/domain/types/AdventureSummary";
import type { GameSettings } from "../src/settings/types/GameSettings";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let mainWindow: BrowserWindow | null = null;

interface PersistencePaths {
  adventuresDir: string;
  settingsFile: string;
}

const persistencePaths: PersistencePaths = {
  adventuresDir: "",
  settingsFile: "",
};

async function ensurePersistencePaths(): Promise<void> {
  const userDataDir = app.getPath("userData");
  persistencePaths.adventuresDir = path.join(userDataDir, "adventures");
  persistencePaths.settingsFile = path.join(userDataDir, "game-settings.json");
  await fs.mkdir(persistencePaths.adventuresDir, { recursive: true });
}

async function readAdventureFile(adventureId: string): Promise<AdventureState | null> {
  const filePath = path.join(persistencePaths.adventuresDir, `${adventureId}.json`);
  try {
    const contents = await fs.readFile(filePath, "utf-8");
    return JSON.parse(contents) as AdventureState;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

async function writeAdventureFile(adventure: AdventureState): Promise<void> {
  const filePath = path.join(persistencePaths.adventuresDir, `${adventure.metadata.id}.json`);
  const contents = `${JSON.stringify(adventure, null, 2)}\n`;
  await fs.writeFile(filePath, contents, "utf-8");
}

async function listAdventureSummaries(): Promise<AdventureSummary[]> {
  const entries = await fs.readdir(persistencePaths.adventuresDir);
  const summaries: AdventureSummary[] = [];

  for (const entry of entries) {
    if (!entry.endsWith(".json")) {
      continue;
    }

    const adventureId = entry.replace(/\.json$/, "");
    const adventure = await readAdventureFile(adventureId);
    if (adventure != null) {
      summaries.push({
        id: adventure.metadata.id,
        title: adventure.metadata.title,
        createdAt: adventure.metadata.createdAt,
        updatedAt: adventure.metadata.updatedAt,
        seedPrompt: adventure.metadata.seedPrompt,
      });
    }
  }

  summaries.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
  return summaries;
}

async function deleteAdventureFile(adventureId: string): Promise<void> {
  const filePath = path.join(persistencePaths.adventuresDir, `${adventureId}.json`);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}

async function loadSettingsFile(): Promise<GameSettings | null> {
  try {
    const contents = await fs.readFile(persistencePaths.settingsFile, "utf-8");
    return JSON.parse(contents) as GameSettings;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

async function saveSettingsFile(settings: GameSettings): Promise<void> {
  const contents = `${JSON.stringify(settings, null, 2)}\n`;
  await fs.writeFile(persistencePaths.settingsFile, contents, "utf-8");
}

function registerIpcHandlers(): void {
  ipcMain.handle("adventure:list", async () => listAdventureSummaries());
  ipcMain.handle("adventure:load", async (_event, adventureId: string) =>
    readAdventureFile(adventureId),
  );
  ipcMain.handle("adventure:save", async (_event, adventure: AdventureState) => {
    await writeAdventureFile(adventure);
    return true;
  });
  ipcMain.handle("adventure:delete", async (_event, adventureId: string) => {
    await deleteAdventureFile(adventureId);
    return true;
  });
  ipcMain.handle("settings:load", async () => loadSettingsFile());
  ipcMain.handle("settings:save", async (_event, settings: GameSettings) => {
    await saveSettingsFile(settings);
    return true;
  });
}

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    backgroundColor: "#05070a",
    icon: path.join(process.env.VITE_PUBLIC ?? "", "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    mainWindow = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app
  .whenReady()
  .then(async () => {
    await ensurePersistencePaths();
    registerIpcHandlers();
    createWindow();
  })
  .catch((error) => {
    console.error("Failed to bootstrap application", error);
  });

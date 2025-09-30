import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...parameters) => listener(event, ...parameters));
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...rest] = args;
    return ipcRenderer.off(channel, ...rest);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...rest] = args;
    return ipcRenderer.send(channel, ...rest);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...rest] = args;
    return ipcRenderer.invoke(channel, ...rest);
  },
});

contextBridge.exposeInMainWorld("gameStore", {
  listAdventures: () => ipcRenderer.invoke("adventure:list"),
  loadAdventure: (adventureId: string) => ipcRenderer.invoke("adventure:load", adventureId),
  saveAdventure: (adventure: unknown) => ipcRenderer.invoke("adventure:save", adventure),
  deleteAdventure: (adventureId: string) => ipcRenderer.invoke("adventure:delete", adventureId),
});

contextBridge.exposeInMainWorld("settingsStore", {
  loadSettings: () => ipcRenderer.invoke("settings:load"),
  saveSettings: (settings: unknown) => ipcRenderer.invoke("settings:save", settings),
});

# Games Bookstore

Games Bookstore (pronounced "[James Baxter](https://adventuretime.fandom.com/wiki/James_Baxter)") is a text adventure generator with a very generic and adaptable interactive UI, driven by an LLM.

## The gist, and the UI

Adventure:

- the main feature is the central text UI which shows the story as written so far
- the user enters text saying what they choose to do
  - the LLM judges whether you are allowed and able to do that or not (most of the time you are, assuming you're not cheating yourself)
  - it's told to judge your statement as if it is an attempt to do that thing (not a claim that it has already been done)
  - it should be generally lenient, but very realistic and sometimes very frank/harsh in the rare occasions when the user needs a reality check
- the LLM continues the story based on the result of its judgement, which may be to only *partially* apply what the user wanted to do, if such a filter is warranted
- generally, the LLM is focused on giving the user a good adventure, and preventing the user from driving it too far in their prompts (the LLM is the one telling the story, not the user; the user is providing simple instructions/short turns with unitary actions)

Stories:

- newly played stories are saved to disk automatically as they progress
  - they are accompanied by their JSON inventory, journal, damage, map, and contacts data (this list is not exhaustive)
- you can select which saved story you want to continue from a menu screen
- to start a new story, you can start from a list of interesting and varied adventure prompts, each of which can be clicked to start that adventure

Inventory:

- UI for seeing and using your items collected in-game
- items
  - generated completely ad-hoc by LLM when the player collects something in the story
  - LLM generates description of item you have collected in-game
  - LLM generates JSON in the "Item" format, we store that in storage and display it in the UI.
  - When you click on items to use them, it removes it from your inventory and sends a message to the LLM basically saying that you use it in-game, and the LLM continues the story based on that

Journal:

- important plot points and memories are written down in the journal as they happen, automatically
- this is done by running the LLM on the most recent story output, and then, if it feels that there's something important for the main character to remember in order for the game to progress, it writes a short blurb about it to store in the journal.
- each entry is returned from the LLM as JSON in the "JournalEntry" format, which we store in storage and display in the UI wherever we put the journal
- you can also add your own entries to the journal manually by typing it in

Damage:

- Health
  - json format for storing current health points, total health points, etc.
  - LLM generates this after every output
  - visualized as an HP bar in the UI
- Conditions
  - json format for storing current status effects and conditions. etc.
  - LLM generates this after every output
  - visualized in the UI

Map:

- your position on a map should change as the story continues
- the map is updated by running the LLM on recent output and the current map, and deciding if there's a new place on the map that should be recorded and it's where we are
- the LLM generates JSON in the "Map" or "MapUpdate" format, whatever seems better
- this is stored in storage as well

Contacts:

- people you've met and a way to reach them, if they've given you one (like a phone number)
- collected in a similar fashion to the other things already mentioned; LLM => JSON => store => UI
- people with phone numbers display in a "phone" UI and be callable
- this is all done via LLM
- a "call" with a contact would be done in a separate window of text, as a different conversation with the LLM, and then it would end and you would get kicked back to the main story
- in the future, the phone UI will be agnostic of setting, so magical/historical/psychic/off-world/etc. settings will have some kind of visual metaphor for their thing, or at least some generic UI that doesn't take you out of the world like a 21st century phone might
- in the future, each contact will have an auto-generated picture attached

Appearance:

- your character's personal appearance (and changes to it) should also be stored and surfaced in the UI somehow in a similar fashion to all of the above

## Setup

For inference, it will interface with your choice of OpenAI API, Anthropic API, or Ollama (for local models).

For OpenAI and Anthropic, it will take an API key (which it will remember securely on your local machine and never exfiltrate that data) and it will take the model to use.

For Ollama, it will take a server address (usually `localhost` or `127.0.0.1` or an IP address on your LAN), a port (default is `11434`), and the model to use.

Other options will be made available in the future.

## Architecture

### "Stack"

Built with Electron, TypeScript (strict), React, Tailwind.

### Dev tools

- Vite
- ESLint
- Prettier
- Husky
-

### Electron app structure



### Wrapping and prompting the LLM

### UI components

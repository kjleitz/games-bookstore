# Games Bookstore

Games Bookstore (pronounced "[James Baxter](https://adventuretime.fandom.com/wiki/James_Baxter)") is a text adventure generator with a very generic and adaptable interactive UI, driven by an LLM.

**NOTE:** This rambling README is not well-organized. Sorry for the public scratchpad.

## The gist of the thing and the UI/glossary braindump

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
  - they are accompanied by their JSON inventory, journal, damage/vitals, map, and contacts data (this list is not exhaustive)
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

Vitals:

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

For inference/generation, it will interface with your choice of OpenAI API, Anthropic API, or Ollama (for local models).

For OpenAI and Anthropic, it will take an API key (which it will remember securely on your local machine and never exfiltrate that data) and it will take the model to use.

For Ollama, it will take a server address (usually `localhost` or `127.0.0.1` or an IP address on your LAN), a port (default is `11434`), and the model to use.

Other options will be made available in the future.

## Architecture

### "Stack"

- Electron
- TypeScript (strict)
- React
- Tailwind
- React Native in the near future

### Dev tools

- Vite
- Vitest
- ESLint
- Prettier
- Husky

### Wrapping and prompting the LLM

**NOTE:** This will hit an API (probably any OpenAI-compatible API) so that you can hit Ollama served locally or OpenAI for one of their models or Anthropic for one of theirs, for running inference and text generation.

#### Mainline story

For any given game you can play through Games Bookstore, the game itself will be played in the main text area (the "story"). When the user inputs text (their "move"), it will use the configured API to get a continuation of the story.

In order to do that, Games Bookstore will build a context string including:

- all the journal notes (terse summaries, facts, and memories important to the plot and continuity of the story)
- the inventory, serialized into only the most basic information
- other relevant structured information gathered thus far which also might be important
- the current transcript (which might be manipulated in various ways as its length begins to exceed the model's optimal context window size)
- the "move" input from the user

...and then it will generate a continuation of the story based on that context string, which will be printed to the main text area (the "story"), and the cycle continues.

#### Items, journal, contacts, and other structured information

As you progress through the game, Games Bookstore will keep track of:

- any items you obtain in the story (goes in the inventory)
- terse notes of details important to the plot or continuity (goes in the journal)
- people and contact methods in the contacts (goes in contacts)
- places and points of interest (goes in the map)
- damage, health, conditions, status, etc.

In order to do that, it will build another context string including pretty much everything in the mainline story one, except at the end it will ALSO include:

- the most recent output, specially indicated in the thread by highlighting it with a special tag or comments or something
- the "types" (JSON types) for each of the things listed above
- a prompt to generate JSON for any of the things listed above that it can detect from that most recent output, so that we can store those things in the appropriate collections/data stores

...and then it will generate the JSON describing the items and contacts and notes and places and whatever else that it picked up from the text. Then we will use that JSON to add to our collections/data stores after validating them.

For broken returned JSON, the request should be retried. It should be emphasized in the prompt that this JSON has to be perfectly formatted and it is for production code so there can be no mistakes.

It **remains an open question** whether or not this should be done...

**(A)** In the output of the main story as new responses are written

- this would make it a single generated response that includes the story text as well as the JSON generated beneath it
- we would automatically parse the ending JSON and put it into the various collections/data stores
- I'm worried the model will be too distracted doing all of those things rather than focusing on one thing at a time

**(B)** As a separate LLM usage where we run the model on the most recently-generated text from itself, and give us a single structured JSON object representing all the stuff it picked up from the text

- I like this one because it keeps the story generation and the auxiliary data generation separate and singularly-focused
- more expensive than (A) because you have to do multiple generations with different context windows

**(C)** With a different LLM usage for every data type, where we run the model several times on the most recently-generated text from itself, and each time we have it give us a different structured JSON object representing just the one thing we asked it to look for in the text

- This seems like it would be the highest fidelity
- probably VERY expensive, probably prohibitively expensive
- hard to scale as we add more features

**Overall** I think B is probably the way to go, but we should build it with support in mind for doing it all three ways, depending on user preferences and settings.

### Visual/UI

Main text area ("story" text) where you type is in the center. Panels surround it (the "chrome"). Would be great if these were themable.

Collapsible panels show your contacts, map, journal, inventory, etc. Most are to either side of the story text, but some may wrap above and below. On mobile, in the future, these will have to be rethought; they may have to be one-panel-at-a-time or have a traversable menu or something.

It's styled like a futuristic terminal, with a nice soft dark theme, clean lines, monospace text, a nostalgic feel.

The panels wrap the entire border of the screen. They are different shapes an sizes, but they go all the way around. In the center, framed by all of them, is the story text. Below that is the input area, and below that is more chrome (but narrower than the stuff on the sides and top; think of it almost like a task bar).

### Component architecture

React, TypeScript, use functional components, keep things pure/stateless unless necessary. Use context, not redux. Components should be small and single-purpose.

Tailwind for styles. Support themes out of the box; colors, text size/font, padding, and border radius should all be dynamic and come from theme values. Make a dark theme (default) and a light theme to start.

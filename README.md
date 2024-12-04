# brewy - alternative homebrew frontend

# entry point

- `src/index.ts`
- Invokes features
- `invokes`

# features

- `src/features` folder
- Package Installation: `install_package.ts`
- Package Search: `search.ts`
- Homebrew/Formula Update: `update.ts`
- Package Upgrade: `upgrade.ts`
- Package Uninstallation: `uninstall.ts`
- Homebrew Configuration: `config.ts`
- Formula/Cask Creation: `create.ts`
- Formula/Cask Editing: `edit.ts`

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```

This project was created using `bun init` in bun v1.1.38. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


![A diagram showing the architecture of a CLI for Homebrew, with the CLI entry point invoking various functions, including package installation, search, update, upgrade, uninstallation, configuration, creation, and editing, all of which use a command execution module to interact with the Homebrew external system. A visual representation of a Homebrew CLI architecture, illustrating the entry point of the CLI that triggers multiple functions such as package installation, search, update, upgrade, uninstallation, configuration, creation, and editing, all utilizing a command execution module to communicate with the Homebrew external system. A visual representation of a Homebrew CLI architecture, illustrating the entry point of the CLI that triggers multiple functions such as package installation, search, update, upgrade, uninstallation, configuration, creation, and editing, all utilizing a command execution module to communicate with the Homebrew external system. The diagram highlights the flow of commands from the user through the CLI to the various functionalities, showcasing how the system processes requests and interacts with the underlying package management infrastructure.](./assets/diagram.jpeg)
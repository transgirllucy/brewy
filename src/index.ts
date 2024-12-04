import { handleInstall } from './features/install_package';
import { Command } from 'commander';
import consola from 'consola'; // Ensure this import is correct
import { searchPackage } from './features/search'; // Ensure this import is correct
import { handleUpdate } from './features/update';
import { handleUpgrade } from './features/upgrade';
import { handleUninstall } from './features/uninstall';
import { handleConfig } from './features/config';
import { handleCreate } from './features/create';
import { handleEdit } from './features/edit';
import { handleVersion } from './features/version';
import { handleServices } from './features/services';
const program = new Command();

program
    .version('1.0.0')
    .description('A simple CLI for managing Homebrew packages')
    .command('install <package>')
    .description('Install a Homebrew package')
    .option('--quiet', 'Suppress output messages')
    .option('--force', 'Install formulae without checking for previously installed versions')
    .option('--verbose', 'Print the verification and post-install steps')
    .option('--dry-run', 'Show what would be installed, but do not actually install anything')
    .action((packageName: string, options: { quiet?: boolean; force?: boolean; verbose?: boolean; dryRun?: boolean }) => {
        handleInstall(packageName, options);
    })

program.command('search <term>')
.description('Search for Homebrew packages (use /REGEX/ for regex search)')
.option('--formula', 'Search for formulae only')
.option('--cask', 'Search for casks only')
.option('--desc', 'Search for descriptions')
.option('--quiet', 'Suppress output messages')
.action((term: string, options: { formula?: boolean; cask?: boolean; desc?: boolean; quiet?: boolean }) => {
    // Check if the term is a regex pattern
    let searchTerm = term;
    if (term.startsWith('/') && term.endsWith('/')) {
        const regexPattern = term.slice(1, -1); // Remove the slashes
        try {
            const regex = new RegExp(regexPattern);
            searchTerm = regex;
        } catch (e) {
            consola.error('Invalid regex pattern.');
            return;
        }
    }

    // Call the search function with a single object
    searchPackage({
        term: searchTerm,
        options: {
            formula: options.formula || false,
            cask: options.cask || false,
            desc: options.desc || false,
            quiet: options.quiet || false
        }
    });
});

program.command('update')
    .description('Update Homebrew and all formulae')
    .option('--merge', 'Use git merge to apply updates')
    .option('--auto-update', 'Run on auto-updates, skipping some slower steps')
    .option('--force', 'Always do a slower, full update check')
    .option('--quiet', 'Make some output more quiet')
    .option('--verbose', 'Print the directories checked and git operations performed')
    .action((options: { merge?: boolean; autoUpdate?: boolean; force?: boolean; quiet?: boolean; verbose?: boolean }) => {
        handleUpdate(options);
    });

program.command('upgrade [packages...]')
.description('Upgrade outdated Homebrew packages')
.option('--quiet', 'Suppress output messages')
.option('--force', 'Install formulae without checking for previously installed versions')
.option('--verbose', 'Print the verification and post-install steps')
.option('--dry-run', 'Show what would be upgraded, but do not actually upgrade anything')
.option('--cask', 'Treat all named arguments as casks')
.action((packageNames: string[], options: { quiet?: boolean; force?: boolean; verbose?: boolean; dryRun?: boolean; cask?: boolean }) => {
    handleUpgrade(packageNames, options);
});    

program.command('uninstall <package>')
    .description('Uninstall a Homebrew package')
    .option('--force', 'Delete all installed versions of formula')
    .option('--zap', 'Remove all files associated with a cask')
    .option('--ignore-dependencies', "Don't fail uninstall, even if formula is a dependency of any installed formulae")
    .option('--quiet', 'Suppress output messages')
    .option('--verbose', 'Make some output more verbose')
    .option('--cask', 'Treat the argument as a cask')
    .action((packageName: string, options: { force?: boolean; zap?: boolean; ignoreDependencies?: boolean; quiet?: boolean; verbose?: boolean; cask?: boolean }) => {
        handleUninstall(packageName, options);
    });

    program.command('config')
    .description('Show or modify Homebrew configuration')
    .option('--quiet', 'Suppress output messages')
    .action((options: { quiet?: boolean }) => {
        handleConfig(options);
    });

    program.command('create <url>')
    .description('Generate a formula or cask for the downloadable file at URL')
    .option('--autotools', 'Create a basic template for an Autotools-style build')
    .option('--cask', 'Create a basic template for a cask')
    .option('--cmake', 'Create a basic template for a CMake-style build')
    .option('--crystal', 'Create a basic template for a Crystal build')
    .option('--go', 'Create a basic template for a Go build')
    .option('--meson', 'Create a basic template for a Meson-style build')
    .option('--node', 'Create a basic template for a Node build')
    .option('--perl', 'Create a basic template for a Perl build')
    .option('--python', 'Create a basic template for a Python build')
    .option('--ruby', 'Create a basic template for a Ruby build')
    .option('--rust', 'Create a basic template for a Rust build')
    .option('--no-fetch', 'Do not download the URL to the cache')
    .option('--HEAD', 'Indicate that URL points to the package\'s repository rather than a file')
    .option('--set-name <name>', 'Explicitly set the name of the new formula or cask')
    .option('--set-version <version>', 'Explicitly set the version of the new formula or cask')
    .option('--set-license <license>', 'Explicitly set the license of the new formula')
    .option('--tap <user/repo>', 'Generate the new formula within the given tap')
    .option('-f, --force', 'Ignore errors for disallowed formula names')
    .option('-d, --debug', 'Display any debugging information')
    .option('-q, --quiet', 'Make some output more quiet')
    .option('-v, --verbose', 'Make some output more verbose')
    .action((url, options) => {
        handleCreate(url, options);
    });
    program.command('edit [formula|cask|tap...]')
    .description('Open a formula, cask, or tap in the editor')
    .option('--formula', 'Treat all named arguments as formulae')
    .option('--cask', 'Treat all named arguments as casks')
    .option('--print-path', 'Print the file path to be edited, without opening an editor')
    .option('-d, --debug', 'Display any debugging information')
    .option('-q, --quiet', 'Make some output more quiet')
    .option('-v, --verbose', 'Make some output more verbose')
    .option('-h, --help', 'Show help information for the command')
    .action((args, options) => {
        handleEdit(args, options);
    });
    program.command('version')
    .description("shows the version")
    .action(() => {
        handleVersion();
    });

    program
    .command('services <subcommand> [formula]')
    .description('Manage background services with Homebrew')
    .option('-a, --all', 'Run subcommand on all services')
    .option('--json', 'Output as JSON')
    .option('-d, --debug', 'Display any debugging information')
    .option('-q, --quiet', 'Make some output more quiet')
    .option('-v, --verbose', 'Make some output more verbose')
    .option('--file <file>', 'Use the service file from this location to start the service')
    .option('--sudo-service-user <user>', 'When run as root on macOS, run the service(s) as this user')
    .option('--max-wait <seconds>', 'Wait at most this many seconds for stop to finish stopping a service')
    .option('--no-wait', 'Don\'t wait for stop to finish stopping the service')
    .action(async (subcommand, formula, options) => {
        await handleServices(subcommand, formula, options);
    });


program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
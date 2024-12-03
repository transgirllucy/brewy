import { handleInstall } from './features/install_package';
import { Command } from 'commander';
import consola from 'consola'; // Ensure this import is correct
import { searchPackage } from './features/search'; // Ensure this import is correct
import { handleUpdate } from './features/update';
import { handleUpgrade } from './features/upgrade';
import { handleUninstall } from './features/uninstall';
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


program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
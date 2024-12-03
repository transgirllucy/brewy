import consola from 'consola'; // Ensure this import is correct
import { runCommand } from '../command'; 


export async function handleUpgrade(packageNames: string[], options: { quiet?: boolean; force?: boolean; verbose?: boolean; dryRun?: boolean; cask?: boolean; }) {
    try {
        let command = 'brew upgrade';
        if (options.force) {
            command += ' --force';
        }
        if (options.verbose) {
            command += ' --verbose';
        }
        if (options.dryRun) {
            command += ' --dry-run';
        }
        if (options.quiet) {
            command += ' --quiet';
        }
        if (options.cask) {
            command += ' --cask';
        }

        if (packageNames.length) {
            command += ` ${packageNames.join(' ')}`;
        }

        const result = await runCommand(command);
        if (!options.quiet) {
            consola.info(`🔄 Upgrade completed:\n${result}`);
        }
    } catch (error: any) {
        consola.error(`Error during upgrade: ${error.message}`);
    }
}
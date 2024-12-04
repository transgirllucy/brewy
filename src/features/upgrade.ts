import consola from 'consola'; // Ensure this import is correct
import { runCommand } from '../command'; 

interface UpgradeOptions {
    quiet?: boolean;
    force?: boolean;
    verbose?: boolean;
    dryRun?: boolean;
    cask?: boolean;
}

export async function handleUpgrade(packageNames: string[], options: UpgradeOptions) {
    try {
        if (packageNames.length === 0) {
            consola.warn('❌ Please provide at least one package name to upgrade.');
            return;
        }

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

        command += ` ${packageNames.join(' ')}`;

        const result = await runCommand(command);
        if (!options.quiet) {
            consola.info(`🔄 Upgrade completed:\n${result}`);
        }
    } catch (error: any) {
        consola.error(`❌ Error during upgrade: ${error.message}`);
    }
}
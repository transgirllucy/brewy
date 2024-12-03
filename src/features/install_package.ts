import { runCommand } from '../command';
import { consola } from 'consola';

export async function handleInstall(packageName: string, options: { quiet?: boolean; force?: boolean; verbose?: boolean; dryRun?: boolean; }) {
    try {
        let command = `brew install ${packageName}`;
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
        const result = await runCommand(command);
        if (!options.quiet) {
            consola.info(`✅ Successfully installed "${packageName}":\n${result}`);
        }
    } catch (error: any) {
        consola.error(`Error installing "${packageName}": ${error.message}`);
    }
}
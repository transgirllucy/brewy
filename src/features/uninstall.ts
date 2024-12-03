import { consola } from "consola";
import { runCommand } from "../command";

export async function handleUninstall(packageName: string, options: { force?: boolean; zap?: boolean; ignoreDependencies?: boolean; quiet?: boolean; verbose?: boolean; cask?: boolean }) {
    try {
        let command = 'brew uninstall';
        if (options.force) {
            command += ' --force';
        }
        if (options.zap) {
            command += ' --zap';
        }
        if (options.ignoreDependencies) {
            command += ' --ignore-dependencies';
        }
        if (options.quiet) {
            command += ' --quiet';
        }
        if (options.verbose) {
            command += ' --verbose';
        }
        if (options.cask) {
            command += ' --cask';
        }
        command += ` ${packageName}`;
        
        // Execute the command without logging the output
        await runCommand(command); // Assuming runCommand accepts an options object

        // Your own message
        if (!options.quiet) {
            consola.info(`🗑️ Successfully uninstalled "${packageName}".`);
        }
    } catch (error) {
        // Optionally log the error if you want to handle it
        if (!options.quiet) {
            consola.error(`Error during uninstallation of "${packageName}": ${error.message}`);
        }
    }
}
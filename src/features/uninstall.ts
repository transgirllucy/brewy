import { consola } from "consola";
import { runCommand } from "../command";

interface UninstallOptions {
    force?: boolean;
    zap?: boolean;
    ignoreDependencies?: boolean;
    quiet?: boolean;
    verbose?: boolean;
    cask?: boolean;
}

export async function handleUninstall(packageName: string, options: UninstallOptions) {
    try {
        if (!packageName) {
            consola.warn('❌ Please provide a package name to uninstall.');
            return;
        }

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
        
        // Execute the command
        await runCommand(command); // Assuming runCommand accepts an options object

        // Log success message
        if (!options.quiet) {
            consola.info(`🗑️ Successfully uninstalled "${packageName}".`);
        }
    } catch (error: any) {
        // Log the error if not in quiet mode
        if (!options.quiet) {
            consola.error(`❌ Error during uninstallation of "${packageName}": ${error.message}`);
        }
    }
}
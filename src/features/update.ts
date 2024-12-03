import { runCommand } from "../command";
import { consola } from "consola";
export async function handleUpdate(options: { merge?: boolean; autoUpdate?: boolean; force?: boolean; quiet?: boolean; verbose?: boolean }) {
    try {
        // Construct the command based on options
        let command = 'brew update';
        if (options.merge) {
            command += ' --merge';
        }
        if (options.autoUpdate) {
            command += ' --auto-update';
        }
        if (options.force) {
            command += ' --force';
        }
        if (options.quiet) {
            command += ' --quiet';
        }
        if (options.verbose) {
            command += ' --verbose';
        }

        const result = await runCommand(command);
        if (!options.quiet) {
            consola.info(`🔄 Update completed:\n${result}`);
        }
    } catch (error: any) {
        consola.error(`Error during update: ${error.message}`);
    }
}


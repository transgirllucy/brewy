import { consola } from "consola";
import { runCommand } from "../command";

async function handleInfo(packageName: string, options: { analytics?: boolean; json?: boolean; quiet?: boolean }) {
    try {
        // Construct the command based on options
        let command = `brew info ${packageName}`;
        if (options.analytics) {
            command += ' --analytics';
        }
        if (options.json) {
            command += ' --json';
        }
        if (options.quiet) {
            command += ' --quiet';
        }
        const result = await runCommand(command);
        if (!options.quiet) {
            consola.info(`📦 Information for "${packageName}":\n${result}`);
        }
    } catch (error: any) {
        consola.error(`Error retrieving information for "${packageName}": ${error.message}`);
    }
}
import { consola } from "consola";
import { runCommand } from "../command";

interface InfoOptions {
    analytics?: boolean;
    json?: boolean;
    quiet?: boolean;
}

async function handleInfo(packageName: string, options: InfoOptions) {
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

        // Handle output based on options
        if (options.json) {
            try {
                const jsonData = JSON.parse(result);
                consola.info(`📦 Information for "${packageName}":\n`, jsonData);
            } catch (jsonError: any) {
                consola.error(`Error parsing JSON output for "${packageName}": ${jsonError.message}`);
            }
        } else if (!options.quiet) {
            consola.info(`📦 Information for "${packageName}":\n${result}`);
        }
    } catch (error: any) {
        consola.error(`❌ Error retrieving information for "${packageName}": ${error.message}`);
    }
}
import { runCommand } from "../command"; // Assuming runCommand is a function that executes shell commands
import { consola } from "consola";
import ora from "ora";

interface ServiceOptions {
    all?: boolean;
    json?: boolean;
    debug?: boolean;
    quiet?: boolean;
    verbose?: boolean;
    file?: string;
    serviceUser ?: string;
    maxWait?: number;
    noWait?: boolean;
}

export async function handleServices(subcommand: string, formula?: string, options?: ServiceOptions) {
    const spinner = ora(`🔄 Executing brew services ${subcommand}...`).start(); // Start spinner with emoji

    try {
        let command = `brew services ${subcommand}`;

        // Handle options
        if (options) {
            if (options.all) command += ' --all';
            if (options.json) command += ' --json';
            if (options.debug) command += ' --debug';
            if (options.quiet) command += ' --quiet';
            if (options.verbose) command += ' --verbose';
            if (options.file) command += ` --file=${options.file}`;
            if (options.serviceUser ) command += ` --sudo-service-user=${options.serviceUser }`;
            if (options.maxWait !== undefined) command += ` --max-wait=${options.maxWait}`;
            if (options.noWait) command += ' --no-wait';
        }

        if (formula) {
            command += ` ${formula}`;
        }

        const result = await runCommand(command);
        spinner.succeed(`✅ Successfully executed: ${command}`); // Success message with emoji

        // Output the result
        if (!options?.quiet) {
            consola.info(`📜 ${result}`); // Output result with an emoji
        }
    } catch (error: any) {
        spinner.fail(`❌ Error executing brew services ${subcommand}: ${error.message}`); // Error message with emoji
    }
}
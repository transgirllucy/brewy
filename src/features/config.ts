import { runCommand } from "../command";
import { consola } from "consola";

export async function handleConfig(options: { quiet?: boolean; verbose?: boolean }) {
    try {
        let command = 'brew config';
        if (options.quiet) {
            command += ' --quiet';
        }
        if (options.verbose) {
            command += ' --verbose';
        }
        const result = await runCommand(command);
        if (!options.quiet) {
            consola.info(`🔧 Homebrew Configuration:\n${result}`);
        }
    } catch (error) {
        if (!options.quiet) {
            consola.error(`Error retrieving Homebrew configuration: ${error}`);
        }
    }
}
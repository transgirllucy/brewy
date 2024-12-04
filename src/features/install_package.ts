import { runCommand } from '../command';
import { consola } from 'consola';
import ora from 'ora';
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
        const confirmation = await consola.prompt(`Do you want to install the following packages ${packageName}`, {
            type: "confirm",
        });

        if (confirmation) {
            const spinner = ora(`🔄 Installing ${packageName}...`).start(); // Start the spinner after confirmation

            const result = await runCommand(command);
            spinner.succeed(`✅ Successfully installed "${packageName}":\n${result}`);
            if (!options.quiet) {
                consola.info(`✅ Successfully installed "${packageName}":\n${result}`);
            }
        } else {
            consola.warn('❌ Installation cancelled.');
            process.exit(1);
        }

    } catch (error: any) {
        consola.error(`❌ Error installing "${packageName}": ${error.message}`);
    }
}
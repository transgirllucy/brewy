import { runCommand } from '../command';
import { consola } from 'consola';
import ora from 'ora';

interface InstallOptions {
    quiet?: boolean;
    force?: boolean;
    verbose?: boolean;
    dryRun?: boolean;
}

export async function handleInstall(packageName: string, options: InstallOptions) {
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

        const confirmation = await consola.prompt(`Do you want to install the following package: "${packageName}"?`, {
            type: "confirm",
        });

        if (confirmation) {
            const spinner = ora(`🔄 Installing ${packageName}...`).start(); // Start the spinner after confirmation

            try {
                const result = await runCommand(command);
                spinner.succeed(`✅ Successfully installed "${packageName}":\n${result}`);
                if (!options.quiet) {
                    consola.info(`✅ Successfully installed "${packageName}":\n${result}`);
                }
            } catch (installError: any) {
                spinner.fail(`❌ Failed to install "${packageName}": ${installError.message}`);
                consola.error(`❌ Error details: ${installError.message}`);
            }
        } else {
            consola.warn('❌ Installation cancelled.');
            process.exit(1);
        }

    } catch (error: any) {
        consola.error(`❌ Error during installation process: ${error.message}`);
    }
}
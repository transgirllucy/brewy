import { exec } from 'child_process';
import { promisify } from 'util';
import consola from 'consola';

const execPromise = promisify(exec);

export const handleEdit = async (args: string[], options: {
    formula?: boolean;
    cask?: boolean;
    printPath?: boolean;
    debug?: boolean;
    quiet?: boolean;
    verbose?: boolean;
}) => {
    // Build the command
    let command = 'brew edit';

    if (options.formula) {
        command += ' --formula';
    }
    if (options.cask) {
        command += ' --cask';
    }
    if (options.printPath) {
        command += ' --print-path';
    }

    // Add the formulae or casks to the command
    if (args.length > 0) {
        command += ` ${args.join(' ')}`;
    }

    try {
        // Execute the command
        const { stdout, stderr } = await execPromise(command);

        // Handle output based on the options
        if (!options.quiet) {
            if (stdout) {
                consola.log(`✏️ ${stdout}`); // Using a pencil emoji to indicate editing
            }
            if (stderr) {
                consola.error(`⚠️ ${stderr}`); // Warning emoji for errors
            }
        }
    } catch (error: any) {
        // Handle errors
        consola.error(`❌ Error executing brew edit: ${error.message}`);
        if (error.stderr) {
            consola.error(`⚠️ ${error.stderr}`);
        }
        process.exit(1); // Exit with a non-zero status
    }
};
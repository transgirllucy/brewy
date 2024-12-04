import { exec } from 'child_process';
import { promisify } from 'util';
import consola from 'consola';

const execPromise = promisify(exec);

export const handleDoctor = async (options: {
    listChecks?: boolean;
    auditDebug?: boolean;
    debug?: boolean;
    quiet?: boolean;
    verbose?: boolean;
}) => {
    // Build the command
    let command = 'brew doctor';

    if (options.listChecks) {
        command += ' --list-checks';
    }

    if (options.auditDebug) {
        command += ' --audit-debug';
    }

    if (options.debug) {
        command += ' --debug';
    }

    if (options.quiet) {
        command += ' --quiet';
    }

    if (options.verbose) {
        command += ' --verbose';
    }

    try {
        // Execute the command
        const { stdout, stderr } = await execPromise(command);

        // Handle output based on the options
        if (!options.quiet) {
            if (stdout) {
                consola.log(`🩺 ${stdout}`); // Using a stethoscope emoji to indicate health check
            }
            if (stderr) {
                consola.error(`⚠️ ${stderr}`); // Warning emoji for errors
            }
        }
    } catch (error: any) {
        // Handle errors
        consola.error(`❌ Error executing brew doctor: ${error.message}`);
        if (error.stderr) {
            consola.error(`⚠️ ${error.stderr}`);
        }
        process.exit(1); // Exit with a non-zero status
    }
};
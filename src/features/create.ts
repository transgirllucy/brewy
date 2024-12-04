import { exec } from 'child_process';
import { promisify } from 'util';
import consola from 'consola';

const execPromise = promisify(exec);

export const handleCreate = async (url: string, options: {
    autotools?: boolean;
    cask?: boolean;
    cmake?: boolean;
    crystal?: boolean;
    go?: boolean;
    meson?: boolean;
    node?: boolean;
    perl?: boolean;
    python?: boolean;
    ruby?: boolean;
    rust?: boolean;
    noFetch?: boolean;
    head?: boolean;
    setName?: string;
    setVersion?: string;
    setLicense?: string;
    tap?: string;
    force?: boolean;
    debug?: boolean;
    quiet?: boolean;
    verbose?: boolean;
}) => {
    // Build the command
    let command = `brew create ${url}`;

    if (options.autotools) command += ' --autotools';
    if (options.cask) command += ' --cask';
    if (options.cmake) command += ' --cmake';
    if (options.crystal) command += ' --crystal';
    if (options.go) command += ' --go';
    if (options.meson) command += ' --meson';
    if (options.node) command += ' --node';
    if (options.perl) command += ' --perl';
    if (options.python) command += ' --python';
    if (options.ruby) command += ' --ruby';
    if (options.rust) command += ' --rust';
    if (options.noFetch) command += ' --no-fetch';
    if (options.head) command += ' --HEAD';
    if (options.setName) command += ` --set-name ${options.setName}`;
    if (options.setVersion) command += ` --set-version ${options.setVersion}`;
    if (options.setLicense) command += ` --set-license ${options.setLicense}`;
    if (options.tap) command += ` --tap ${options.tap}`;
    if (options.force) command += ' --force';
    if (options.debug) command += ' --debug';
    if (options.quiet) command += ' --quiet';
    if (options.verbose) command += ' --verbose';

    try {
        // Execute the command
        const { stdout, stderr } = await execPromise(command);

        // Handle output based on the options
        if (!options.quiet) {
            if (stdout) {
                consola.log(`📦 ${stdout}`);
            }
            if (stderr) {
                consola.error(`⚠️ ${stderr}`);
            }
        }
    } catch (error: any) {
        // Handle errors
        consola.error(`❌ Error executing brew create: ${error.message}`);
        if (error.stderr) {
            consola.error(`⚠️ ${error.stderr}`);
        }
        process.exit(1); // Exit with a non-zero status
    }
};
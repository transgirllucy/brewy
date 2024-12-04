import { runCommand } from "../command";
import { consola } from "consola";

interface SearchOptions {
    formula?: boolean;
    cask?: boolean;
    desc?: boolean;
    quiet?: boolean;
}

export async function searchPackage({ term, options }: { term: string; options: SearchOptions }) {
    try {
        if (!term) {
            consola.warn('❌ Please provide a search term.');
            return;
        }

        let command = `brew search `;
        if (term.startsWith('/') && term.endsWith('/')) {
            command += term; // Use regex search
        } else {
            command += term.replace(/ /g, '\\ '); // Escape spaces in the term
        }

        if (options.formula) {
            command += ' --formula';
        }

        if (options.cask) {
            command += ' --cask';
        }

        if (options.desc) {
            command += ' --desc';
        }

        if (options.quiet) {
            command += ' --quiet';
        }

        const result = await runCommand(command);
        if (!options.quiet) {
            consola.info(`📦 Search results for "${term}":\n${result}`);
        }
    } catch (error: any) {
        consola.error(`❌ Error searching for package "${term}": ${error.message}`);
    }
}
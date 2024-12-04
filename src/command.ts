import { exec } from 'child_process';
import consola from 'consola';

export function runCommand(command: string, options?: { cwd?: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        consola.error(`❌ Error executing command: "${command}"\n${stderr}`);
        reject(`Error: ${stderr}`);
      } else {
        // consola.success(`✅ Command executed successfully: "${command}"`);
        resolve(stdout.toString().trim());
      }
    });
  });
}
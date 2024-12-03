import { exec } from 'child_process';
import { consola } from 'consola';

export function runCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`❌ Error: ${stderr}`);
      } else {
        resolve(`✅ Success: ${stdout}`);
      }
    });
  });
}

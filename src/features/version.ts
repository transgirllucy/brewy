import consola from 'consola'; // Ensure this import is correct
import { runCommand } from '../command'; 
import { version } from '../../package.json'; // Assuming version is defined in package.json

export function handleVersion(): void {
    consola.box(`Brewy Version ${version}`);
}
import { execSync } from 'child_process';

export const execute = (
  command: string,
  showOutput: boolean = false,
  suppressError: boolean = false
) => {
  try {
    const output = execSync(command, {
      stdio: showOutput ? 'inherit' : 'pipe',
    });
    if (output) return output.toString().trim();
    return output;
  } catch (e) {
    if (!suppressError) {
      throw e;
    }
  }
};

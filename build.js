// build script code
// Generated by ChatGPT
// This code does not fall under the LICENSE as defined in the root folder

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to execute the command in a given folder
const runPnpmBuild = (folder) => {
  console.log(`Running pnpm run build in: ${folder}`);
  try {
    execSync('pnpm run build', { cwd: folder, stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to build in ${folder}:`, error.message);
  }
};

// Main function to run the build in sub-folders
const main = () => {
  // Parse the command-line arguments
  const args = process.argv.slice(2);
  const specificFolders = args.length > 0 ? args : null;

  // Get a list of sub-folders in the current directory
  const parentDir = path.resolve(__dirname);
  const subFolders = fs
    .readdirSync(parentDir, { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .map((dir) => path.join(parentDir, dir.name));

  // If specific folders are provided, filter them
  const foldersToProcess = specificFolders
    ? subFolders.filter((folder) =>
        specificFolders.some((specificFolder) => folder.includes(specificFolder))
      )
    : subFolders;

  // Run `pnpm run build` on the selected folders
  foldersToProcess.forEach(runPnpmBuild);
};

main();

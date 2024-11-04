const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(process.cwd(), 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error('package.json not found.');
  process.exit(1);
}

function isPackageInstalled(packageName) {
  try {
    require.resolve(packageName);
    return true;
  } catch (error) {
    return false;
  }
}

const packageJson = require(packageJsonPath);
const { peerDependencies = {} } = packageJson;
const missingPeerDependencies = Object.keys(peerDependencies).filter(
  (pkg) => !packageJson.dependencies?.[pkg] && !isPackageInstalled(pkg)
);

if (missingPeerDependencies.length > 0) {
  try {
    console.warn(
      `\nInstalling missing peer dependencies: ${missingPeerDependencies.join(
        ', '
      )}...`
    );

    execSync(
      `yarn add ${missingPeerDependencies
        .map((pkg) => `${pkg}@${peerDependencies[pkg]}`)
        .join(' ')}`,
      {
        stdio: 'inherit',
      }
    );
  } catch (error) {
    console.error(`\nError installing dependencies:`, error);
  }
}

if (fs.existsSync('package-lock.json')) {
  fs.unlinkSync('package-lock.json');
  console.warn(
    `\nRemoved package-lock.json to maintain consistency with Yarn.`
  );
}

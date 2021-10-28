import { PAGES_DIR } from './constants';
import generateRenderScript from './generateRenderScript';
import generateJSBundle from './generateJSBundle';
import processMarkdown from './processMarkdown';
import runRenderScripts from './runRenderScripts';
import buildJSBundles from './buildJSBundles';
import buildRenderScripts from './buildRenderScripts';
import { BricksConfiguration } from './readConfiguration';

const cleanAndEnsure = async (dir: string): Promise<void> => {
  const fs = await import('fs-extra');

  await fs.remove(dir);
  await fs.ensureDir(dir);
};

const createBuild = async (config: BricksConfiguration): Promise<void> => {
  const fs = await import('fs-extra');
  const path = await import('path');

  try {
    const filePaths = await fs.readdir(path.join(process.cwd(), PAGES_DIR));

    // Directory of pre-built artifact directory
    const artifactDir = path.join(process.cwd(), config.artifactPath);
    await cleanAndEnsure(artifactDir);

    // Create routes.json for route context
    await fs.writeJSON(
      path.join(artifactDir, 'routes.json'),
      filePaths.map((fp) => fp.split('.')[0]).filter((fn) => fn !== 'index')
    );

    // Scan all markdown and process
    const markdownArr = await Promise.all(
      filePaths.map(async (fp) => {
        return await processMarkdown(
          path.join(process.cwd(), PAGES_DIR, fp),
          artifactDir
        );
      })
    );

    // Create React apps based on markdown metadata
    const jsBundles = await Promise.all(
      markdownArr.map(async ({ pageDataFile, component }) => {
        return await generateJSBundle(pageDataFile, component, artifactDir);
      })
    );

    // Directory of built files
    const buildDir = path.join(process.cwd(), config.buildPath);
    await cleanAndEnsure(buildDir);

    // Build all generated react apps
    const manifest = await buildJSBundles(jsBundles, buildDir);

    // Generate all render scripts
    const renderScripts = await Promise.all(
      markdownArr.map(async ({ pageDataFile, component }) => {
        return await generateRenderScript(
          pageDataFile,
          component,
          artifactDir,
          manifest,
          config
        );
      })
    );

    await buildRenderScripts(renderScripts, artifactDir);
    await runRenderScripts(artifactDir);
  } catch (error) {
    console.error(error);
  }
};

export default createBuild;

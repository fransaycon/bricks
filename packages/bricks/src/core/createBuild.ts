import { PAGES_DIR } from "./constants";
import generateRenderScript from "./generateRenderScript";
import generateJSBundle from "./generateJSBundle";
import processMarkdown from "./processMarkdown";
import runRenderScripts from "./runRenderScripts";
import buildJSBundles from "./buildJSBundles";
import buildRenderScripts from "./buildRenderScripts";
import { BricksConfiguration } from "./readConfiguration";


const cleanAndEnsure = async (dir: string): Promise<void> => {
    const fs = await import("fs-extra")

    await fs.remove(dir)
    await fs.ensureDir(dir)
}

const createBuild = async (config: BricksConfiguration): Promise<void> => {
    const fs = await import("fs-extra")
    const path = await import("path")

    console.log(config)

    try {
        const filePaths = await fs.readdir(path.join(process.cwd(), PAGES_DIR))
        console.log("BREAKPOINT 1")
        // Directory of pre-built artifact directory
        const artifactDir = path.join(process.cwd(), config.artifactPath)
        await cleanAndEnsure(artifactDir)
        console.log("BREAKPOINT 2")

        // Create routes.json for route context
        await fs.writeJSON(path.join(artifactDir, "routes.json"), filePaths)
        console.log("BREAKPOINT 3")

        // Scan all markdown and process
        let markdownArr = await Promise.all(filePaths.map(async fp => {
            return await processMarkdown(
                path.join(process.cwd(), PAGES_DIR, fp),
                artifactDir
            )
        }))
        console.log("BREAKPOINT 4")

        // Create React apps based on markdown metadata
        let jsBundles = await Promise.all(markdownArr.map(async ({ pageDataFile, component }) => {
            return await generateJSBundle(
                pageDataFile,
                component,
                artifactDir,
            )
        }))
        console.log("BREAKPOINT 5")

        // Directory of built files
        const buildDir = path.join(process.cwd(), config.buildPath)
        await cleanAndEnsure(buildDir)
        console.log("BREAKPOINT 6")

        // Build all generated react apps
        let manifest = await buildJSBundles(jsBundles, buildDir, config)
        console.log("BREAKPOINT 7")

        // Generate all render scripts
        let renderScripts = await Promise.all(markdownArr.map(async ({ pageDataFile, component }) => {
            return await generateRenderScript(
                pageDataFile,
                component,
                artifactDir,
                manifest,
                config
            )
        }))
        console.log("BREAKPOINT 8")

        await buildRenderScripts(renderScripts, artifactDir, config)
        await runRenderScripts(artifactDir)
    }
    catch(error){
        console.error(error)
    }
}

export default createBuild

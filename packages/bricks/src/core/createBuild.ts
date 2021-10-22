import { ARTIFACT_COMPONENTS_PATH, CUSTOM_COMPONENTS_PATH, FINAL_BUILD_PATH, PAGES_PATH } from "./constants";
import generateRenderScript from "./generateRenderScript";
import generateJSBundle from "./generateJSBundle";
import processMarkdown from "./processMarkdown";
import runRenderScripts from "./runRenderScripts";
import buildJSBundles from "./buildJSBundles";
import buildRenderScripts from "./buildRenderScripts";

interface BricksConfiguration {
    buildPath: string;
}

const createBuild = async (config?: BricksConfiguration): Promise<void> => {
    const fs = await import("fs-extra")
    const path = await import("path")

    try {
        const filePaths = await fs.readdir(path.join(process.cwd(), PAGES_PATH))
        const finalBuildDir = path.join(process.cwd(), config?.buildPath ?? FINAL_BUILD_PATH)
        await fs.remove(finalBuildDir)
        await fs.ensureDir(finalBuildDir)

        // Copy Custom Stuff
        const componentsPaths = await fs.readdir(path.join(process.cwd(), CUSTOM_COMPONENTS_PATH))
        componentsPaths.forEach(async cp => {
            await fs.copy(path.join(process.cwd(), CUSTOM_COMPONENTS_PATH, cp), path.join(finalBuildDir, ARTIFACT_COMPONENTS_PATH, cp))
        })

        let markdownArr = await Promise.all(filePaths.map(async fp => {
            return await processMarkdown(
                path.join(process.cwd(), PAGES_PATH, fp),
                finalBuildDir
            )
        }))

        let jsBundles = await Promise.all(markdownArr.map(async ({ pageDataFile, component }) => {
            return await generateJSBundle(
                pageDataFile,
                component,
                finalBuildDir,
            )
        }))

        let manifest = await buildJSBundles(jsBundles, finalBuildDir)

        let renderScripts = await Promise.all(markdownArr.map(async ({ pageDataFile, component }) => {
            return await generateRenderScript(
                pageDataFile,
                component,
                finalBuildDir,
                manifest
            )
        }))

        await buildRenderScripts(renderScripts, finalBuildDir)
        await runRenderScripts(finalBuildDir)
    }
    catch(error){
        console.error(error)
    }
}

export default createBuild

import { ARTIFACT_COMPONENTS_PATH, CUSTOM_COMPONENTS_PATH, FINAL_BUILD_PATH, PAGES_PATH } from "./constants";
import generateScript from "./generateScript";
import processMarkdown from "./processMarkdown";
import runRenderScript from "./runRenderScript";

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

        Promise.all(filePaths.map(async (fp) => {
            const { pageDataFile, component } = await processMarkdown(path.join(process.cwd(), PAGES_PATH, fp), finalBuildDir)
            const rsFileName = await generateScript(pageDataFile, component, finalBuildDir)
            await runRenderScript(rsFileName)
        }))
    }
    catch(error){
        console.error(error)
    }
}

export default createBuild

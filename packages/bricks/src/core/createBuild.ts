import { FINAL_BUILD_PATH, PAGES_PATH } from "./constants";
import generateScript from "./generateScript";
import generateHtml from "./generateHtml";
import processMarkdown from "./processMarkdown";

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

        filePaths.forEach(async fp => {
            const pageDataFileName = await processMarkdown(path.join(process.cwd(), PAGES_PATH, fp), finalBuildDir)
            const jsFileName = await generateScript(pageDataFileName, finalBuildDir)
            const html = await generateHtml(pageDataFileName, jsFileName, finalBuildDir)
            const fileName = fp.split(".")[0]
            fs.writeFileSync(path.join(finalBuildDir, `${fileName}.html`), `<!DOCTYPE html>${html}`)
        })
    }
    catch(error){
        console.error(error)
    }
}

export default createBuild

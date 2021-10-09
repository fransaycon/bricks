import fs from "fs-extra"
import path from "path"
import { FINAL_BUILD_PATH, PAGES_PATH } from "./constants";
import generateHtml from "./generateHtml";
import processMarkdown from "./processMarkdown";

const createBuild = () => {
    const filePaths = fs.readdirSync(path.join(process.cwd(), PAGES_PATH))

    const finalBuildDir = path.join(process.cwd(), FINAL_BUILD_PATH)
    if (!fs.existsSync(finalBuildDir)){
        fs.mkdirSync(finalBuildDir);
    }

    filePaths.forEach(async fp => {
        const data = await processMarkdown(path.join(process.cwd(), PAGES_PATH, fp))
        const html = generateHtml(data.markdownContent, data.meta, "", "")
        const fileName = fp.split(".")[0]
        fs.writeFileSync(path.join(finalBuildDir, `${fileName}.html`), `<!DOCTYPE html>${html}`)
    })
}

export default createBuild

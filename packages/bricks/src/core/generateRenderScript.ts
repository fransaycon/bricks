import { ARTIFACT_JS_PATH, FINAL_JS_PATH, MANIFEST_KEY } from "./constants"

const generateRenderScript =  async (pageDataFileName: string, appName: string, buildDir: string, manifest: Record<string, string>): Promise<string> => {
    const fs = await import("fs-extra")
    const path = await import("path")
    const fileName = pageDataFileName.split(".")[0]

    const artifactJSPath = path.join(buildDir, ARTIFACT_JS_PATH)
    await fs.ensureDir(artifactJSPath)

    const builtJSDir = path.join(buildDir, FINAL_JS_PATH)
    await fs.ensureDir(builtJSDir)

    const clientBundle = manifest[`${MANIFEST_KEY}/${fileName}.jsx`]
    const entryPoint = path.join(artifactJSPath, `${fileName}_render.jsx`)

    const htmlScript = `
import App from "./${appName}_app"
import pageData from "../pages_data/${pageDataFileName}";
import { renderHtml, FINAL_BUILD_PATH } from "@franreysaycon/bricks"
import fs from "fs-extra"
import path from "path"

fs.writeFile(path.join(process.cwd(), FINAL_BUILD_PATH, "${fileName}.html"), renderHtml(App, "js/${clientBundle}", pageData))
console.log("Generated ${fileName}.html")
`
    await fs.writeFile(entryPoint, htmlScript)

    return entryPoint
}

export default generateRenderScript

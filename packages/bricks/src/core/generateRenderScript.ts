import { ARTIFACT_JS_SRC, BUILD_SRC } from "./constants"
import { BricksConfiguration } from "./readConfiguration"

const generateRenderScript =  async (
    pageDataFileName: string,
    appName: string,
    buildDir: string,
    manifest: Record<string, string>,
    config: BricksConfiguration,
): Promise<string> => {
    const fs = await import("fs-extra")
    const path = await import("path")
    const fileName = pageDataFileName.split(".")[0]

    const artifactJSPath = path.join(buildDir, ARTIFACT_JS_SRC)
    await fs.ensureDir(artifactJSPath)

    const clientBundle = manifest[`${config.artifactPath}/${ARTIFACT_JS_SRC}/${fileName}.jsx`]
    const entryPoint = path.join(artifactJSPath, `${fileName}_render.jsx`)

    const htmlScript = `
import App from "./${appName}_app"
import pageData from "../pages_data/${pageDataFileName}";
import routeData from "../routes.json"
import { renderHtml } from "@franreysaycon/bricks"
import fs from "fs-extra"
import path from "path"

fs.writeFile(path.join(process.cwd(),"${config.buildPath}", "${fileName}.html"), renderHtml(App, "${BUILD_SRC}/${clientBundle}", pageData, routeData))
console.log("Generated ${fileName}.html")
`
    await fs.writeFile(entryPoint, htmlScript)

    return entryPoint
}

export default generateRenderScript

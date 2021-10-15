import { ARTIFACT_JS_PATH, FINAL_JS_PATH } from "./constants"

const generateScript =  async (pageDataFileName: string, buildDir: string): Promise<string> => {
    const fs = await import("fs-extra")
    const path = await import("path")
    const esbuild = await import("esbuild")

    const artifactJSPath = path.join(buildDir, ARTIFACT_JS_PATH)
    await fs.ensureDir(artifactJSPath)

    const jsScript = `
        import pageData from "../pages_data/${pageDataFileName}";
        import ReactDOMServer from "react-dom";
        import React from "react";
        import { App, DOCUMENT_ID } from "@franreysaycon/bricks";

        ReactDOMServer.hydrate(<App content={pageData.markdownContent} />, document.getElementById(DOCUMENT_ID))
    `.trim()

    const fileName = pageDataFileName.split(".")[0]
    const entryPoint = `${artifactJSPath}/${fileName}.jsx`
    await fs.writeFile(entryPoint, jsScript)

    const builtJSDir = path.join(buildDir, FINAL_JS_PATH)
    await fs.ensureDir(builtJSDir)

    esbuild.buildSync({
        entryPoints: [
            entryPoint,
        ],
        bundle: true,
        outdir: `${builtJSDir}`,
        minify: true,
        sourcemap: false,
        splitting: true,
        format: "esm",
        platform: 'browser',
        external: [...await (await import("module")).builtinModules, "stream"],
        target: ['es2017'],
    });

    return fileName
}

export default generateScript

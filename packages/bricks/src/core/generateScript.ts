import path from "path"
import fs from "fs-extra"
import { ARTIFACT_JS_PATH, FINAL_JS_PATH } from "./constants"
import esbuild from "esbuild"

const generateScript =  async (pageDataFileName: string, buildDir: string): Promise<string> => {

    const artifactJSPath = path.join(buildDir, ARTIFACT_JS_PATH)
    await fs.ensureDir(artifactJSPath)

    const jsScript = `
        import React from "react";
        import ReactDOM from "react-dom";
        import pageData from "../pages_data/${pageDataFileName}";
        import { App, DOCUMENT_ID } from "bricks";

        ReactDOM.hydrate(
            <App content={pageData.markdownContent} />,
            DOCUMENT_ID
        )
    `

    const fileName = pageDataFileName.split(".")[0]
    const entryPoint = `${artifactJSPath}/${fileName}.jsx`
    await fs.writeFile(entryPoint, jsScript)

    const builtJSDir = path.join(buildDir, FINAL_JS_PATH)
    await fs.ensureDir(builtJSDir)

    esbuild.buildSync({
        entryPoints: [
            entryPoint,
        ],
        outfile: `${builtJSDir}/${fileName}.js`,
        bundle: true,
        minify: true,
        sourcemap: true,
        platform: 'node',
        external: [
          "react-markdown",
          "react",
          "react-dom",
          "bricks",
        ],
    });

    return fileName
}

export default generateScript

import { ARTIFACT_JS_PATH, FINAL_JS_PATH } from "./constants"

const generateScript =  async (pageDataFileName: string, appName: string, buildDir: string): Promise<string> => {
    const fs = await import("fs-extra")
    const path = await import("path")
    const esbuild = await import("esbuild")

    const artifactJSPath = path.join(buildDir, ARTIFACT_JS_PATH)
    await fs.ensureDir(artifactJSPath)

    const appScript = `
import pageData from "../pages_data/${pageDataFileName}";
import React from "react"
import { App } from "@franreysaycon/bricks";
import Component from "./components/${appName}";

export default () => (
    <App Component={Component} pageData={pageData} />
)
    `

    await fs.writeFile(`${artifactJSPath}/${appName}_app.jsx`, appScript)

    const jsScript = `
import ReactDOM from "react-dom";
import React from "react";
import { DOCUMENT_ID } from "@franreysaycon/bricks";
import App from "./${appName}_app"

ReactDOM.hydrate(<App />, document.getElementById(DOCUMENT_ID))
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
        external: [...await (await import("module")).builtinModules],
        target: ['es2017'],
    });

    const htmlScript = `
import App from "./${appName}_app"
import { renderHtml, FINAL_BUILD_PATH } from "@franreysaycon/bricks"
import fs from "fs-extra"
import path from "path"

fs.writeFile(path.join(process.cwd(), FINAL_BUILD_PATH, "${fileName}.html"), renderHtml(App, "js/${fileName}.js"))
console.log("Generated ${fileName}.html")
`
    await fs.writeFile(`${artifactJSPath}/${fileName}_render.jsx`, htmlScript)

    esbuild.buildSync({
        entryPoints: [
            `${artifactJSPath}/${fileName}_render.jsx`,
        ],
        bundle: true,
        outdir: `${builtJSDir}/scripts`,
        minify: true,
        sourcemap: false,
        format: "cjs",
        platform: 'node',
        external: [
            ...await (await import("module")).builtinModules,
            "fs-extra",
            "path",
            "react-dom",
            "react",
            "esbuild"
        ],
        target: ['es2017'],
    });

    return `${fileName}_render`
}

export default generateScript

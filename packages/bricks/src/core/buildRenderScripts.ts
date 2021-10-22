import { FINAL_JS_PATH } from "./constants"

const buildRenderScripts = async (jsRenderScripts: string[], buildDir: string): Promise<void> => {
    const esbuild = await import("esbuild")
    const path = await import("path")
    const builtJSDir = path.join(buildDir, FINAL_JS_PATH)

    esbuild.buildSync({
        entryPoints: jsRenderScripts,
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
            "esbuild",
            "esbuild-plugin-manifest",
            "@franreysaycon/bricks"
        ],
        target: ['es2017'],
    });
}

export default buildRenderScripts

import { BUILD_SRC } from "./constants"

const buildJSBundles = async (jsScripts: string[], buildDir: string): Promise<Record<string, string>> => {
    const createManifest = await import("esbuild-plugin-manifest")
    const fs = await import("fs-extra")
    const path = await import("path")
    const esbuild = await import ("esbuild")

    const builtJSDir = path.join(buildDir, BUILD_SRC)

    await esbuild.build({
        entryPoints: jsScripts,
        bundle: true,
        outdir: `${builtJSDir}`,
        minify: true,
        sourcemap: false,
        splitting: true,
        format: "esm",
        platform: 'browser',
        external: [...await (await import("module")).builtinModules],
        plugins: [createManifest.default({
            shortNames: "output",
        })],
        target: ['es2017'],
        loader: {".png": "file"},
    });
    const manifest = await fs.readJSON(path.join(builtJSDir, "manifest.json"))

    return manifest
}

export default buildJSBundles

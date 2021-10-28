import { ARTIFACT_SCRIPTS_SRC } from "./constants"
import { BricksConfiguration } from "./readConfiguration"

const buildRenderScripts = async (jsRenderScripts: string[], buildDir: string, config: BricksConfiguration): Promise<void> => {
    const esbuild = await import("esbuild")
    const path = await import("path")
    const scriptsDir = path.join(buildDir, ARTIFACT_SCRIPTS_SRC)

    esbuild.buildSync({
        entryPoints: jsRenderScripts,
        bundle: true,
        outdir: scriptsDir,
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
        loader: { '.png': 'file' },
        publicPath: config.imageSrc,
    });
}

export default buildRenderScripts

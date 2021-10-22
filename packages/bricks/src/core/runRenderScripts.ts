import { FINAL_RENDER_SCRIPTS } from "./constants";

const runRenderScripts = async (buildDir: string): Promise<void> => {
    // @ts-ignore
    const { fork } = await import("child-process-async")
    const path = await import("path")
    const fs = await import("fs-extra")

    const scriptsDir = path.join(buildDir, FINAL_RENDER_SCRIPTS)

    const scripts = await fs.readdir(scriptsDir)

    Promise.all(scripts.map(async script => {
        await fork(path.join(scriptsDir, script))
    }))
}

export default runRenderScripts

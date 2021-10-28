import { ARTIFACT_SCRIPTS_SRC } from "./constants"

const runRenderScripts = async (buildDir: string): Promise<void> => {
    // @ts-ignore
    const { fork } = await import("child-process-async")
    const path = await import("path")
    const fs = await import("fs-extra")

    const scriptsDir = path.join(buildDir, ARTIFACT_SCRIPTS_SRC)

    let scripts = await fs.readdir(scriptsDir)
    scripts = scripts.filter(s => s.split(".")[1] === "js")

    Promise.all(scripts.map(async script => {
        await fork(path.join(scriptsDir, script))
    }))
}

export default runRenderScripts

import { FINAL_BUILD_PATH, FINAL_RENDER_SCRIPTS } from "./constants";

const runRenderScript = async (filename: string): Promise<void> => {
    // @ts-ignore
    const { fork } = await import("child-process-async")
    const path = await import("path")

    const scriptsDir = path.join(process.cwd(), FINAL_BUILD_PATH, FINAL_RENDER_SCRIPTS)
    await fork(path.join(scriptsDir, filename))
}

export default runRenderScript

const defaultConfig = {
    buildPath: "out",
    artifactPath: ".artifact",
}

export interface BricksConfiguration {
    buildPath: string;
    artifactPath: string;
}

const readConfiguration = async (): Promise<BricksConfiguration> => {
    const path = await import("path")
    const fs = await import("fs-extra")

    const config = await fs.readJSON(path.join(process.cwd(), "bricks.config.json"))

    return { ...defaultConfig, ...config }
}

export default readConfiguration

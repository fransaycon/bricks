const defaultConfig = {
    buildPath: "out",
    artifactPath: ".artifact",
    imageSrc: "img",
}

export interface BricksConfiguration {
    buildPath: string;
    artifactPath: string;
    imageSrc: string;
}

const readConfiguration = async (): Promise<BricksConfiguration> => {
    const path = await import("path")
    const fs = await import("fs-extra")

    const config = await fs.readJSON(path.join(process.cwd(), "bricks.config.json"))

    return { ...defaultConfig, ...config }
}

export default readConfiguration

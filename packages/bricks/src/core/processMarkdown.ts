import { ARTIFACT_PAGES_DATA_PATH } from "./constants"

const processMarkdown = async (markdownPath: string, buildDir: string): Promise<string> => {
    const fs = await import("fs-extra")
    const path = await import("path")
    const matter = await import("gray-matter")

    const fileContents = await fs.readFile(markdownPath, 'utf8')
    const { data, content } = matter.default(fileContents)

    const artifactMarkdownPath = path.join(buildDir, ARTIFACT_PAGES_DATA_PATH)
    await fs.ensureDir(artifactMarkdownPath)

    const fileName = path.basename(markdownPath).split(".")[0]
    const artifactPath = `${artifactMarkdownPath}/${fileName}.json`

    await fs.writeJSON(artifactPath, {
        meta: data.meta,
        markdownContent: content,
    })

    return `${fileName}.json`
}

export default processMarkdown

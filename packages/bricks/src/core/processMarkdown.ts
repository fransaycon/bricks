import { ARTIFACT_PAGES_DATA_SRC } from "./constants"

interface ProcessedMarkdownT {
    pageDataFile: string;
    component: string;
}

const processMarkdown = async (markdownPath: string, buildDir: string): Promise<ProcessedMarkdownT> => {
    const fs = await import("fs-extra")
    const path = await import("path")
    const matter = await import("gray-matter")

    const fileContents = await fs.readFile(markdownPath, 'utf8')
    const { data, content } = matter.default(fileContents)

    const artifactMarkdownPath = path.join(buildDir, ARTIFACT_PAGES_DATA_SRC)
    await fs.ensureDir(artifactMarkdownPath)

    const fileName = path.basename(markdownPath).split(".")[0]
    const artifactPath = `${artifactMarkdownPath}/${fileName}.json`

    await fs.writeJSON(artifactPath, {
        matterData: data,
        markdownContent: content,
    })

    return {
        pageDataFile: `${fileName}.json`,
        component: data.component,
    }
}

export default processMarkdown

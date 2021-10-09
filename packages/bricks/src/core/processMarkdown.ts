import matter from "gray-matter"
import fs from "fs-extra"
import { Meta } from "../components/Document"

interface ProcessedMarkdown {
    meta: Meta;
    markdownContent: string;
}

const processMarkdown = async (path: string): Promise<ProcessedMarkdown> => {
    const fileContents = await fs.readFile(path, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        meta: data.meta,
        markdownContent: content,
    }
}

export default processMarkdown

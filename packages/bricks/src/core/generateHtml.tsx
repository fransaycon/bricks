import React from "react"
import ReactDOMServer from "react-dom/server"
import Document from "../components/Document"
import App from "../components/App"
import { ARTIFACT_PAGES_DATA_PATH } from "./constants"

const generateHtml = async (pageDataFilename: string, jsFileName: string, buildDir: string): Promise<string> => {

    const fs = await import("fs-extra")
    const path = await import("path")

    const pageData = await fs.readJSON(path.join(buildDir, ARTIFACT_PAGES_DATA_PATH , pageDataFilename))

    const markdownHtml = ReactDOMServer.renderToString(
        <App content={pageData.markdownContent} />
    )

    const documentContent = {
        html: markdownHtml,
        meta: pageData.meta,
    }
    const appHtml = ReactDOMServer.renderToString(
        <Document content={documentContent} jsPath={`js/${jsFileName}.js`} />
    )

    return appHtml
}

export default generateHtml

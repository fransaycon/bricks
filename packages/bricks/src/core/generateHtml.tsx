import React from "react"
import ReactDOMServer from "react-dom/server"
import ReactMarkdown from "react-markdown"
import Document, { Meta } from "../components/Document"

const generateHtml = (content: string, meta: Meta, jsPath: string, cssPath: string) => {
    const markdownHtml = ReactDOMServer.renderToString(
        <ReactMarkdown>{content}</ReactMarkdown>
    )
    const documentContent = {
        html: markdownHtml,
        meta,
    }
    const appHtml = ReactDOMServer.renderToString(
        <Document content={documentContent} jsPath={jsPath} cssPath={cssPath} />
    )

    return appHtml
}

export default generateHtml

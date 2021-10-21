import React, { ReactNode } from "react"
import ReactDOMServer from "react-dom/server"
import Document, { DocumentContext, HeadContext } from "../components/Document"

const renderHtml = (Component: React.FC, jsPath: string, cssPath?: string): string => {
    const head: ReactNode[] = []
    const appHtml =  ReactDOMServer.renderToString(
        <HeadContext.Provider value={head}>
            <Component />
        </HeadContext.Provider>
    )

    const html = ReactDOMServer.renderToString(
        <DocumentContext.Provider value={{
            head,
            jsPath,
            cssPath,
            html: appHtml
        }}>
            <Document />
        </DocumentContext.Provider>
    )

    return html
}

export default renderHtml

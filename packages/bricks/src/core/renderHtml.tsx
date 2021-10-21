import React, { ReactNode } from "react"
import ReactDOMServer from "react-dom/server"
import Document, { DocumentContext, HeadContext } from "../components/Document"
import { ServerStyleSheet, StyleSheetManager } from "styled-components"

const renderHtml = (Component: React.FC, jsPath: string): string => {
    const head: ReactNode[] = []

    const sheet = new ServerStyleSheet()
    try {
        const appHtml =  ReactDOMServer.renderToString(
            <HeadContext.Provider value={head}>
                <StyleSheetManager sheet={sheet.instance}>
                    <Component />
                </StyleSheetManager>
            </HeadContext.Provider>
        )

        const html = ReactDOMServer.renderToString(
            <DocumentContext.Provider value={{
                head,
                jsPath,
                css: sheet.getStyleElement(),
                html: appHtml
            }}>
                <Document />
            </DocumentContext.Provider>
        )

        return html
    } catch (error) {
        console.error(error)
    } finally {
        sheet.seal()
    }

    return ""
}

export default renderHtml

import React, { createContext, ReactElement, ReactNode, useContext } from "react"
import { DOCUMENT_ID } from "../core/constants"

export interface Meta {
    title: string;
}

type HeadContextT = ReactNode[]

interface DocumentContextT {
    head: ReactNode[];
    html: string;
    jsPath: string;
    cssPath?: string
}

export const HeadContext = createContext<HeadContextT | null>(null)
export const DocumentContext = createContext<DocumentContextT | null>(null)

const Document = (): ReactElement => { 
    const document = useContext(DocumentContext)

    return (
        <html>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                { document?.cssPath && 
                    <>
                        <link
                            rel="preload"
                            as="style"
                            href={document?.cssPath}
                        />
                        <link
                            rel="stylesheet"
                            href={document?.cssPath}
                        />
                    </>
                }
                { document?.head }
            </head>
            <body>
                <div id={DOCUMENT_ID} dangerouslySetInnerHTML={{ __html: document?.html ?? "" }} />
                <script type="module" src={document?.jsPath} />
            </body>
        </html>
    )
}

export default Document

import React, { ReactElement } from "react"
import { DOCUMENT_ID } from "../core/constants"

export interface Meta {
    title: string;
}

interface DocumentContent {
    html: string;
    meta: Meta;
}

interface DocumentProps {
    content: DocumentContent;
    jsPath: string;
    cssPath: string;
}

const Document = ({ content, jsPath, cssPath }: DocumentProps): ReactElement => (
    <html>
        <head>
            <title>{content.meta.title}</title>
            { cssPath && 
                <>
                    <link
                        rel="preload"
                        as="style"
                        href={cssPath}
                    />
                    <link
                        rel="stylesheet"
                        href={cssPath}
                    />
                </>
            }
        </head>
        <body>
            <div id={DOCUMENT_ID} dangerouslySetInnerHTML={{ __html: content.html }} />
            <script type="module" src={jsPath} />
        </body>
    </html>
)

export default Document

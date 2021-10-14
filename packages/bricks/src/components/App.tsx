import React, { ReactElement, useEffect } from "react"
import ReactMarkdown from "react-markdown"

interface AppProps {
    content: string;
}

const App = ({ content }: AppProps): ReactElement => {
    
    useEffect(() => {
        alert("Hello World")
    }, [])

    return (
        <ReactMarkdown>
            {content}
        </ReactMarkdown>
    )
}

export default App

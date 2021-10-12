import React from "react"
import ReactMarkdown from "react-markdown"

interface AppProps {
    content: string;
}

const App = ({ content }: AppProps) => (
    <ReactMarkdown>
        {content}
    </ReactMarkdown>
)

export default App
 
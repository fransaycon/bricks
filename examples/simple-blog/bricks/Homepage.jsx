import React, { useContext, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { BricksContext, Head } from "@franreysaycon/bricks"

const Homepage = () => {
    const bricks = useContext(BricksContext)

    useEffect(() => {
        alert("Im working")
    }, [])

    return (
        <>
            <Head>
                <title>{bricks?.matterData.meta.title}</title>
            </Head>
            <ReactMarkdown>
                {bricks?.markdownContent}
            </ReactMarkdown>
        </>
    )
}
export default Homepage

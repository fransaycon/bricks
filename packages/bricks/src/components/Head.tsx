import React, { useContext } from "react"
import { HeadContext } from "./Document"

const Head: React.FC = ({ children }) => {
    const context = useContext(HeadContext)

    if(children){
        context?.push(children)
    }

    return null
}

export default Head

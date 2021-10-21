import React, { ReactElement } from "react"
import BricksProvider, { PageData } from "./BricksProvider"

interface AppProps {
    Component: React.FC;
    pageData: PageData;
}

const App = ({ Component, pageData }: AppProps): ReactElement => {
    return (
        <BricksProvider pageData={pageData}>
            <Component />
        </BricksProvider>
    )
}

export default App

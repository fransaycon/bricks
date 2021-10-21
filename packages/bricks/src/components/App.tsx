import React, { ReactElement } from "react"
import BricksProvider, { PageData } from "./BricksProvider"
import Reset from "./Reset"

interface AppProps {
    Component: React.FC;
    pageData: PageData;
}

const App = ({ Component, pageData }: AppProps): ReactElement => {
    return (
        <BricksProvider pageData={pageData}>
            <Reset />
            <Component />
        </BricksProvider>
    )
}

export default App

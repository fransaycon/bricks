import React, { ReactElement } from "react"
import BricksProvider, { PageData } from "./BricksProvider"
import Reset from "./Reset"

interface AppProps {
    Component: React.FC;
    pageData: PageData;
    routesData: string[];
}

const App = ({ Component, pageData, routesData }: AppProps): ReactElement => {
    return (
        <BricksProvider pageData={pageData} routesData={routesData}>
            <Reset />
            <Component />
        </BricksProvider>
    )
}

export default App

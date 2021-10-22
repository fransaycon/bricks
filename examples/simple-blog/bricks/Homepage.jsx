import React, { useContext, useEffect, useState } from "react"
import { BricksContext, Head, styled } from "@franreysaycon/bricks"

const Container = styled.div`
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;
    background-color: #E2E2E2;
    flex-direction: column;

    & > * + * {
        margin-top: 2rem;
    }
`

const HiddenContainer = styled.div`
    width: 300px;
    height: 100px;
    background-color: blue;
`

const Homepage = () => {
    const bricks = useContext(BricksContext)
    const [boxes, addBox] = useState([])

    useEffect(() => {
        const interval = setInterval(() => addBox(b => [...b, 1]), 2000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <Container>
            <Head>
                <title>{bricks?.matterData.meta.title}</title>
            </Head>
            {boxes.map((_, i) => <HiddenContainer key={i} /> )}
        </Container>
    )
}

export default Homepage

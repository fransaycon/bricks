import React, { useContext, useEffect, useState } from "react"
import { BricksContext, Head, styled } from "@franreysaycon/bricks"
import reactLogo from "./images/logo.png"

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

const Homepage = () => {
    const bricks = useContext(BricksContext)

    return (
        <Container>
            <Head>
                <title>{bricks?.matterData.meta.title}</title>
            </Head>
            <img src={reactLogo} />
        </Container>
    )
}

export default Homepage

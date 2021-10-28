import React, { useContext } from 'react';
import { BricksContext, Head, styled } from '@franreysaycon/bricks';
import reactLogo from './images/logo.png';

const Container = styled.div`
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;
    background-color: #E2E2E2;
    flex-direction: column;
    font-family: sans-serif;
    color: #222222;
`;

const Homepage = () => {
  const { matterData, brickRoutes } = useContext(BricksContext);

  return (
    <Container>
      <Head>
        <title>{matterData.meta.title}</title>
      </Head>
      <h1>BRICKS IS AWESOME!</h1>
      <img alt="This is a React logo" src={reactLogo} width={300} height={300} />
      <ul>
        {brickRoutes.map((route) => <li key={route}><a href={`/${route}.html`}>{route}</a></li>)}
      </ul>
    </Container>
  );
};

export default Homepage;

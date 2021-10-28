import React, { useContext } from 'react';
import { BricksContext, Head, styled } from '@franreysaycon/bricks';
import ReactMarkdown from 'react-markdown';

const Container = styled.div`
    align-items: center;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;
    background-color: #E2E2E2;
    flex-direction: column;
`;

const BlogPage = () => {
  const { matterData, markdownContent } = useContext(BricksContext);

  return (
    <Container>
      <Head>
        <title>{matterData.meta.title}</title>
      </Head>
      <ReactMarkdown>
        {markdownContent}
      </ReactMarkdown>
    </Container>
  );
};

export default BlogPage;

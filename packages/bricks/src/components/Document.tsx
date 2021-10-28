import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from 'react';
import { DOCUMENT_ID } from '../core/constants';

export interface Meta {
  title: string;
}

type HeadContextT = ReactNode[];

interface DocumentContextT {
  head: ReactNode[];
  html: string;
  jsPath: string;
  css: ReactNode[];
}

export const HeadContext = /* @__PURE__ */ createContext<HeadContextT | null>(
  null
);
export const DocumentContext =
  /* @__PURE__ */ createContext<DocumentContextT | null>(null);

const Document = (): ReactElement => {
  const document = useContext(DocumentContext);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {document?.head}
        {document?.css}
      </head>
      <body>
        <div
          id={DOCUMENT_ID}
          dangerouslySetInnerHTML={{ __html: document?.html ?? '' }}
        />
        <script type="module" src={document?.jsPath} />
      </body>
    </html>
  );
};

export default Document;

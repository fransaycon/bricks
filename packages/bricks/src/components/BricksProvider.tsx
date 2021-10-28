import React, { createContext, useContext } from 'react';

interface BricksContextT {
  markdownContent: string;
  matterData: any;
  brickRoutes: string[];
}

export interface PageData {
  markdownContent: string;
  matterData: any;
}

interface BricksProviderT {
  pageData: PageData;
  routesData: string[];
}

export const BricksContext =
  /* @__PURE__ */ createContext<BricksContextT | null>(null);

const BricksProvider: React.FC<BricksProviderT> = ({
  children,
  pageData,
  routesData,
}) => {
  const { markdownContent, matterData } = pageData;

  return (
    <BricksContext.Provider
      value={{
        markdownContent,
        matterData,
        brickRoutes: routesData,
      }}
    >
      {children}
    </BricksContext.Provider>
  );
};

export const useBricks = () => useContext(BricksContext);

export default BricksProvider;

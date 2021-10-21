import React, { createContext, useContext } from "react"

interface BricksContextT {
  markdownContent: string;
  matterData: any;
} 

export interface PageData {
  markdownContent: string;
  matterData: any;
}

interface BricksProviderT {
  pageData: PageData;
}

export const BricksContext = /* #__PURE__ */ createContext<BricksContextT | null>(null)

const BricksProvider: React.FC<BricksProviderT> = ({ children, pageData }) => {
  const { markdownContent, matterData } = pageData

  return <BricksContext.Provider value={{
      markdownContent,
      matterData,
  }}>{children}</BricksContext.Provider>
}

export const useBricks = () => useContext(BricksContext)

export default BricksProvider

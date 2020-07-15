import React, { ReactNode } from "react"

interface Props {
  children: ReactNode
}

function LayoutWrapper({ children }: Props) {
  return (
    <>
      <header />
      <main className="min-h-screen">{children}</main>
      <footer />
    </>
  )
}

export default LayoutWrapper

import "@/styles/globals.css";

import { Ubuntu } from "next/font/google";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";

import { TRPCReactProvider } from "@/trpc/react";
import Navbar from "@/components/navbar";
import React from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Project Finder",
  description:
    "Unlock Your Coding Potential: Explore, Connect, and Contribute with Project Finder – Where Tech Dreams Find Their Code.",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${ubuntu.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <NextTopLoader color="#AC89F3" showSpinner={false} />
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Navbar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}

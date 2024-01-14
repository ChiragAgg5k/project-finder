import "@/styles/globals.css";

import { Ubuntu} from "next/font/google";
import { cookies } from "next/headers";

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
  description: "Unlock Your Coding Potential: Explore, Connect, and Contribute with Project Finder – Where Tech Dreams Find Their Code.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
          <NextSSRPlugin
              routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <Navbar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bzameen.com",
  description: "Real Estate Buy, Sell, Rent",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
      <Provider>
      <Toaster />
      {children}
      </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}

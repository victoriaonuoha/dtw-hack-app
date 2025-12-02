import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackendProvider } from "./context/BackendContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CredScore",
  description: "CreditScore Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BackendProvider> {children}</BackendProvider>
      </body>
    </html>
  );
}

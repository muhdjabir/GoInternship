"use client";

import NavigationBar from "@/components/navigation/NavigationBar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/navigation/Footer";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "GoInternship",
    description: "Your internships all in one place",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-white`}>
                <Providers>
                    <NavigationBar />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}

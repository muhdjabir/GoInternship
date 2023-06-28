"use client";

import NavigationBar from "@/components/NavigationBar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "GoInternship",
    description: "Your internships all in one",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-white`}>
                <NavigationBar />
                {children}
            </body>
        </html>
    );
}

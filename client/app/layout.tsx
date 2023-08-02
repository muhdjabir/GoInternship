"use client";

import NavigationBar from "@/components/navigation/NavigationBar";
import Footer from "@/components/navigation/Footer";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//     title: "GoInternship",
//     description: "Your internships all in one place",
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-teal-50`}>
                <ReduxProvider>
                    <NavigationBar />
                    {children}
                    <Footer />
                </ReduxProvider>
            </body>
        </html>
    );
}

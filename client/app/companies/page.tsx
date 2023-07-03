"use client";

import { useState } from "react";
import { Searchbar } from "@/components/input/Searchbar";

export default function Home() {
    const [search, useSearch] = useState<string>("");
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-5">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-montserrat lg:flex">
                <h1 className="text-2xl mb-5">Welcome to my companies page</h1>
                <Searchbar
                    label="Search for your companies"
                    setValue={useSearch}
                />
            </div>
        </main>
    );
}

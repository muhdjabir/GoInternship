"use client";

import { useState } from "react";
import { Searchbar } from "@/components/input/Searchbar";
import { Button } from "@material-tailwind/react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

export default function Home() {
    const [search, useSearch] = useState<string>("");
    return (
        <main className="min-h-screen px-5 py-5 lg:px-24 lg:pt-10">
            <h1 className="text-2xl mb-5 text-center">Your Companies</h1>
            <div className="flex flex-wrap gap-4">
                <Searchbar
                    label="Search for your companies"
                    setValue={useSearch}
                />
                <Button
                    variant="filled"
                    size="sm"
                    className="lg:px-5 bg-teal-400"
                >
                    Add Company <AddBusinessIcon />
                </Button>
            </div>
        </main>
    );
}

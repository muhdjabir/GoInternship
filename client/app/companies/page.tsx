"use client";

import { useState } from "react";
import { Searchbar } from "@/components/input/Searchbar";
import { Button, CardHeader } from "@material-tailwind/react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Modal from "@/components/cards/Modal";
import AddCompanyCard from "./AddCompanyCard";

export default function Home() {
    const [search, setSearch] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    return (
        <main className="min-h-screen px-5 py-5 lg:px-24 lg:pt-10">
            <h1 className="text-2xl mb-5 text-center">Your Companies</h1>
            <div className="flex flex-wrap gap-4">
                <Searchbar
                    label="Search for your companies"
                    setValue={setSearch}
                />
                <Button
                    variant="filled"
                    size="sm"
                    className="lg:px-5 bg-teal-400"
                    onClick={() => setOpen(!open)}
                >
                    Add Company <AddBusinessIcon />
                </Button>
            </div>
            <AddCompanyCard open={open} handleOpen={() => setOpen(!open)} />
        </main>
    );
}

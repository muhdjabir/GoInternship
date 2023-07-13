"use client";

import { useState } from "react";
import { Searchbar } from "@/components/input/Searchbar";
import { Button, CardHeader } from "@material-tailwind/react";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddCompanyCard from "./AddCompanyCard";
import { Company } from "@/typesheet";
import CompanyTile from "./CompanyTile";

const companies: Company[] = [
    {
        id: 1,
        name: "Trilogy Technologies",
        industry: "Research and Development",
        description: "Test Company 1",
        url: "nus.edu.sg",
    },
    {
        id: 2,
        name: "Amazon",
        industry: "Ecommerce",
        description: "Test Company 2",
        url: "nus.edu.sg",
    },
    {
        id: 3,
        name: "Meta",
        industry: "IT Services",
        description: "Test Company 3",
        url: "nus.edu.sg",
    },
    {
        id: 4,
        name: "Shopee",
        industry: "IT Services",
        description: "Test Company 3",
        url: "nus.edu.sg",
    },
    {
        id: 5,
        name: "Grab",
        industry: "IT Services",
        description: "Test Company 3",
        url: "nus.edu.sg",
    },
    {
        id: 6,
        name: "Bytedance",
        industry: "IT Services",
        description: "Test Company 3",
        url: "nus.edu.sg",
    },
];

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
            <div className="mt-5 gap-4">
                {companies &&
                    companies.map((company) => (
                        <CompanyTile company={company} key={company.id} />
                    ))}
            </div>
        </main>
    );
}

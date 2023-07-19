/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Searchbar } from "@/components/input/Searchbar";
import {
    Button,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import CompanyTile from "./CompanyTile";
import { Filter } from "@/components/input/Filter";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCompanyCard from "./AddCompanyCard";
import { Company } from "@/typesheet";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getCompanies } from "@/redux/features/companySlice";

export default function Company() {
    const [search, setSearch] = useState<string>("");
    const [industry, setIndustry] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const uid = useAppSelector(
        (state) => state.persistedReducer.auth.value.uid
    );
    const token = useAppSelector(
        (state) => state.persistedReducer.auth.value.token
    );
    const companies = useAppSelector(
        (state) => state.persistedReducer.company.value
    );

    const options: string[] = [
        "Retail",
        "Healthcare",
        "Banking/Financial Services",
        "Government/Defense",
        "Research and Development",
        "IT Services",
        "Manufacturing",
    ];

    useEffect(() => {
        const fetchCompany = async () => {
            console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/company/user/${uid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const json = await response.json();
            console.log(json.resources);
            if (response.ok) {
                dispatch(getCompanies(json.companies));
            }
        };
        fetchCompany();
        console.log(JSON.stringify(companies));
    }, []);

    return (
        <main className="min-h-screen px-5 py-5 lg:px-24 lg:pt-10">
            <h1 className="text-2xl mb-5 text-center">Your Companies</h1>
            <div className="flex flex-wrap gap-4">
                <Searchbar
                    label="Search for your companies"
                    setValue={setSearch}
                />
                <Filter
                    setFilter={setIndustry}
                    filter={industry}
                    label="Filter by Industry"
                    options={options}
                />
                {/* <Menu>
                    <MenuHandler>
                        <IconButton color="teal" variant="filled">
                            <FilterListIcon />
                        </IconButton>
                    </MenuHandler>
                    <MenuList onChange={(event) => console.log(event.target)}>
                        <MenuItem>Retail</MenuItem>
                        <MenuItem>Healthcare</MenuItem>
                        <MenuItem>Banking/Financial Services</MenuItem>
                        <MenuItem>Government/Defense</MenuItem>
                        <MenuItem>Research and Development</MenuItem>
                        <MenuItem>IT Services</MenuItem>
                    </MenuList>
                </Menu> */}
                <Button
                    variant="filled"
                    size="sm"
                    color="teal"
                    className="lg:px-5"
                    onClick={() => setOpen(!open)}
                >
                    Add Company <AddBusinessIcon />
                </Button>
            </div>

            <AddCompanyCard open={open} handleOpen={() => setOpen(!open)} />
            <div className="mt-5 gap-4">
                {companies &&
                    companies
                        .filter(
                            (company) =>
                                industry.length === 0 ||
                                industry.includes(company.industry)
                        )
                        .filter(
                            (company) =>
                                company.name.includes(search) ||
                                company.description.includes(search) ||
                                company.industry.includes(search)
                        )
                        .map((company) => (
                            <CompanyTile company={company} key={company.ID} />
                        ))}
            </div>
        </main>
    );
}

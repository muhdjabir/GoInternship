/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Card, CardBody } from "@material-tailwind/react";
import Title from "./Title";
import { useState, useEffect } from "react";
import Pagination from "@/components/navigation/Pagination";
import TableData from "./TableData";
import TableHeader from "./TableHeader";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getApplications } from "@/redux/features/applicationSlice";
import AddApplicationCard from "./AddApplicationCard";
import { platform } from "os";

export default function Applications() {
    const dispatch = useDispatch<AppDispatch>();
    const uid = useAppSelector(
        (state) => state.persistedReducer.auth.value.uid
    );
    const token = useAppSelector(
        (state) => state.persistedReducer.auth.value.token
    );
    const applications = useAppSelector(
        (state) => state.persistedReducer.application.value
    );
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState(applications);
    const [currentPage, setCurrentPage] = useState(1);

    const filter = (input: string) => {
        setCurrentPage(1);
        setData(
            applications.filter(
                (application) =>
                    application.role.toLowerCase().includes(input) ||
                    application.company.toLowerCase().includes(input) ||
                    application.assessment.toLowerCase().includes(input) ||
                    application.platform.toLowerCase().includes(input)
            )
        );
    };

    useEffect(() => {
        const fetchCompany = async () => {
            console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/application/user/${uid}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const json = await response.json();
            console.log(json.resources);
            if (response.ok) {
                dispatch(getApplications(json.applications));
            }
        };
        fetchCompany();
        console.log(JSON.stringify(applications));
    }, []);

    const TABLE_HEAD = [
        "Company",
        "Role",
        "Assessment",
        "Status",
        "Platform",
        "Applied",
        "Last Updated",
        "",
    ];

    const itemsPerPage = 10;

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get the current page's data
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <main className="min-h-screen px-5 py-5 lg:px-24 lg:pt-10">
            <h1 className="text-2xl mb-5 text-center">Your Applications</h1>
            <AddApplicationCard open={open} handleOpen={() => setOpen(!open)} />
            <Card className="h-full w-full">
                <Title setOpen={setOpen} setFilter={filter} />
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <TableHeader data={TABLE_HEAD} />
                        <TableData
                            getCurrentPageData={getCurrentPageData}
                            data={data}
                        />
                    </table>
                </CardBody>
                <Pagination
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    totalPages={totalPages}
                />
            </Card>
        </main>
    );
}

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
        "Transaction",
        "Amount",
        "Date",
        "Status",
        "Account",
        "",
    ];

    const TABLE_ROWS = [
        {
            name: "Spotify",
            amount: "$2,500",
            date: "Wed 3:00pm",
            status: "paid",
            account: "visa",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        {
            name: "Amazon",
            amount: "$5,000",
            date: "Wed 1:00pm",
            status: "paid",
            account: "master-card",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        {
            name: "Pinterest",
            amount: "$3,400",
            date: "Mon 7:40pm",
            status: "pending",
            account: "master-card",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        {
            name: "Google",
            amount: "$1,000",
            date: "Wed 5:00pm",
            status: "paid",
            account: "visa",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        {
            name: "netflix",
            amount: "$14,000",
            date: "Wed 3:30am",
            status: "cancelled",
            account: "visa",
            accountNumber: "1234",
            expiry: "06/2026",
        },
    ];
    const itemsPerPage = 3;

    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(TABLE_ROWS.length / itemsPerPage);

    // Get the current page's data
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return TABLE_ROWS.slice(startIndex, endIndex);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <main className="min-h-screen px-5 py-5 lg:px-24 lg:pt-10">
            <h1 className="text-2xl mb-5 text-center">Your Applications</h1>
            <Card className="h-full w-full">
                <Title />
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <TableHeader data={TABLE_HEAD} />
                        <TableData
                            getCurrentPageData={getCurrentPageData}
                            data={TABLE_ROWS}
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

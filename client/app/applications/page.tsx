"use client";

import {
    Card,
    Typography,
    CardBody,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import Title from "./Title";
import { useState } from "react";
import Pagination from "@/components/navigation/Pagination";
import TableData from "./TableData";
import TableHeader from "./TableHeader";

export default function Applications() {
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

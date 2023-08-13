/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getDashboard } from "@/redux/features/dashboardSlice";
import { Node, SankeyData } from "@/typesheet";
import SankeyChart from "./SankeyChart";
import { Card, CardBody } from "@material-tailwind/react";
import CardContainer from "./CardContainer";
import PieChart from "./PieChart";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const token = useAppSelector(
        (state) => state.persistedReducer.auth.value.token
    );
    const dashboard = useAppSelector(
        (state) => state.persistedReducer.dashboard.value
    );

    const nodes: Node[] = [
        {
            id: "Applied",
            nodeColor: "hsl(288, 70%, 50%)",
        },
        { id: "Ghosted", nodeColor: "hsl(199, 70%, 50%)" },
        { id: "Offered", nodeColor: "hsl(288, 70%, 50%)" },
        { id: "Rejected", nodeColor: "hsl(357, 70%, 50%)" },
        { id: "Interview", nodeColor: "hsl(116, 70%, 50%)" },
        { id: "Online Assessment", nodeColor: "hsl(186, 70%, 50%)" },
    ];

    useEffect(() => {
        const fetchCompany = async () => {
            console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const json = await response.json();
            console.log(json.resources);
            if (response.ok) {
                dispatch(getDashboard(json.data));
            }
        };
        fetchCompany();
        console.log(JSON.stringify(dashboard));
    }, []);

    const sankeyData: SankeyData = {
        nodes: nodes,
        links: dashboard.sankey,
    };

    const pieData = [
        {
            id: "Pending",
            label: "Pending",
            value: dashboard.pending,
            color: "hsl(170, 70%, 50%)",
        },
        {
            id: "Rejected",
            label: "Rejected",
            value: dashboard.rejected,
            color: "hsl(357, 70%, 50%)",
        },

        {
            id: "Offered",
            label: "Offered",
            value: dashboard.offered,
            color: "hsl(288, 70%, 50%)",
        },
    ];
    return (
        <main className="min-h-screen px-5 py-5 lg:px-24 lg:pt-10">
            <h1 className="text-2xl mb-5 text-center">Your Dashboard</h1>
            <Card className="grid grid-cols-3 p-4 my-4">
                <div className="col-span-3 h-80 text-center">
                    <h2 className="text-2xl text-center font-semibold">
                        Application Status
                    </h2>
                    {pieData.length !== 0 && <PieChart data={pieData} />}
                </div>
                <div className="justify-center w-full col-span-3">
                    <CardContainer />
                </div>
            </Card>
            <Card>
                <CardBody className="h-80">
                    <h2 className="text-2xl text-center font-semibold">
                        Application Sankey
                    </h2>
                    <div className="hidden md:block">
                        {dashboard.sankey != null && (
                            <SankeyChart data={sankeyData} />
                        )}
                    </div>
                    <div className="md:hidden">
                        <h3 className="text-center text-2xl">
                            Sankey chart only available on a larger screen
                        </h3>
                    </div>
                </CardBody>
            </Card>
        </main>
    );
}

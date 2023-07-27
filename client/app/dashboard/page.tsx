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

    const data: SankeyData = {
        nodes: nodes,
        links: dashboard.sankey,
    };
    return (
        <main className="min-h-screen px-5 py-5 lg:px-24 lg:pt-10">
            <h1 className="text-2xl mb-5 text-center">Your Dashboard</h1>
            <CardContainer />
            <Card>
                <CardBody style={{ height: 400 }}>
                    <h2 className="text-2xl text-center font-semibold">
                        Application Sankey
                    </h2>
                    <SankeyChart data={data} />
                </CardBody>
            </Card>
        </main>
    );
}

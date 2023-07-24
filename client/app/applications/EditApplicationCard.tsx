"use client";

import { useState } from "react";
import Modal from "@/components/cards/Modal";
import {
    Button,
    Textarea,
    CardFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/store";
import { updateApplication } from "@/redux/features/applicationSlice";
import { Application } from "@/typesheet";

export default function EditApplicationCard({
    open,
    handleOpen,
    application,
}: {
    open: boolean;
    handleOpen: () => void;
    application: Application;
}) {
    const [assessment, setAssessment] = useState<string>(
        application.assessment
    );
    const [phase, setPhase] = useState<string>(
        application.process[application.process.length - 1]
    );
    const dispatch = useDispatch<AppDispatch>();
    const token = useAppSelector(
        (state) => state.persistedReducer.auth.value.token
    );
    const uid = useAppSelector(
        (state) => state.persistedReducer.auth.value.uid
    );

    const valid = () => {
        return assessment === "" || phase === "";
    };

    const currentStatus = () => {
        if (phase === "Ghosted") {
            return "Ghosted";
        } else if (phase === "Offered") {
            return "Offered";
        } else if (phase === "Rejected") {
            return "Rejected";
        } else {
            return "Pending";
        }
    };

    const currentProcess = () => {
        if (phase !== application.process[application.process.length - 1]) {
            return [...application.process, phase];
        } else {
            return application.process;
        }
    };

    const handleSubmit = async () => {
        console.log(phase, assessment);
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/application/${application.ID}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    role: application.role,
                    status: currentStatus(),
                    process: currentProcess(),
                    platform: application.platform,
                    company: application.company,
                    assessment: assessment,
                    user_id: application.UserID,
                    company_id: application.CompanyID,
                }),
            }
        );
        const json = await response.json();

        if (response.ok) {
            dispatch(updateApplication(json.application));
            handleOpen();
        }
    };

    return (
        <Modal open={open} handleOpen={handleOpen} label="Edit application">
            <Textarea
                label="Assessment"
                defaultValue={assessment}
                onChange={(e) => setAssessment(e.target.value)}
            />
            <Select
                label="Current Phase"
                defaultValue={phase}
                onChange={(e) => setPhase(e ? e : "")}
            >
                {application.process[application.process.length - 1] ===
                    "Applied" && (
                    <Option value="Online Assessment">
                        Online Assessment{" "}
                    </Option>
                )}
                {application.process[application.process.length - 1] !==
                    "Interview" && <Option value="Interview">Interview</Option>}
                <Option value="Ghosted">Ghosted</Option>
                <Option value="Offered">Offered</Option>
                <Option value="Rejected">Rejected</Option>
            </Select>
            <CardFooter className="flex justify-center gap-4">
                <Button variant="outlined" color="teal" onClick={handleOpen}>
                    Cancel
                </Button>
                <Button
                    variant="filled"
                    className="bg-teal-400"
                    disabled={valid()}
                    onClick={handleSubmit}
                >
                    Edit
                </Button>
            </CardFooter>
        </Modal>
    );
}

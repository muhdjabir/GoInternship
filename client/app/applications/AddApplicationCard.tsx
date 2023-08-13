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
import { createApplication } from "@/redux/features/applicationSlice";
import { Company } from "@/typesheet";

export default function AddApplicationCard({
    open,
    handleOpen,
}: {
    open: boolean;
    handleOpen: () => void;
}) {
    const [role, setRole] = useState<String>("");
    const [platform, setPlatform] = useState<String>("");
    const [assessment, setAssessment] = useState<String>("");
    const [company, setCompany] = useState<Company>();
    const dispatch = useDispatch<AppDispatch>();
    const token = useAppSelector(
        (state) => state.persistedReducer.auth.value.token
    );
    const uid = useAppSelector(
        (state) => state.persistedReducer.auth.value.uid
    );
    const companies = useAppSelector(
        (state) => state.persistedReducer.company.value
    );

    const valid = () => {
        return (
            role === "" ||
            platform === "" ||
            assessment === "" ||
            company == null
        );
    };

    const handleSubmit = async () => {
        console.log(role, platform, assessment);
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/application`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    role,
                    status: "Pending",
                    process: ["Applied"],
                    platform,
                    assessment,
                    company: company!.name,
                    user_id: uid,
                    company_id: company!.ID,
                }),
            }
        );
        const json = await response.json();

        if (response.ok) {
            dispatch(createApplication(json.application));
            handleOpen();
        }
    };

    return (
        <Modal open={open} handleOpen={handleOpen} label="Add an application">
            <Input label="Role" onChange={(e) => setRole(e.target.value)} />
            <Select
                label="Company"
                value=""
                onChange={(e) =>
                    setCompany(
                        companies.find((comp) => comp.ID.toString() === e)
                    )
                }
            >
                {companies &&
                    companies.map((company) => (
                        <Option key={company.ID} value={company.ID.toString()}>
                            {company.name}
                        </Option>
                    ))}
            </Select>
            <Select
                label="Platform applied"
                value=""
                onChange={(e) => setPlatform(e ? e : "")}
            >
                <Option value="InternSG">InternSG</Option>
                <Option value="TalentConnect">TalentConnect</Option>
                <Option value="Company Website">Company Website</Option>
                <Option value="Linkedin">Linkedin</Option>
                <Option value="Glints">Glints</Option>
                <Option value="Networking">Networking</Option>
                <Option value="Nodeflair">Nodeflair</Option>
                <Option value="Glints">Glints</Option>
            </Select>
            <Textarea
                label="Assessment"
                onChange={(e) => setAssessment(e.target.value)}
            />
            <CardFooter className="flex justify-center gap-4">
                <Button variant="outlined" color="teal" onClick={handleOpen}>
                    Cancel
                </Button>
                <Button
                    variant="filled"
                    color="teal"
                    disabled={valid()}
                    onClick={handleSubmit}
                >
                    Add
                </Button>
            </CardFooter>
        </Modal>
    );
}

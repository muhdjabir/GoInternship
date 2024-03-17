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
import { createCompany } from "@/redux/features/companySlice";

export default function AddCompanyCard({
    open,
    handleOpen,
}: {
    open: boolean;
    handleOpen: () => void;
}) {
    const [name, setName] = useState<String>("");
    const [industry, setIndustry] = useState<String>("");
    const [description, setDescription] = useState<String>("");
    const [url, setUrl] = useState<String>("");
    const dispatch = useDispatch<AppDispatch>();
    const token = useAppSelector(
        (state) => state.persistedReducer.auth.value.token
    );
    const uid = useAppSelector(
        (state) => state.persistedReducer.auth.value.uid
    );

    const valid = () => {
        return (
            name === "" || industry === "" || description === "" || url === ""
        );
    };

    const handleSubmit = async () => {
        console.log(name, industry, description, url);
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/company/`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    industry,
                    description,
                    url,
                    user_id: uid,
                }),
            }
        );
        const json = await response.json();

        if (response.ok) {
            dispatch(createCompany(json.company));
            handleOpen();
        }
    };

    return (
        <Modal open={open} handleOpen={handleOpen} label="Add a company">
            <Input label="Name" onChange={(e) => setName(e.target.value)} />
            <Select
                label="Industry"
                value=""
                onChange={(e) => setIndustry(e ? e : "")}
            >
                <Option value="Retail">Retail</Option>
                <Option value="Healthcare">Healthcare</Option>
                <Option value="Manufacturing">Manufacturing</Option>
                <Option value="Banking/Financial Services">
                    Banking/Financial Services
                </Option>
                <Option value="Government/Defense">Government/Defense</Option>
                <Option value="Research and Development">
                    Research and Development
                </Option>
                <Option value="IT Services">IT Services</Option>
            </Select>
            <Textarea
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input
                label="Company Portal"
                onChange={(e) => setUrl(e.target.value)}
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

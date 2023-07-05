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

    const handleSubmit = () => {
        console.log(name, url, industry, description);
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
                    className="bg-teal-400"
                    onClick={handleSubmit}
                >
                    Add
                </Button>
            </CardFooter>
        </Modal>
    );
}

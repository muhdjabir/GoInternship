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
import { updateCompany } from "@/redux/features/companySlice";
import { Company } from "@/typesheet";

export default function EditCompanyCard({
    open,
    handleOpen,
    company,
}: {
    open: boolean;
    handleOpen: () => void;
    company: Company;
}) {
    const [name, setName] = useState<String>(company.name);
    const [industry, setIndustry] = useState<String>(company.industry);
    const [description, setDescription] = useState<String>(company.description);
    const [url, setUrl] = useState<String>(company.url);
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
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/company/${company.ID}`,
            {
                method: "PATCH",
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
            dispatch(updateCompany(json.company));
            handleOpen();
        }
    };

    return (
        <Modal open={open} handleOpen={handleOpen} label="Edit company">
            <Input
                label="Name"
                defaultValue={company.name}
                onChange={(e) => setName(e.target.value)}
            />
            <Select
                label={company.industry}
                defaultValue={company.industry}
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
                defaultValue={company.description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input
                label="Company Portal"
                defaultValue={company.url}
                onChange={(e) => setUrl(e.target.value)}
            />
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

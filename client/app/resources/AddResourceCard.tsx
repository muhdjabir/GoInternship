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

export default function AddResourceCard({
    open,
    handleOpen,
}: {
    open: boolean;
    handleOpen: () => void;
}) {
    const [title, setTitle] = useState<String>("");
    const [description, setDescription] = useState<String>("");
    const [url, setUrl] = useState<String>("");

    const handleSubmit = () => {
        console.log(title, url, description);
    };

    return (
        <Modal open={open} handleOpen={handleOpen} label="Add a resource">
            <Input label="Title" onChange={(e) => setTitle(e.target.value)} />
            <Textarea
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input
                label="Resource URL"
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

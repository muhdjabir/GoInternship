"use client";

import { useState } from "react";
import Modal from "@/components/cards/Modal";
import { Button, Textarea, CardFooter, Input } from "@material-tailwind/react";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createResource } from "@/redux/features/resourceSlice";

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
    const dispatch = useDispatch<AppDispatch>();
    const token = useAppSelector(
        (state) => state.persistedReducer.auth.value.token
    );
    const uid = useAppSelector(
        (state) => state.persistedReducer.auth.value.uid
    );

    const handleSubmit = async () => {
        console.log(title, url, description);
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/resource`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description, url, user_id: uid }),
            }
        );
        const json = await response.json();

        if (response.ok) {
            dispatch(createResource(json.resource));
            handleOpen();
        }
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

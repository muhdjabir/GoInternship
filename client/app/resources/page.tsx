/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Searchbar } from "@/components/input/Searchbar";
import { Button } from "@material-tailwind/react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Resource } from "@/typesheet";
import { useAppSelector } from "@/redux/store";
import ResourceTile from "./ResourceTile";
import AddResourceCard from "./AddResourceCard";

export default function Resource() {
    const [resources, setResources] = useState([]);
    const [search, setSearch] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const token = useAppSelector(
        (state) => state.persistedReducer.auth.value.token
    );

    useEffect(() => {
        const fetchResource = async () => {
            const response = await fetch(
                "http://127.0.0.1:8080/api/admin/resource",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const json = await response.json();
            console.log(json.resources);
            if (response.ok) {
                setResources(json.resources);
            }
        };
        fetchResource();
        console.log(JSON.stringify(resources));
    }, []);

    return (
        <main className="min-h-screen px-5 py-5 lg:px-24 lg:pt-10">
            <h1 className="text-2xl mb-5 text-center">Community Resources</h1>
            <div className="flex flex-wrap gap-4">
                <Searchbar
                    label="Search for your resources"
                    setValue={setSearch}
                />
                <Button
                    variant="filled"
                    size="sm"
                    className="lg:px-5 bg-teal-400"
                    onClick={() => setOpen(!open)}
                >
                    Add Resource <PostAddIcon />
                </Button>
            </div>

            <AddResourceCard open={open} handleOpen={() => setOpen(!open)} />
            <div className="mt-5 gap-4">
                {resources &&
                    resources.map((resource: Resource) => (
                        <ResourceTile resource={resource} key={resource.ID} />
                    ))}
            </div>
        </main>
    );
}

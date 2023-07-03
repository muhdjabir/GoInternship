"use client";

import { Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";

export function Searchbar({
    label,
    setValue,
}: {
    label: string;
    setValue: (value: string) => void;
}) {
    return (
        <div>
            <Input
                type="search"
                label={label}
                icon={<SearchIcon />}
                onChange={(e) => console.log(e.target.value)}
            />
        </div>
    );
}

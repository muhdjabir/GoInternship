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
        <div className="grow">
            <Input
                type="search"
                color="teal"
                label={label}
                icon={<SearchIcon />}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

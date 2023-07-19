"use client";

import {
    Popover,
    PopoverHandler,
    PopoverContent,
    IconButton,
    Input,
} from "@material-tailwind/react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Autocomplete, TextField } from "@mui/material";

export function Filter({
    setFilter,
    label,
    options,
}: {
    setFilter: (value: string[]) => void;
    label: string;
    options: string[];
}) {
    return (
        <Popover placement="bottom">
            <PopoverHandler>
                <IconButton color="teal" variant="filled">
                    <FilterListIcon />
                </IconButton>
            </PopoverHandler>
            <PopoverContent className="w-96">
                <h2>{label}</h2>
                <div className="flex gap-2">
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={options}
                        getOptionLabel={(option) => option}
                        defaultValue={[options[3]]}
                        onChange={(event, value) => setFilter(value)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                placeholder="Industry"
                            />
                        )}
                    />
                </div>
            </PopoverContent>
        </Popover>
    );
}

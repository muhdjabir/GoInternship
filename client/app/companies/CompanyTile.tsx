import DataCard from "@/components/cards/DataCard";
import { Chip, IconButton } from "@material-tailwind/react";
import { Company } from "@/typesheet";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import EditCompanyCard from "./EditCompanyCard";
import { useState } from "react";

export default function CompanyTile({ company }: { company: Company }) {
    const [open, setOpen] = useState(true);

    return (
        <DataCard>
            <div className="p-4 col-span-5">
                <h2 className="font-bold">
                    {company.name}
                    <Chip
                        value={company.industry}
                        size="sm"
                        color="teal"
                        variant="ghost"
                        className="max-w-[15rem]"
                    />
                </h2>
                <h2 className="font-medium">
                    Company Portal:{" "}
                    <a
                        target="__blank"
                        href={company.url}
                        className="hover:underline hover:underline-offset-2"
                    >
                        {company.url}
                    </a>
                </h2>
                <h2>{company.description}</h2>
            </div>
            <div className="col-start-8 my-auto mx-auto">
                {/* <Link> */}
                <IconButton
                    variant="text"
                    color="teal"
                    onClick={() => setOpen(!open)}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
                {/* </Link> */}
            </div>
            <EditCompanyCard
                open={open}
                handleOpen={() => setOpen(!open)}
                company={company}
            />
        </DataCard>
    );
}

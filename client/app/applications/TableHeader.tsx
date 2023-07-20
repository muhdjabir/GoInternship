import { Typography } from "@material-tailwind/react";

export default function TableHeader({ data }: { data: any[] }) {
    return (
        <thead>
            <tr>
                {data.map((head) => (
                    <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                        >
                            {head}
                        </Typography>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

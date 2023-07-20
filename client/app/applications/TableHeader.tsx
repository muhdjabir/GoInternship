export default function TableHeader({ data }: { data: any[] }) {
    return (
        <thead>
            <tr>
                {data.map((head) => (
                    <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                        <h5 className="text-sm font-normal leading-none opacity-80">
                            {head}
                        </h5>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

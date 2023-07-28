import { Card, CardBody } from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/alert";

export default function NumberCard({
    title,
    color,
    data,
}: {
    title: string;
    color: color;
    data: number;
}) {
    return (
        <Card
            color={color}
            className="text-center hover hover:scale-110 ease-in transition-transform my-2"
        >
            <CardBody>
                <h2>{title}</h2>
                <h2>{data}</h2>
            </CardBody>
        </Card>
    );
}

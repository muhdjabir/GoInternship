import { Card, CardBody } from "@material-tailwind/react";

export default function NumberCard({
    title,
    color,
    data,
}: {
    title: string;
    color: string;
    data: number;
}) {
    return (
        <Card className={`text-center`}>
            <CardBody>
                <h2>{title}</h2>
                <h2>{data}</h2>
            </CardBody>
        </Card>
    );
}

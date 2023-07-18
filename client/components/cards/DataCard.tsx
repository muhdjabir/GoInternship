import { Card } from "@material-tailwind/react";
import { ReactNode } from "react";

export default function DataCard({ children }: { children: ReactNode }) {
    return (
        <Card className="grid grid-cols-8 w-full font-light my-2">
            {children}
        </Card>
    );
}

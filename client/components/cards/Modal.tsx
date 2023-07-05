"use client";

import { Card, CardHeader, CardBody, Dialog } from "@material-tailwind/react";
import { ReactNode } from "react";

export default function Modal({
    children,
    open,
    handleOpen,
    label,
}: {
    children: ReactNode;
    open: boolean;
    handleOpen: () => void;
    label: String;
}) {
    return (
        <Dialog
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
        >
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardHeader
                    variant="gradient"
                    color="teal"
                    className="mb-4 grid h-14 place-items-center"
                >
                    <h2 className="text-md lg:text-xl">{label}</h2>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">{children}</CardBody>
            </Card>
        </Dialog>
    );
}

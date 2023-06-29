"use client";

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";

export default function SignupForm() {
    return (
        <Card
            className="mx-auto justify-center"
            color="transparent"
            shadow={false}
        >
            <Typography variant="h4" color="blue-gray">
                Create an account
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                <div className="mb-4 flex flex-col gap-6">
                    <Input size="lg" label="Email" />
                    <Input size="lg" label="Name" />
                    <Input type="password" size="lg" label="Password" />
                </div>
                <Button className="mt-6 bg-teal-400" fullWidth>
                    Sign up
                </Button>
                <Link href="/login">
                    <p className="text-blue-400 hover:underline hover:underline-offset-1">
                        Already have an account?
                    </p>
                </Link>
            </form>
        </Card>
    );
}

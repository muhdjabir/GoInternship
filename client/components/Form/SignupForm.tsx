"use client";

import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import { useSignup } from "@/hooks/useSignup";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const { signup, isLoading, error } = useSignup();

    const handleSignup = async () => {
        console.log({
            email: email,
            password: password,
        });
        await signup(email, password, username);
    };

    return (
        <Card
            className="mx-auto justify-center"
            color="transparent"
            shadow={false}
        >
            <Image
                src="/gointernship_logo.svg"
                alt="Logo"
                width={148}
                height={148}
                className="mx-auto mb-5"
            />
            <Typography variant="h4" color="blue-gray" className="text-center">
                Create an account
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                <div className="mb-4 flex flex-col gap-6">
                    <Input
                        size="lg"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        size="lg"
                        label="Name"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="password"
                        size="lg"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
                        {error}
                    </div>
                )}
                <Button
                    className="mt-6 bg-teal-400"
                    fullWidth
                    onClick={handleSignup}
                >
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

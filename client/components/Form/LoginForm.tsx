"use client";

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { logIn } from "@/redux/features/authSlice";

const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async () => {
        console.log({
            email: email,
            password: password,
        });
        dispatch(logIn(email));
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
                Login to your account
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                <div className="mb-4 flex flex-col gap-6">
                    <Input
                        size="lg"
                        label="Email"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        size="lg"
                        label="Password"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    className="mt-6 bg-teal-400"
                    fullWidth
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <Link href="/signup">
                    <p className="text-blue-400 hover:underline hover:underline-offset-1">
                        Dont have an account?
                    </p>
                </Link>
            </form>
        </Card>
    );
};

export default LoginForm;

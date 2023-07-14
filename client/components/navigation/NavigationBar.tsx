"use client";

import { useEffect, useState } from "react";
import {
    Typography,
    Button,
    Navbar,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import { useAppSelector } from "@/redux/store";

export default function NavigationBar() {
    const [openNav, setOpenNav] = useState(false);
    const username = useAppSelector(
        (state) => state.authReducer.value.username
    );
    const { logout } = useLogout();

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Link href="/dashboard">
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    Dashboard
                </Typography>
            </Link>
            <Link href="/companies">
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    Companies
                </Typography>
            </Link>
            <Link href="/applications">
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    Applications
                </Typography>
            </Link>
            <Link href="/resources">
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    Resources
                </Typography>
            </Link>
        </ul>
    );

    return (
        <Navbar className="mx-auto  py-2 px-4 lg:px-8 lg:py-4 w-screen">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900 font-montserrat">
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 cursor-pointer py-1.5 font-semibold"
                >
                    GoInternship
                </Typography>
                <div className="hidden lg:block">{navList}</div>
                {username && (
                    <div className="flex">
                        <h1> User: {username} </h1>
                        <Link href="/">
                            <Button
                                variant="filled"
                                size="sm"
                                color="teal"
                                className="hidden lg:inline-block"
                                onClick={logout}
                            >
                                <span>Logout</span>
                            </Button>
                        </Link>
                    </div>
                )}
                {!username && (
                    <div>
                        <Link href="/login">
                            <Button
                                variant="outlined"
                                color="teal"
                                size="sm"
                                className="hidden lg:inline-block mr-5 text-teal-400"
                            >
                                <span>Log in</span>
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button
                                variant="filled"
                                color="teal"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Register</span>
                            </Button>
                        </Link>
                    </div>
                )}
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <div className="container mx-auto">
                    {navList}
                    {!username && (
                        <div>
                            <Link href="/login">
                                <Button
                                    variant="outlined"
                                    size="sm"
                                    color="teal"
                                    fullWidth
                                    className="mb-2 text-teal-400"
                                >
                                    <span>Log in</span>
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button
                                    variant="filled"
                                    size="sm"
                                    color="teal"
                                    fullWidth
                                    className="mb-2"
                                >
                                    <span>Register</span>
                                </Button>
                            </Link>
                        </div>
                    )}
                    {username && (
                        <div>
                            <Link href="/">
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    color="teal"
                                    fullWidth
                                    onClick={logout}
                                >
                                    <span>Log out</span>
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </Collapse>
        </Navbar>
    );
}

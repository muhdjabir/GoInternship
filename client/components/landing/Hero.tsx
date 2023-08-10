"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@material-tailwind/react";

const Hero = () => {
    return (
        <div className="w-full py-16 px-4">
            <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
                <div className="flex flex-col text-black justify-between">
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-poppins py-2 text-left border-b-8 border-teal-400">
                        Track all your applications in one place
                    </h1>
                    <p className="text-2xl font-montserrat text-left text-gray-500 font-normal">
                        Centralise your Internship grind and learn from the
                        community around you
                    </p>
                    <div>
                        <Link href="/signup">
                            <Button variant="filled" size="lg" color="teal">
                                <span>Join us</span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div>
                    <Image
                        className="w-[500px] mx-auto my-4"
                        src="/laptop.png"
                        alt="Logo"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;

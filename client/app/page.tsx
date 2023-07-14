"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import Hero from "@/components/landing/Hero";
import { useEffect } from "react";
import { logIn } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchUser = () => {
            const user = localStorage.getItem("user");
            if (user != null) {
                const currentUser = JSON.parse(user);
                dispatch(logIn(currentUser));
            }
        };
        fetchUser();
    }, []);
    return (
        <div className="text-center">
            <div className="">
                <Hero />
            </div>
        </div>
    );
}

import Hero from "@/components/landing/Hero";
import Image from "next/image";

export default function Home() {
    return (
        <div className="text-center">
            <div className="">
                <Hero />
            </div>
            <h1 className="text-2xl">Welcome to my landing page</h1>
        </div>
    );
}

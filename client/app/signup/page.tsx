/* eslint-disable @next/next/no-img-element */

import SignupForm from "@/components/form/SignupForm";

export default function Login() {
    return (
        <div className="flex grid-cols-2 justify-center h-screen">
            <img
                src="/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg"
                alt=""
                className="hidden md:flex md:w-1/2 lg:w-3/5 h-screen object-cover"
            />
            <SignupForm />
        </div>
    );
}

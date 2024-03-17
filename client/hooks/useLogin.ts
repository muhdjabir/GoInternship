import { useState } from "react";
import { logIn } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { AuthState } from "@/typesheet";
import { useRouter } from "next/navigation";


// Login function for user authentication
// Works by sending post request to api/auth/login to 
// establish new user connection
// Upon success, dispatches the AuthContext to be made available
// to all components
// Additionally, instantiates a user in the localStorage to remember upon app closure

export const useLogin = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const getUser = async (token: string) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const json = await response.json();
        const data = json.data
        if (!response.ok) {
            setError("Unauthorized Action")
        }
        if (response.ok) {
            const user: AuthState = {
                isAuth: true,
                username: data.email,
                uid: data.ID,
                token: token
            }
            // console.log(user);
            // console.log(data)
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(logIn(user));
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError("");

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        // const response = await fetch(`http://127.0.0.1:8080/api/`);
        const json = await response.json();
        console.log(response.ok)

        if (!response.ok) {
            setIsLoading(false);
            if (json.error === "crypto/bcrypt: hashedPassword is not the hash of the given password") {
                setError("Incorrect Password");
            } else {
                setError("User does not exist");
            }
            console.log(error);
        }
        if (response.ok) {
            const token = json.token;
            console.log(token);
            await getUser(token);
            router.push("/dashboard");
        }
    }
    return { login, isLoading, error };
}
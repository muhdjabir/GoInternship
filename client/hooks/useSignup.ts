import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLogin } from "./useLogin";
// Signup hook that sends POST request to /api/auth/signup
// to create a new auth entry. Upon success user is logged in 
// similar to useLogin hook
export const useSignup = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const { login } = useLogin();

    const signup = async (email: string, password: string, username: string) => {
        setIsLoading(true);
        setError("");

        const response = await fetch(`http://127.0.0.1:8080/api/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, username})
        });
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError("Account already exists");
        }
        if (response.ok) {
                await login(email, password);
                setIsLoading(false);
                setSuccess("Account successfully created");
            }
        }
    return { signup, isLoading, error, success};
}
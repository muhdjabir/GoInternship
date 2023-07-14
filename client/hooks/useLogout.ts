import { logOut } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
// Logout Function updates the localStorage to no longer contain user
// and removes the token
export const useLogout = () => {
    const dispatch = useDispatch<AppDispatch>();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch(logOut());
    }

    return {logout}
}
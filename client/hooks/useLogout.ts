import { logOut } from "@/redux/features/authSlice";
import { resetApplications } from "@/redux/features/applicationSlice";
import { resetCompanies } from "@/redux/features/companySlice";
import { resetDashboard } from "@/redux/features/dashboardSlice";
import { resetResources } from "@/redux/features/resourceSlice";
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
        dispatch(resetApplications());
        dispatch(resetCompanies());
        dispatch(resetDashboard());
        dispatch(resetResources());
    }

    return {logout}
}
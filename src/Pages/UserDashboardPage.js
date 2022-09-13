import { useSelector } from "react-redux";
import Dashboard from "../components/Dashboard/Dashboard"
import { SignIn } from "../components/SignIn_Up/SignIn";

export const UserDashboardPage = (dashboardOwner) => {
    const currentUser = useSelector(state => state.users.currentUser);

    if (!currentUser.id) return (
        <SignIn />
    );
    return (
        <Dashboard dashboardOwner={dashboardOwner}/>
    )
}
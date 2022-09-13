// import { useEffect } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../components/Dashboard/Dashboard"
import { SignIn } from "../components/SignIn_Up/SignIn";
// import { fetchOrganization } from "../store/organizationSlice";

export const CreatorDachboardPage = (dashboardOwner) => {
    const currentUser = useSelector(state => state.users.currentUser);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (currentUser) {
    //         dispatch(fetchOrganization(currentUser.id));
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [currentUser]);

    if (!currentUser.id) return (
        <SignIn />
    );
    return (
        <Dashboard dashboardOwner={dashboardOwner}/>
    )
}
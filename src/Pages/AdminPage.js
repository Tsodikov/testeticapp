import Dashboard from "../components/Dashboard/Dashboard"

export const AdminPage = (dashboardOwner) => {
    return (
        <Dashboard dashboardOwner={dashboardOwner}/>
    )
}
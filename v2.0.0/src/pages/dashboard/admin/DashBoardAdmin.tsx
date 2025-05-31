import { Outlet } from "react-router"
import Header from "./Header"
import Sidebar from "./Sidebar"

const DashBoardAdmin = () => {
    return (
        <div className="flex h-screen w-full">
            {/* Silebar(all option controll route) */}
            <Sidebar/>
            <div className="flex flex-col flex-1">
                {/* Header */}
                <Header/>
                <main className="flex-1 overflow-y-auto p-4 bg-surface-1">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default DashBoardAdmin

import { Sidebar } from "./Sidebar"
import { Outlet } from "react-router-dom"
import { Bell, Search } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

export function DashboardLayout() {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-[#020617]">
            <Sidebar />

            <main className="pl-64 min-h-screen flex flex-col">
                {/* Header */}
                <header className="h-[72px] border-b border-slate-800/50 flex items-center justify-between px-8 bg-[#020617]/90 backdrop-blur-xl sticky top-0 z-10 transition-all">
                    <div className="flex items-center gap-4 w-96">
                        <div className="relative w-full group">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search payment products..."
                                className="w-full bg-slate-900/50 border border-slate-800 focus:border-primary/50 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:ring-1 focus:ring-primary/20 transition-all outline-none shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors bg-slate-900/50 rounded-full border border-slate-800/50 hover:border-slate-700">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[#020617]"></span>
                        </button>
                        <div className="h-9 w-9 rounded-full bg-primary text-[#020617] flex items-center justify-center text-sm font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            {user?.name ? user.name.substring(0, 2).toUpperCase() : "TU"}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 flex-1 bg-[#020617]">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

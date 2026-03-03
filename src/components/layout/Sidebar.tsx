import { Link, useLocation } from "react-router-dom"
import {
    Home,
    ArrowLeftRight,
    Briefcase,
    FileText,
    Link as LinkIcon,
    LayoutTemplate,
    AtSign,
    MoreHorizontal,
    LogOut,
} from "lucide-react"
import { cn } from "../../lib/utils"
import { useAuth } from "../../contexts/AuthContext"

const mainNavItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: ArrowLeftRight, label: "Transactions", path: "/dashboard/transactions" },
    { icon: Briefcase, label: "Settlements", path: "/dashboard/settlements" },
    { icon: FileText, label: "Reports", path: "/dashboard/reports" },
]

const paymentProductItems = [
    { icon: LinkIcon, label: "Payment Links", path: "/dashboard/payment-links" },
    { icon: LayoutTemplate, label: "Payment Pages", path: "/dashboard/payment-pages" },
    { icon: AtSign, label: "OkPay.me Link", path: "/dashboard/okpay-me" },
]

export function Sidebar() {
    const location = useLocation()
    const { user, logout } = useAuth()

    return (
        <aside className="w-64 bg-[#020817]/95 backdrop-blur-md border-r border-slate-800/50 flex flex-col h-screen fixed left-0 top-0 z-20">
            <div className="p-6">
                <Link to="/dashboard" className="flex items-center gap-2 outline-none">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-secondary font-bold text-lg leading-none">O</span>
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">
                        OkPay
                    </span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-8 overflow-y-auto pb-6 scrollbar-none">
                {/* Main Section */}
                <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3 px-3">Main</div>
                    <div className="space-y-1">
                        {mainNavItems.map((item) => {
                            const isActive = location.pathname === item.path
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-slate-800/80 text-primary shadow-sm"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                                    )}
                                >
                                    <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "")} />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Payment Products */}
                <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3 px-3">Payment Products</div>
                    <div className="space-y-1">
                        {paymentProductItems.map((item) => {
                            const isActive = location.pathname === item.path
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-slate-800/80 text-primary shadow-sm"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                                    )}
                                >
                                    <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "")} />
                                    {item.label}
                                </Link>
                            )
                        })}
                        <Link
                            to="/dashboard/more"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-all duration-200"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                            +10 More
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Bottom User Area */}
            <div className="p-4 border-t border-slate-800/50">
                <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-800/40 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold border border-primary/20">
                            {user?.name ? user.name.substring(0, 2).toUpperCase() : "TU"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-200">{user?.name || "Test User"}</span>
                            <span className="text-xs text-slate-500 truncate max-w-[100px]">{user?.email || "user@test.com"}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => logout && logout()}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Sign Out"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    )
}

import type { SVGProps } from "react"
import { ShieldAlert, Users, Activity } from "lucide-react"

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-red-500/20 text-red-500">
                    <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Admin Console</h1>
                    <p className="text-slate-400">System Monitoring & User Management</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-2xl border-l-4 border-primary">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-500 font-medium mb-1">Total Users</p>
                            <h3 className="text-3xl font-bold">1,248</h3>
                        </div>
                        <Users className="w-6 h-6 text-primary opacity-50" />
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl border-l-4 border-emerald-500">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-500 font-medium mb-1">Txn Volume</p>
                            <h3 className="text-3xl font-bold">₹4.2 Cr</h3>
                        </div>
                        <Activity className="w-6 h-6 text-emerald-500 opacity-50" />
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl border-l-4 border-purple-500">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-slate-500 font-medium mb-1">Active Merchants</p>
                            <h3 className="text-3xl font-bold">86</h3>
                        </div>
                        <StoreIcon className="w-6 h-6 text-purple-500 opacity-50" />
                    </div>
                </div>
            </div>

            {/* System Logs */}
            <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Live System Logs</h3>
                    <span className="flex items-center gap-2 text-xs text-emerald-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        System Online
                    </span>
                </div>

                <div className="space-y-2 font-mono text-sm max-h-64 overflow-y-auto">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex gap-4 p-2 hover:bg-slate-800/50 rounded">
                            <span className="text-slate-500">16:42:{10 + i}</span>
                            <span className="text-primary">[INFO]</span>
                            <span className="text-slate-300">New user registration verified (IP: 192.168.1.{100 + i})</span>
                        </div>
                    ))}
                    <div className="flex gap-4 p-2 hover:bg-slate-800/50 rounded">
                        <span className="text-slate-500">16:42:09</span>
                        <span className="text-yellow-400">[WARN]</span>
                        <span className="text-slate-300">High latency detected in Payment Gateway Node 2</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StoreIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
            <path d="M2 7h20" />
            <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
        </svg>
    )
}

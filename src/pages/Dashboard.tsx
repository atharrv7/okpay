import { Plus, ArrowUpRight, ArrowDownLeft, Link as LinkIcon, LayoutTemplate, AtSign, Wallet } from "lucide-react"
import { Button } from "../components/ui/Button"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const quickProducts = [
    { icon: LinkIcon, label: "Payment Links", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: LayoutTemplate, label: "Payment Pages", color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: AtSign, label: "OkPay.me", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: Wallet, label: "Payouts", color: "text-yellow-400", bg: "bg-yellow-500/10" },
]

const recentTransactions = [
    { id: 1, title: "Payment from John Doe", date: "Today, 10:42 AM", amount: "+₹2,999", status: "Success", type: "credit" },
    { id: 2, title: "Withdrawal to Bank", date: "Yesterday, 4:20 PM", amount: "-₹5,000", status: "Success", type: "debit" },
    { id: 3, title: "Payment from Jane Smith", date: "Oct 24, 2026", amount: "+₹1,240", status: "Processing", type: "credit" },
    { id: 4, title: "API Usage Fee", date: "Oct 22, 2026", amount: "-₹649", status: "Success", type: "debit" },
]

export default function Dashboard() {
    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header Greeting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-1">
                        Welcome back, {user?.name || "Test User"} 👋
                    </h2>
                    <p className="text-slate-400 text-sm">Here's what's happening with your business today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300 rounded-xl">
                        Download Report
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-[#020617] font-semibold rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        + New Payment Link
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Balance Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-2 bg-[#0a1128]/80 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-8 relative overflow-hidden shadow-lg"
                >
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <p className="text-slate-400 font-medium text-sm tracking-wide uppercase mb-2">Available Balance</p>
                            <div className="flex items-end gap-3 mb-8">
                                <h1 className="text-5xl font-bold text-white tracking-tight">₹12,450<span className="text-slate-500">.00</span></h1>
                                <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-md font-medium mb-1">
                                    +12.5% this week
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl"
                            >
                                <Plus className="w-4 h-4 mr-2" /> Add Funds
                            </Button>
                            <Button
                                onClick={() => navigate('/dashboard/pay')}
                                className="bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary rounded-xl"
                            >
                                <ArrowUpRight className="w-4 h-4 mr-2" /> Transfer out
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Products */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#0a1128]/80 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between"
                >
                    <h3 className="font-semibold mb-6 text-slate-200">Start Processing</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {quickProducts.map((product, i) => (
                            <button
                                key={i}
                                className="flex flex-col items-start p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all group text-left"
                            >
                                <div className={`p-2.5 rounded-xl mb-3 ${product.bg} ${product.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <product.icon className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{product.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Transactions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#0a1128]/80 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-6 lg:p-8"
            >
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-semibold text-lg text-slate-200">Recent Transactions</h3>
                    <button
                        onClick={() => navigate('/dashboard/transactions')}
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        View all
                    </button>
                </div>

                <div className="space-y-3">
                    {recentTransactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-900/30 hover:bg-slate-800/50 rounded-2xl border border-transparent hover:border-slate-800 transition-all group">
                            <div className="flex items-center gap-5">
                                <div className={`p-3 rounded-full ${tx.type === 'credit' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-300'}`}>
                                    {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-medium text-slate-200 group-hover:text-white transition-colors text-sm md:text-base">{tx.title}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-semibold text-sm md:text-base ${tx.type === 'credit' ? 'text-emerald-400' : 'text-slate-200'}`}>
                                    {tx.amount}
                                </p>
                                <p className={`text-xs mt-0.5 font-medium ${tx.status === 'Success' ? 'text-emerald-500/80' : 'text-yellow-500/80'}`}>
                                    {tx.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

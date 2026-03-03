import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, Globe, CreditCard, Building2, Smartphone, Wallet, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
    return (
        <div className="min-h-screen bg-[#020817] text-slate-50 relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020817]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary text-[#020817] flex items-center justify-center font-bold text-xl">
                            ₹
                        </div>
                        <span className="text-xl font-bold tracking-tight">OkPay</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                        <a href="#payments" className="hover:text-primary transition-colors">Payments</a>
                        <a href="#banking" className="hover:text-primary transition-colors">Banking+</a>
                        <a href="#payroll" className="hover:text-primary transition-colors">Payroll</a>
                        <a href="#resources" className="hover:text-primary transition-colors">Resources</a>
                        <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/auth" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Login
                        </Link>
                        <Link to="/auth" className="px-5 py-2.5 rounded-xl bg-primary text-[#020817] text-sm font-semibold hover:bg-primary/90 hover:shadow-glow-lg transition-all">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 w-fit">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-semibold text-primary tracking-wide">INDIA'S #1 PAYMENT GATEWAY</span>
                        </div>

                        <h1 className="text-5xl lg:text-[72px] font-bold leading-[1.1] tracking-tight">
                            Advanced Payment Solutions for India's <span className="text-primary">boldest</span> businesses
                        </h1>

                        <p className="text-lg text-slate-400 max-w-xl">
                            100+ Payment Methods | Easy Integration | Powerful Dashboard
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            <Link to="/auth" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-[#020817] font-semibold hover:opacity-90 hover:shadow-glow-xl transition-all group">
                                Sign Up Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <button className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 font-semibold transition-all group">
                                Know More
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Hero Grid Feature Cards */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {[
                            { icon: Zap, title: "Payment Gateway", desc: "Industry leading success rates" },
                            { icon: Smartphone, title: "UPI", desc: "Scan and pay seamlessly" },
                            { icon: Building2, title: "Smart Routing", desc: "Dynamic un-interrupted payments" },
                            { icon: CreditCard, title: "Cards", desc: "All major networks supported" },
                            { icon: Wallet, title: "Wallets", desc: "Amazon, MobiKwik, Freecharge" },
                            { icon: Globe, title: "International", desc: "Process payments globally" },
                            { icon: CheckCircle2, title: "Instant Settlements", desc: "Get paid instantly 24x7" },
                            { icon: ShieldCheck, title: "Secure", desc: "PCI-DSS Level 1 Compliant" },
                        ].map((feat, i) => (
                            <div key={i} className="p-5 rounded-2xl glass-card hover:border-primary/50 group transition-colors">
                                <feat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-white mb-1">{feat.title}</h3>
                                <p className="text-xs text-slate-400">{feat.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 pt-16 border-t border-white/10"
                >
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">99.9<span className="text-primary">%</span></div>
                        <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Uptime</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">100<span className="text-primary">+</span></div>
                        <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Payment Methods</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">0<span className="text-primary">%</span></div>
                        <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Payment Failures</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">24/7</div>
                        <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">Support</div>
                    </div>
                </motion.div>
            </main>

            {/* Accept Payments Everywhere */}
            <section className="py-24 bg-[#0a1128]/50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Accept Payments Everywhere</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Provide a seamless checkout experience with our comprehensive suite of payment methods tailored for every business need.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Smartphone, title: "UPI Payments", desc: "Accept payments from any UPI app instantly.", badge: "POPULAR" },
                            { icon: CreditCard, title: "Card Payments", desc: "Support for Visa, Mastercard, RuPay, and more." },
                            { icon: Building2, title: "Net Banking", desc: "Connect with 50+ major banks seamlessly." },
                            { icon: Wallet, title: "Mobile Wallets", desc: "Integrate with top mobile wallets." },
                            { icon: Globe, title: "International", desc: "Accept global payments effortlessly.", badge: "NEW" },
                            { icon: Zap, title: "Instant Settlement", desc: "Get access to your funds in seconds." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl glass-card group">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <item.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    {item.badge && (
                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-primary/10 text-primary border border-primary/20">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-400 text-sm flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-6 h-6 rounded bg-primary text-[#020817] flex items-center justify-center font-bold">
                            ₹
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight">OkPay</span>
                    </div>
                    <p className="mb-4">© 2026 OkPay Clone. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

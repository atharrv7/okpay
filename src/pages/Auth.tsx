import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Mail, Lock, User, ArrowRight, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [role, setRole] = useState<'user' | 'merchant'>('user')

    // Auth Context
    const { login, register } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            let loggedInUser;
            if (isLogin) {
                loggedInUser = await login(email, password)
            } else {
                loggedInUser = await register({ name, email, phone, password, role })
            }

            if (loggedInUser.role === 'merchant') {
                navigate("/merchant/onboarding")
            } else if (loggedInUser.role === 'admin') {
                navigate("/admin")
            } else {
                navigate("/dashboard")
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Something went wrong")
            } else {
                setError("Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#020817]">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Error Toast */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute -top-16 left-0 right-0 bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2"
                        >
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 rounded-2xl"
                >
                    {/* Logo / Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-4 shadow-glow-lg">
                            <span className="text-[#020817] font-bold text-2xl">₹</span>
                        </div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-slate-400 text-sm mt-2">
                            {isLogin
                                ? "Securely manage all your payments in one place."
                                : "Join OkPay and experience the future of payments."}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden space-y-4"
                                >
                                    <div className="flex p-1 bg-slate-900 rounded-lg mb-4">
                                        <button
                                            type="button"
                                            onClick={() => setRole('user')}
                                            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${role === 'user' ? 'bg-primary text-[#020817] shadow-glow-sm' : 'text-slate-400 hover:text-white'
                                                }`}
                                        >
                                            Personal
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRole('merchant')}
                                            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${role === 'merchant' ? 'bg-primary text-[#020817] shadow-glow-sm' : 'text-slate-400 hover:text-white'
                                                }`}
                                        >
                                            Merchant
                                        </button>
                                    </div>

                                    <Input
                                        label={role === 'merchant' ? "Business Name" : "Full Name"}
                                        placeholder={role === 'merchant' ? "OkPay Pvt Ltd" : "John Doe"}
                                        icon={<User className="w-4 h-4" />}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <Input
                                        label="Phone Number"
                                        placeholder="+91 00000 00000"
                                        icon={<User className="w-4 h-4" />} // reusing User icon for phone for now
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            icon={<Mail className="w-4 h-4" />}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={<Lock className="w-4 h-4" />}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {isLogin && (
                            <div className="flex justify-end">
                                <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <Button className="w-full mt-2" size="lg" loading={loading}>
                            {isLogin ? "Sign In" : "Get Started"}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>

                    {/* Footer Toggle */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={toggleMode}
                                className="text-white font-medium hover:underline focus:outline-none"
                            >
                                {isLogin ? "Sign Up" : "Log In"}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Footer Branding */}
            <div className="absolute bottom-6 text-center w-full text-xs text-slate-600">
                © 2026 OkPay. Powered by Advanced Payment Tech.
            </div>
        </div>
    )
}

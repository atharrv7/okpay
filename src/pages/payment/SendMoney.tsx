import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Check, ChevronLeft, ShieldCheck, Wallet } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { useBank } from "../../contexts/BankContext"
import { useAuth } from "../../contexts/AuthContext"
import { MockBackend } from "../../lib/mock-backend"

// Steps: 1=Input, 2=BankSelect, 3=PIN, 4=Processing, 5=Success
export default function SendMoney() {
    const navigate = useNavigate()
    const { banks, refreshData } = useBank()
    const { user } = useAuth()

    const [step, setStep] = useState(1)
    const [amount, setAmount] = useState("")
    const [recipient, setRecipient] = useState("")
    const [selectedBankId, setSelectedBankId] = useState("")
    const [pin, setPin] = useState(["", "", "", ""])
    const [error, setError] = useState("")
    const [refId, setRefId] = useState("")

    // Handlers
    const handleAmountSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount || Number(amount) <= 0) {
            setError("Enter a valid amount")
            return
        }
        if (!recipient) {
            setError("Enter recipient UPI or Number")
            return
        }
        setError("")
        setStep(2)
        if (banks.length > 0) setSelectedBankId(banks[0].id)
    }

    const handlePay = async () => {
        // Mock PIN check
        if (pin.join("").length !== 4) {
            setError("Enter 4-digit UPI PIN")
            return
        }

        setStep(4) // Processing
        setError("")

        try {
            await MockBackend.processPayment({
                senderId: user?.id || "unknown",
                receiverId: "mock-receiver-id", // In real app, we'd lookup recipient
                amount: Number(amount),
                type: 'send',
                // status field is handled by backend internally, type def says we omit it.
            })

            await refreshData() // Update local balance
            setRefId("txn_" + Math.random().toString(36).slice(2, 8))
            setStep(5) // Success
        } catch {
            setStep(1)
            setError("Payment Failed. Please try again.")
        }
    }

    // --- RENDER STEPS ---

    // Step 1: Input
    const renderInput = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                <label className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2 block">To Recipient</label>
                <Input
                    placeholder="Mobile Number or UPI ID"
                    value={recipient}
                    onChange={e => setRecipient(e.target.value)}
                    className="bg-transparent border-0 text-lg p-0 h-auto focus:ring-0 placeholder:text-slate-600"
                />
            </div>

            <div className="flex flex-col items-center justify-center py-8">
                <div className="relative">
                    <span className="absolute left-[-2rem] top-2 text-4xl text-slate-500">₹</span>
                    <input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0"
                        className="bg-transparent text-6xl font-bold text-center w-64 outline-none placeholder:text-slate-700"
                        autoFocus
                    />
                </div>
                <p className="text-slate-500 mt-2">Paying securely with OkPay</p>
            </div>

            <Button size="lg" className="w-full rounded-xl h-14 text-lg" onClick={handleAmountSubmit}>
                Proceed to Pay
            </Button>
        </motion.div>
    )

    // Step 2: Bank Selection
    const renderBankSelect = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-semibold">Choose Account to Pay</h2>

            <div className="space-y-3">
                {banks.map(bank => (
                    <div
                        key={bank.id}
                        onClick={() => setSelectedBankId(bank.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedBankId === bank.id
                            ? "bg-primary/20 border-primary"
                            : "bg-slate-800/30 border-slate-700"
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">
                                {bank.bankName.substring(0, 2)}
                            </div>
                            <div>
                                <p className="font-medium">{bank.bankName}</p>
                                <p className="text-sm text-slate-500">**** {bank.accountNumber.slice(-4)}</p>
                            </div>
                        </div>
                        {selectedBankId === bank.id && <Check className="text-primary" />}
                    </div>
                ))}
            </div>

            <Button size="lg" className="w-full rounded-xl h-14" onClick={() => setStep(3)}>
                Pay ₹{amount}
            </Button>
        </motion.div>
    )

    // Step 3: PIN
    const renderPin = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8 py-8">
            <ShieldCheck className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-xl font-semibold">Enter 4-Digit UPI PIN</h2>

            <div className="flex justify-center gap-4">
                {[0, 1, 2, 3].map((i) => (
                    <input
                        key={i}
                        type="password"
                        maxLength={1}
                        className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-600 text-center text-2xl/none focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                        value={pin[i]}
                        onChange={(e) => {
                            const newPin = [...pin]
                            newPin[i] = e.target.value
                            setPin(newPin)
                            // Auto focus next
                            if (e.target.value && i < 3) {
                                const next = e.target.parentElement?.children[i + 1] as HTMLInputElement
                                next?.focus()
                            }
                        }}
                    />
                ))}
            </div>

            <Button size="lg" className="w-full max-w-xs mx-auto rounded-xl" onClick={handlePay}>
                Confirm Payment
            </Button>
        </motion.div>
    )

    // Step 4: Processing
    const renderProcessing = () => (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                        <Wallet className="w-8 h-8 text-primary" />
                    </div>
                </div>
            </div>
            <h2 className="text-2xl font-bold animate-pulse">Processing Payment...</h2>
            <p className="text-slate-400 mt-2">Do not close this window</p>
        </div>
    )

    // Step 5: Success
    const renderSuccess = () => (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
                <Check className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">₹{amount} Paid!</h2>
            <p className="text-slate-400 mb-8">Transaction Successful</p>

            <div className="bg-slate-800/50 p-6 rounded-2xl mb-8">
                <div className="flex justify-between mb-2">
                    <span className="text-slate-500">To</span>
                    <span className="font-medium text-white">{recipient}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-slate-500">From</span>
                    <span className="font-medium text-white">My Bank ****{selectedBankId.slice(0, 4)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-500">Ref ID</span>
                    <span className="font-medium text-white">{refId}</span>
                </div>
            </div>

            <Button size="lg" className="w-full" onClick={() => navigate("/dashboard")}>
                Done
            </Button>
        </motion.div>
    )

    return (
        <div className="max-w-xl mx-auto py-6">
            {step < 5 && (
                <div className="flex items-center mb-6">
                    <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="p-2 hover:bg-slate-800 rounded-lg">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-semibold ml-2">
                        {step === 1 && "Start Payment"}
                        {step === 2 && "Select Bank"}
                        {step === 3 && "Authenticate"}
                    </h1>
                </div>
            )}

            <div className="glass-card p-6 min-h-[500px] flex flex-col justify-center rounded-3xl relative overflow-hidden">
                {step === 1 && renderInput()}
                {step === 2 && renderBankSelect()}
                {step === 3 && renderPin()}
                {step === 4 && renderProcessing()}
                {step === 5 && renderSuccess()}

                {error && (
                    <div className="absolute bottom-4 left-4 right-4 bg-red-500/10 text-red-500 p-3 rounded-xl text-center text-sm">
                        {error}
                    </div>
                )}
            </div>
        </div>
    )
}

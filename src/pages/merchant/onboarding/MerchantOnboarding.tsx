import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react"
import { useAuth } from "../../../contexts/AuthContext"

// Reusable Input Component (modified for this design)
const OnboardInput = ({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
    <div className="space-y-1">
        <label className="block text-xs font-medium text-slate-500">{label}</label>
        <input
            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors placeholder:text-slate-300"
            {...props}
        />
    </div>
)

// Reusable Checkbox Component
const OnboardCheckbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (checked: boolean) => void }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300 group-hover:border-blue-500'}`}>
            {checked && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
        </div>
        <span className="text-slate-700">{label}</span>
    </label>
)


export default function MerchantOnboarding() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    // 0: Accept Payments On, 1: Website/App Links, 2: Social Media, 3: PAN, 4: Review
    const [subStep, setSubStep] = useState(0)

    // For main navigation (1. Basic Details, 2. Business Details, etc)
    const [mainStep, setMainStep] = useState(1)

    // Form State
    const [platforms, setPlatforms] = useState({
        website: true,
        android: true,
        ios: true,
        whatsapp: true,
        social: true,
        others: false
    })

    const [links, setLinks] = useState({
        website: "",
        android: "",
        ios: "",
        facebook: "",
        x: "",
        instagram: "",
        youtube: "",
        linkedin: ""
    })

    const [pan, setPan] = useState("")

    const handleLogout = () => {
        logout()
        navigate("/auth")
    }

    const nextStep = () => {
        if (subStep < 4) {
            setSubStep(prev => prev + 1)
        } else {
            // Move to Next Main Step (Business Details) -> For now just go to dashboard
            navigate("/merchant")
        }
    }

    const prevStep = () => {
        if (subStep > 0) {
            setSubStep(prev => prev - 1)
        }
    }


    return (
        <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans">
            {/* Left Sidebar */}
            <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col pt-8 pb-4 relative">
                {/* Green accent line */}
                <div className="absolute left-0 top-0 bottom-1/2 w-1.5 bg-emerald-500"></div>

                <div className="px-6 mb-10">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-6 bg-white w-fit px-2 py-1 rounded-full border border-slate-200 shadow-sm">
                        <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium">
                            {user?.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <span className="truncate max-w-[120px]">{user?.name || 'Atharv Desai'}</span>
                    </div>

                    <h1 className="text-xl text-slate-500 font-light leading-tight">Onboarding:</h1>
                    <h2 className="text-xl text-slate-800 font-medium">Razorpay Payments</h2>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {/* Step 1 */}
                    <button onClick={() => setMainStep(1)} className={`w-full text-left px-4 py-3 rounded flex items-center justify-between transition-colors ${mainStep === 1 ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-500 hover:bg-slate-100/50'}`}>
                        <div className="flex items-center gap-2">
                            {subStep === 4 ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                                <span className={mainStep === 1 ? "text-slate-900" : "text-slate-500"}>1.</span>
                            )}
                            Basic details
                        </div>
                        {mainStep === 1 && subStep === 4 && <ChevronRight className="w-4 h-4 text-slate-400" />}
                    </button>

                    {/* Step 2 */}
                    <button onClick={() => setMainStep(2)} className={`w-full text-left px-4 py-3 rounded flex items-center justify-between transition-colors ${mainStep === 2 ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-500 hover:bg-slate-100/50'}`}>
                        <span className="flex items-center gap-2">
                            <span>2.</span> Business details
                        </span>
                        {mainStep === 2 && <ChevronRight className="w-4 h-4 text-slate-400" />}
                    </button>

                    {/* Step 3 */}
                    <button onClick={() => setMainStep(3)} className={`w-full text-left px-4 py-3 rounded flex items-center gap-2 transition-colors ${mainStep === 3 ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-500 hover:bg-slate-100/50'}`}>
                        <span>3.</span> KYC details
                    </button>
                </nav>

                <div className="px-6 flex items-center gap-4 text-slate-600 mt-auto">
                    <button onClick={handleLogout} className="px-4 py-1.5 bg-slate-200/50 hover:bg-slate-200 rounded text-sm font-medium transition-colors">
                        Logout
                    </button>
                    <button className="p-1.5 hover:bg-slate-200/50 rounded-full transition-colors ml-auto">
                        <HelpCircle className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white relative overflow-hidden flex flex-col">
                {/* Subtle gradient background effect from the reference */}
                <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-blue-50/50 rounded-tl-[100%] blur-3xl pointer-events-none -z-0"></div>
                <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-purple-50/30 rounded-full blur-3xl pointer-events-none -z-0"></div>

                <div className="max-w-2xl w-full mx-auto px-10 pt-10 pb-20 relative z-10 flex flex-col h-full overflow-y-auto">

                    {/* Top TopBar */}
                    <div className="flex items-center justify-between mb-12">
                        <button onClick={prevStep} className={`flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors ${subStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
                            <ArrowLeft className="w-4 h-4" /> Back
                        </button>

                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <div className="w-3 h-3 bg-blue-600 rounded-sm italic flex items-center justify-center text-[8px] text-white">R</div>
                            Razorpay Payments
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {subStep === 0 && (
                            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                                <h1 className="text-3xl font-semibold mb-2 text-slate-900">Accept Payments on</h1>
                                <p className="text-sm text-slate-600 mb-8 border-b border-slate-100 pb-8">
                                    We require this to verify the platform where you would like to accept payments.
                                </p>

                                <div className="space-y-5">
                                    <OnboardCheckbox label="Website" checked={platforms.website} onChange={(val) => setPlatforms({ ...platforms, website: val })} />
                                    <OnboardCheckbox label="Android App" checked={platforms.android} onChange={(val) => setPlatforms({ ...platforms, android: val })} />
                                    <OnboardCheckbox label="iOS App" checked={platforms.ios} onChange={(val) => setPlatforms({ ...platforms, ios: val })} />
                                    <OnboardCheckbox label="WhatsApp, SMS, or Email" checked={platforms.whatsapp} onChange={(val) => setPlatforms({ ...platforms, whatsapp: val })} />
                                    <OnboardCheckbox label="Social Media (like Facebook, Instagram)" checked={platforms.social} onChange={(val) => setPlatforms({ ...platforms, social: val })} />
                                    <OnboardCheckbox label="Others" checked={platforms.others} onChange={(val) => setPlatforms({ ...platforms, others: val })} />
                                </div>
                            </motion.div>
                        )}

                        {subStep === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                                <h1 className="text-3xl font-semibold mb-2 text-slate-900">Add your Website and App links</h1>
                                <p className="text-sm text-slate-600 mb-8 border-b border-slate-100 pb-8">
                                    Payment gateway integration requires your website and app links to be verified by us
                                </p>

                                <div className="space-y-6">
                                    <OnboardInput label="Website" placeholder="https://" value={links.website} onChange={e => setLinks({ ...links, website: e.target.value })} />
                                    <OnboardInput label="Android" placeholder="https://play.google.com/store/apps/details?id=" value={links.android} onChange={e => setLinks({ ...links, android: e.target.value })} />
                                    <OnboardInput label="iOS" placeholder="https://apps.apple.com/" value={links.ios} onChange={e => setLinks({ ...links, ios: e.target.value })} />
                                </div>
                            </motion.div>
                        )}

                        {subStep === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                                <h1 className="text-3xl font-semibold mb-2 text-slate-900">Add your Social Media links</h1>
                                <p className="text-sm text-slate-600 mb-8 border-b border-slate-100 pb-8">
                                    You can add any of the available links now or later.
                                </p>

                                <div className="space-y-6 pr-4 overflow-y-auto max-h-[400px]">
                                    <OnboardInput label="Facebook" placeholder="https://facebook.com/" value={links.facebook} onChange={e => setLinks({ ...links, facebook: e.target.value })} />
                                    <OnboardInput label="X" placeholder="https://x.com/" value={links.x} onChange={e => setLinks({ ...links, x: e.target.value })} />
                                    <OnboardInput label="Instagram" placeholder="https://instagram.com/" value={links.instagram} onChange={e => setLinks({ ...links, instagram: e.target.value })} />
                                    <OnboardInput label="YouTube" placeholder="https://youtube.com/" value={links.youtube} onChange={e => setLinks({ ...links, youtube: e.target.value })} />
                                    <OnboardInput label="LinkedIn" placeholder="https://linkedin.com/" value={links.linkedin} onChange={e => setLinks({ ...links, linkedin: e.target.value })} />
                                </div>
                            </motion.div>
                        )}

                        {subStep === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                                <h1 className="text-3xl font-semibold mb-2 text-slate-900">Add your Personal PAN</h1>
                                <p className="text-sm text-slate-600 mb-8 border-b border-slate-100 pb-8">
                                    We require this to verify your identity. Your details will remain safe.
                                </p>

                                <div>
                                    <OnboardInput label="Personal PAN" placeholder="Personal PAN number" value={pan} onChange={e => setPan(e.target.value.toUpperCase())} maxLength={10} />
                                </div>
                            </motion.div>
                        )}

                        {subStep === 4 && (
                            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1">
                                <h1 className="text-4xl text-slate-800 font-medium mb-1">Review/ Edit</h1>
                                <h2 className="text-4xl text-slate-400 font-medium mb-10">Basic details</h2>

                                <div className="space-y-8 pr-4">
                                    <div className="border-b border-slate-100 pb-6 group">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs text-blue-400 mb-1">Add your Name</p>
                                                <p className="text-slate-700">{user?.name || 'atharv desai'}</p>
                                            </div>
                                            <button onClick={() => { }} className="text-slate-400 hover:text-blue-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-b border-slate-100 pb-6 group">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs text-blue-400 mb-1">Accept Payments on</p>
                                                <p className="text-slate-700 text-sm leading-relaxed max-w-[80%]">
                                                    {Object.entries(platforms).filter(([, v]) => v).map(([_k]) => _k.charAt(0).toUpperCase() + _k.slice(1)).join(', ')}
                                                </p>
                                            </div>
                                            <button onClick={() => setSubStep(0)} className="text-slate-400 hover:text-blue-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-b border-slate-100 pb-6 group">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs text-blue-400 mb-1">Add your Website and App links - Website, Android, iOS</p>
                                                <p className="text-slate-300">Skipped</p>
                                            </div>
                                            <button onClick={() => setSubStep(1)} className="text-slate-400 hover:text-blue-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-b border-slate-100 pb-6 group">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs text-blue-400 mb-1">Add your Social Media links - Facebook, X, Instagram, YouTube, LinkedIn</p>
                                                <p className="text-slate-300">Skipped</p>
                                            </div>
                                            <button onClick={() => setSubStep(2)} className="text-slate-400 hover:text-blue-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Action Bar */}
                    <div className="mt-auto pt-8 flex gap-4">
                        {(subStep === 1 || subStep === 2) && (
                            <button onClick={nextStep} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded transition-colors">
                                Add later
                            </button>
                        )}
                        <button onClick={nextStep} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors">
                            Continue
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

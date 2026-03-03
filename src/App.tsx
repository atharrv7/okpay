import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import MerchantDashboard from "./pages/merchant/MerchantDashboard"
import MerchantOnboarding from "./pages/merchant/onboarding/MerchantOnboarding"
import AdminDashboard from "./pages/admin/AdminDashboard"
import { DashboardLayout } from "./components/layout/DashboardLayout"
import { AuthProvider } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/layout/ProtectedRoute"
import { BankProvider } from "./contexts/BankContext"
import BankLinking from "./pages/setup/BankLinking"
import UpiSetup from "./pages/setup/UpiSetup"
import SendMoney from "./pages/payment/SendMoney"
import Landing from "./pages/Landing"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#020817] text-white font-sans selection:bg-primary/30">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />

            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <BankProvider>
                  <DashboardLayout />
                </BankProvider>
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="link-bank" element={<BankLinking />} />
              <Route path="setup-upi" element={<UpiSetup />} />
              <Route path="pay" element={<SendMoney />} />

              <Route path="mobile" element={<div className="p-4"><h1 className="text-2xl font-bold mb-4">Mobile Recharge</h1><p className="text-slate-400">Select Operator...</p></div>} />
              <Route path="dth" element={<div className="p-4"><h1 className="text-2xl font-bold mb-4">DTH Recharge</h1><p className="text-slate-400">Select Provider...</p></div>} />
              <Route path="transactions" element={<div className="p-4"><h1 className="text-2xl font-bold mb-4">Transaction History</h1><p className="text-slate-400">List of all transactions...</p></div>} />
              <Route path="*" element={<div className="text-center py-20 text-slate-500">Feature Coming Soon</div>} />
            </Route>

            {/* Merchant Routes */}
            <Route path="/merchant/onboarding" element={
              <ProtectedRoute>
                <MerchantOnboarding />
              </ProtectedRoute>
            } />

            <Route path="/merchant" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<MerchantDashboard />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
            </Route>

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

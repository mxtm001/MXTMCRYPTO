"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Clock,
  LogOut,
  TrendingUp,
  HelpCircle,
  Zap,
  Shield,
  Rocket,
} from "lucide-react"

export default function Investments() {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const router = useRouter()

  const investmentPlans = [
    {
      id: 1,
      name: "Starter Plan",
      description: "Perfect for beginners",
      minInvestment: 100,
      maxInvestment: 5000,
      dailyReturn: 3,
      duration: 30,
      icon: "🌱",
      color: "from-blue-500 to-cyan-500",
      risk: "Low",
    },
    {
      id: 2,
      name: "Pro Plan",
      description: "For experienced investors",
      minInvestment: 5000,
      maxInvestment: 50000,
      dailyReturn: 5,
      duration: 60,
      icon: "⚡",
      color: "from-purple-500 to-pink-500",
      risk: "Medium",
    },
    {
      id: 3,
      name: "Elite Plan",
      description: "Maximum growth potential",
      minInvestment: 50000,
      maxInvestment: 500000,
      dailyReturn: 8,
      duration: 90,
      icon: "👑",
      color: "from-amber-500 to-orange-500",
      risk: "High",
    },
  ]

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(storedUser)
      setUser(userData)

      // Get registered users to find the current user's full data
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
      const currentUserData = registeredUsers.find((u: any) => u.email === userData.email)

      if (currentUserData) {
        // Update user with additional data if available
        setUser((prev) => ({
          ...prev,
          balance: currentUserData.balance || 0,
          name: currentUserData.name || userData.email,
        }))
      }
    } catch (error) {
      localStorage.removeItem("user")
      router.push("/login")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050e24] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050e24] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a1735] text-white hidden md:block">
        <div className="p-4 border-b border-[#253256]">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10">
              <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-L4reJMFMC6l5QQ9sJuWX4Ozf3GnYU4.jpeg" alt="MXTM Investment" fill className="object-contain" />
            </div>
            <span className="ml-2 font-medium text-sm">MXTM INVESTMENT</span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <BarChart2 className="mr-2 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/deposit"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <ArrowUpRight className="mr-2 h-5 w-5" />
                Deposit
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/withdraw"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <ArrowDownRight className="mr-2 h-5 w-5" />
                Withdraw
              </Link>
            </li>
            <li>
              <Link href="/dashboard/investments" className="flex items-center p-2 rounded-md bg-[#162040] text-white">
                <DollarSign className="mr-2 h-5 w-5" />
                Investments
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/history"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <Clock className="mr-2 h-5 w-5" />
                History
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/support"
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white"
              >
                <HelpCircle className="mr-2 h-5 w-5" />
                Support
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 rounded-md hover:bg-[#162040] text-gray-300 hover:text-white w-full text-left"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="bg-[#0a1735] p-4 flex justify-between items-center md:hidden">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10">
              <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-L4reJMFMC6l5QQ9sJuWX4Ozf3GnYU4.jpeg" alt="MXTM Investment" fill className="object-contain" />
            </div>
          </Link>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </header>

        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">My Investments</h1>
            <p className="text-gray-400">Track your active investment plans</p>
          </div>

          <div className="grid gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5 text-amber-500" />
                Available Investment Plans
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {investmentPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                  >
                    <Card
                      className={`bg-gradient-to-br ${plan.color} relative overflow-hidden border-0 h-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="absolute inset-0 animate-pulse"
                          style={{
                            background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                          }}
                        />
                      </div>

                      <CardHeader className="relative z-10 pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-3xl mb-2">{plan.icon}</div>
                            <CardTitle className="text-white text-lg">{plan.name}</CardTitle>
                            <p className="text-white/80 text-sm mt-1">{plan.description}</p>
                          </div>
                          <div className="bg-white/20 rounded-full p-2">
                            <Zap className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="relative z-10 space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-white">
                          <div className="bg-white/10 rounded-lg p-2">
                            <p className="text-xs opacity-80">Daily Return</p>
                            <p className="text-lg font-bold">{plan.dailyReturn}%</p>
                          </div>
                          <div className="bg-white/10 rounded-lg p-2">
                            <p className="text-xs opacity-80">Duration</p>
                            <p className="text-lg font-bold">{plan.duration}D</p>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-2 text-white">
                          <p className="text-xs opacity-80">Investment Range</p>
                          <p className="text-sm font-bold">
                            €{plan.minInvestment.toLocaleString()} - €{plan.maxInvestment.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 text-white">
                          <Shield className="h-4 w-4" />
                          <div>
                            <p className="text-xs opacity-80">Risk Level</p>
                            <p className="text-sm font-bold">{plan.risk}</p>
                          </div>
                        </div>

                        <Button
                          className={`w-full mt-2 ${selectedPlan === plan.id ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-white/20 text-white hover:bg-white/30"} transition-all duration-200 font-medium`}
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle investment action
                          }}
                        >
                          {selectedPlan === plan.id ? "Selected" : "Invest Now"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Investments */}
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Active Investments</CardTitle>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-400">No active investments found</p>
                  <p className="text-sm text-gray-500 mt-2">Start investing to see your active plans here</p>
                  <Button className="mt-4 bg-[#0066ff] hover:bg-[#0066ff]/90">
                    <Link href="/dashboard">Start Investing</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Investment History */}
            <Card className="bg-[#0a1735] border-[#253256] text-white">
              <CardHeader>
                <CardTitle>Investment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-400">No investment history found</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

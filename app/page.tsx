"use client"

import { useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle } from "lucide-react"

export default function HomePage() {
  // Optimized scroll handler
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050e24] text-white">
      <header className="container mx-auto py-4 px-4 flex justify-between items-center sticky top-0 bg-gradient-to-r from-[#0a1735]/95 to-[#162040]/95 backdrop-blur-lg z-50 border-b border-[#f9a826]/20 transition-all duration-300">
        <Link href="/" className="flex items-center hover:scale-110 transition-transform duration-300">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.png-L4reJMFMC6l5QQ9sJuWX4Ozf3GnYU4.jpeg" alt="MXTM Crypto Platform" className="h-12 w-12 rounded-xl object-cover" />
          <span className="ml-2 text-white font-medium">
            MXTM CRYPTO PLATFORM
          </span>
        </Link>
        <div className="flex gap-4">
          <Link href="/register">
            <Button className="bg-gradient-to-r from-[#f9a826] to-[#f4c15d] hover:from-[#f9a826]/90 hover:to-[#f4c15d]/90 text-black font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#f9a826]/50">
              Register
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-[#162040] to-[#253256] hover:from-[#162040]/90 hover:to-[#253256]/90 text-white font-medium transition-all duration-300 hover:scale-105 border border-[#f9a826]/30">
              Login
            </Button>
          </Link>
        </div>
      </header>

      <section className="container mx-auto overflow-hidden py-20 px-4 text-center relative">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#f9a826]/10 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl animate-float-reverse" />
        <div className="relative">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#f9a826]/30 bg-[#162040]/70 px-4 py-2 text-sm text-[#f4c15d] animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Markets are live and monitored 24/7
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in">
          Professional Investment Platform
        </h1>
        <p
          className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          Join thousands of investors who trust MXTM for cryptocurrency and forex trading. Start your investment journey
          with our secure and profitable platform.
        </p>
        <div className="flex gap-4 justify-center flex-wrap" style={{ animationDelay: "0.4s" }}>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#f9a826] to-[#f4c15d] hover:from-[#f9a826]/90 hover:to-[#f4c15d]/90 text-black font-medium transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#f9a826]/50"
            >
              Start Investing <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-[#f9a826]/50 text-white hover:bg-gradient-to-r hover:from-[#f9a826] hover:to-[#f4c15d] hover:text-black bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#f9a826]/30"
            >
              Login to Account
            </Button>
          </Link>
        </div>
        </div>
      </section>

      <section id="plans" className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#f9a826] to-[#f4c15d] bg-clip-text text-transparent">
          Investment Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-[#0a1735] to-[#162040] border-[#253256] hover:border-[#f9a826] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#f9a826]/30">
            <CardHeader>
              <CardTitle className="text-white">Starter Plan</CardTitle>
              <CardDescription className="text-gray-300">Perfect for beginners</CardDescription>
            </CardHeader>
            <CardContent className="text-white">
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#f9a826] to-[#f4c15d] bg-clip-text text-transparent">
                $100 - $999
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  5% Daily ROI
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  30 Days Duration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  24/7 Support
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-br from-[#0a1735] to-[#162040] border-[#f9a826] hover:border-[#f9a826] transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#f9a826]/50 relative"
            style={{ animationDelay: "1s" }}
          >
            <CardHeader>
              <Badge className="w-fit bg-gradient-to-r from-[#f9a826] to-[#f4c15d] text-black mb-2">
                Most Popular
              </Badge>
              <CardTitle className="text-white">Professional Plan</CardTitle>
              <CardDescription className="text-gray-300">For serious investors</CardDescription>
            </CardHeader>
            <CardContent className="text-white">
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#f9a826] to-[#f4c15d] bg-clip-text text-transparent">
                $1,000 - $4,999
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  8% Daily ROI
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  45 Days Duration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Priority Support
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-br from-[#0a1735] to-[#162040] border-[#253256] hover:border-[#f9a826] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#f9a826]/30"
            style={{ animationDelay: "2s" }}
          >
            <CardHeader>
              <CardTitle className="text-white">VIP Plan</CardTitle>
              <CardDescription className="text-gray-300">Maximum returns</CardDescription>
            </CardHeader>
            <CardContent className="text-white">
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#f9a826] to-[#f4c15d] bg-clip-text text-transparent">
                $5,000+
              </div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  12% Daily ROI
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  60 Days Duration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  VIP Support
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="features" className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#f9a826] to-[#f4c15d] bg-clip-text text-transparent">
          Why Choose MXTM?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group hover:scale-110 transition-all duration-300">
            <div className="bg-gradient-to-br from-[#0a1735] to-[#162040] p-6 rounded-lg border border-[#253256] group-hover:border-[#f9a826] group-hover:shadow-2xl group-hover:shadow-[#f9a826]/30 transition-all duration-300">
              <Shield className="h-12 w-12 bg-gradient-to-r from-[#f9a826] to-[#f4c15d] bg-clip-text text-transparent mx-auto mb-4 group-hover:scale-125 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2 text-white">Secure Platform</h3>
              <p className="text-gray-300">Bank-level security with SSL encryption and cold storage</p>
            </div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300">
            <div className="bg-gradient-to-br from-[#0a1735] to-[#162040] p-6 rounded-lg border border-[#253256] group-hover:border-[#f9a826] group-hover:shadow-2xl group-hover:shadow-[#f9a826]/30 transition-all duration-300">
              <TrendingUp className="h-12 w-12 bg-gradient-to-r from-[#f9a826] to-[#f4c15d] bg-clip-text text-transparent mx-auto mb-4 group-hover:scale-125 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2 text-white">High Returns</h3>
              <p className="text-gray-300">Consistent daily returns with professional trading strategies</p>
            </div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300">
            <div className="bg-gradient-to-br from-[#0a1735] to-[#162040] p-6 rounded-lg border border-[#253256] group-hover:border-[#f9a826] group-hover:shadow-2xl group-hover:shadow-[#f9a826]/30 transition-all duration-300">
              <Users className="h-12 w-12 bg-gradient-to-r from-[#f9a826] to-[#f4c15d] bg-clip-text text-transparent mx-auto mb-4 group-hover:scale-125 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2 text-white">Expert Team</h3>
              <p className="text-gray-300">Professional traders with years of market experience</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4 text-center">
        <div className="bg-gradient-to-r from-[#0a1735] via-[#162040] to-[#0b1710] p-8 rounded-lg border border-[#f9a826]/30 hover:border-[#f9a826] transition-all duration-300 hover:shadow-2xl hover:shadow-[#f9a826]/30">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#f9a826] to-[#f4c15d] bg-clip-text text-transparent">
            Ready to Start Investing?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our platform today and start earning consistent returns on your investments with our professional
            trading team.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#f9a826] to-[#f4c15d] hover:from-[#f9a826]/90 hover:to-[#f4c15d]/90 text-black font-medium transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#f9a826]/50"
            >
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-[#050a1c] to-[#0a1735] py-8 border-t border-[#f9a826]/20 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2024 MXTM CRYPTO PLATFORM. All rights reserved.</p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <Link href="/terms" className="text-gray-400 hover:text-[#f9a826] transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-[#f9a826] transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-[#f9a826] transition-colors duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

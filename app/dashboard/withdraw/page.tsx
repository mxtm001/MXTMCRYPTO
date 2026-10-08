"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  CreditCard,
  Smartphone,
  Wallet,
  DollarSign,
  AlertCircle,
  Clock,
  TrendingUp,
  Shield,
  CheckCircle2,
  ArrowRight,
  Zap,
  Globe,
  Check,
  Printer,
} from "lucide-react"
import { userService } from "@/lib/user-service"

interface CryptoCurrency {
  value: string
  label: string
  symbol: string
  network: string
  icon: string
}

const fiatCurrencies = [
  { value: "BRL", label: "Brazilian Real (BRL)", symbol: "R$" },
  { value: "USD", label: "US Dollar (USD)", symbol: "$" },
  { value: "EUR", label: "Euro (EUR)", symbol: "€" },
  { value: "GBP", label: "British Pound (GBP)", symbol: "£" },
  { value: "CAD", label: "Canadian Dollar (CAD)", symbol: "C$" },
  { value: "AUD", label: "Australian Dollar (AUD)", symbol: "A$" },
  { value: "CHF", label: "Swiss Franc (CHF)", symbol: "CHF" },
]

const cryptocurrencies: CryptoCurrency[] = [
  { value: "BTC", label: "Bitcoin", symbol: "BTC", network: "Bitcoin Network", icon: "₿" },
  { value: "ETH", label: "Ethereum", symbol: "ETH", network: "Ethereum Network", icon: "Ξ" },
  { value: "USDT", label: "Tether", symbol: "USDT", network: "ERC-20 / TRC-20", icon: "₮" },
  { value: "USDC", label: "USD Coin", symbol: "USDC", network: "ERC-20", icon: "$" },
  { value: "BNB", label: "Binance Coin", symbol: "BNB", network: "BSC Network", icon: "BNB" },
  { value: "XRP", label: "Ripple", symbol: "XRP", network: "XRP Ledger", icon: "XRP" },
  { value: "ADA", label: "Cardano", symbol: "ADA", network: "Cardano Network", icon: "₳" },
  { value: "SOL", label: "Solana", symbol: "SOL", network: "Solana Network", icon: "◎" },
  { value: "DOGE", label: "Dogecoin", symbol: "DOGE", network: "Dogecoin Network", icon: "Ð" },
  { value: "DOT", label: "Polkadot", symbol: "DOT", network: "Polkadot Network", icon: "DOT" },
  { value: "MATIC", label: "Polygon", symbol: "MATIC", network: "Polygon Network", icon: "MATIC" },
  { value: "LTC", label: "Litecoin", symbol: "LTC", network: "Litecoin Network", icon: "Ł" },
  { value: "SHIB", label: "Shiba Inu", symbol: "SHIB", network: "ERC-20", icon: "SHIB" },
  { value: "TRX", label: "TRON", symbol: "TRX", network: "TRON Network", icon: "TRX" },
  { value: "AVAX", label: "Avalanche", symbol: "AVAX", network: "Avalanche C-Chain", icon: "AVAX" },
]

interface BankDetails {
  accountName: string
  accountNumber: string
  bankName: string
  swiftCode: string
  transferMethod: "standard" | "sepa" | "instant-sepa"
}

interface PixDetails {
  pixKey: string
  keyType: "cpf" | "digital" | "email" | "cellular"
  accountHolder: string
  bank: string
}

interface CryptoDetails {
  cryptocurrency: string
  walletAddress: string
  network: string
}

interface PaypalDetails {
  email: string
}

const brazilianBanks = [
  // Major Banks
  { value: "001", label: "Banco do Brasil" },
  { value: "033", label: "Banco Santander" },
  { value: "104", label: "Caixa Econômica Federal" },
  { value: "237", label: "Bradesco" },
  { value: "341", label: "Itaú Unibanco" },
  { value: "422", label: "Banco Safra" },
  { value: "745", label: "Banco Citibank" },

  // Mid-Size Banks
  { value: "246", label: "Banco ABC Brasil" },
  { value: "336", label: "Banco C6" },
  { value: "355", label: "Banco Votorantim" },
  { value: "389", label: "Banco Merrill Lynch" },
  { value: "612", label: "Banco Guanabara" },
  { value: "654", label: "Banco Forjadores" },
  { value: "743", label: "Banco Semear" },
  { value: "846", label: "Banco Cooperativo do Brasil" },

  // Digital and Investment Banks
  { value: "260", label: "NU Pagamentos S.A. (Nubank)" },
  { value: "655", label: "Banco de Investimentos Crédit Suisse" },
  { value: "288", label: "Caruana S/A - Banco de Investimentos" },
  { value: "318", label: "Banco BMG S.A." },
  { value: "329", label: "Banco Ita Portfolio S.A." },
  { value: "330", label: "Banco Itauleasing S.A." },
  { value: "652", label: "Itaú Corretora de Valores S.A." },

  // Cooperative Banks
  { value: "748", label: "Banco Cooperativo Sicredi S.A." },
  { value: "756", label: "Banco Cooperativo do Brasil S.A." },

  // Savings and Loan Banks
  { value: "102", label: "Caixa Geral de Depósitos" },
  { value: "376", label: "Banco J.P. Morgan S.A." },
  { value: "383", label: "Banco Volkswagen S.A." },
  { value: "409", label: "Banco UNIPRIME Brasil S.A." },
  { value: "413", label: "Banco VR S.A." },
  { value: "464", label: "Banco STP S.A." },

  // International Banks
  { value: "004", label: "Banco de Desenvolvimento Econômico e Social" },
  { value: "037", label: "Banco Interamericano de Desenvolvimento" },
  { value: "456", label: "Banco MUFG Brasil S.A." },
  { value: "492", label: "Banco IW Bank S.A." },

  // Regional and Community Banks
  { value: "070", label: "Banco de Brasília" },
  { value: "082", label: "Banco Topázio S.A." },
  { value: "142", label: "Banco Finterra S.A." },
  { value: "163", label: "Banco Fluxo S.A." },
  { value: "630", label: "Banco Intercam S.A." },
  { value: "634", label: "Banco Tripe S.A." },

  // Specialized Banks
  { value: "035", label: "Banco Bradesco BBI S.A." },
  { value: "076", label: "Banco K.B.S. S.A." },
  { value: "343", label: "Ita Portfolio S.A." },
  { value: "349", label: "Banco Itauleasing S.A." },

  // Payment Banks
  { value: "626", label: "Banco Ficsa S.A." },
  { value: "680", label: "Banco Finterra S.A." },
  { value: "808", label: "Banco Mercantil do Brasil S.A." },

  // Other
  { value: "999", label: "Outro Banco" },
]

const internationalBanks = [
  { value: "chase", label: "Chase Bank" },
  { value: "bank-of-america", label: "Bank of America" },
  { value: "wells-fargo", label: "Wells Fargo" },
  { value: "citibank", label: "Citibank" },
  { value: "capital-one", label: "Capital One" },
  { value: "hsbc", label: "HSBC" },
  { value: "barclays", label: "Barclays" },
  { value: "lloyds", label: "Lloyds Bank" },
  { value: "santander", label: "Santander Bank" },
  { value: "credit-suisse", label: "Credit Suisse" },
  { value: "ubs", label: "UBS" },
  { value: "jp-morgan", label: "JPMorgan Chase Bank" },
  { value: "goldman-sachs", label: "Goldman Sachs Bank" },
  { value: "revolut", label: "Revolut Bank" },
  { value: "wise", label: "Wise" },
  { value: "n26", label: "N26" },
  { value: "other", label: "Other Bank" },
]

export default function WithdrawPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [amount, setAmount] = useState("")
  const [processing, setProcessing] = useState(false)
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank")
  const [fiatCurrency, setFiatCurrency] = useState("USD")
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountName: "",
    accountNumber: "",
    bankName: "",
    swiftCode: "",
    transferMethod: "sepa",
  })
  const [pixDetails, setPixDetails] = useState<PixDetails>({
    pixKey: "",
    keyType: "cpf",
    accountHolder: "",
    bank: "",
  })
  const [cryptoDetails, setCryptoDetails] = useState<CryptoDetails>({
    cryptocurrency: "BTC",
    walletAddress: "",
    network: "Bitcoin Network",
  })
  const [paypalDetails, setPaypalDetails] = useState<PaypalDetails>({
    email: "",
  })
  const [pixVerification, setPixVerification] = useState<"idle" | "checking" | "unavailable">("idle")
  const [showModal, setShowModal] = useState(false)
  const [withdrawalReceipt, setWithdrawalReceipt] = useState<any>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showProcessing, setShowProcessing] = useState(false)
  const [showRestriction, setShowRestriction] = useState(false)
  const [pendingWithdrawal, setPendingWithdrawal] = useState<any>(null)
  const [confirmationCode, setConfirmationCode] = useState("")

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await userService.getCurrentUser()
      if (!currentUser) {
        router.push("/login")
        return
      }
      currentUser.balance = 0
      setUser(currentUser)
      setLoading(false)
    }

    loadUser()
  }, [router])

  // Preview balance only; no real funds are moved.
  const balance = 3_000_000

  const handlePixKeyChange = (value: string) => {
    setPixDetails((current) => ({ ...current, pixKey: value }))
    setPixVerification(value.trim() ? "checking" : "idle")

    if (value.trim()) {
      window.setTimeout(() => setPixVerification("unavailable"), 0)
    }
  }

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount) return

    const withdrawalAmount = parseFloat(amount)
    
    let transferMethodLabel = ""
    if (withdrawalMethod === "bank") {
      if (bankDetails.transferMethod === "instant-sepa") {
        transferMethodLabel = "Instant SEPA"
      } else if (bankDetails.transferMethod === "sepa") {
        transferMethodLabel = "SEPA"
      } else {
        transferMethodLabel = "Standard bank transfer"
      }
    } else if (withdrawalMethod === "pix") {
      transferMethodLabel = "PIX"
    } else if (withdrawalMethod === "crypto") {
      transferMethodLabel = "Cryptocurrency"
    } else if (withdrawalMethod === "paypal") {
      transferMethodLabel = "PayPal"
    }
    
    const withdrawal = {
      amount: withdrawalAmount,
      method: withdrawalMethod,
      transferMethodLabel: transferMethodLabel,
      bankName: bankDetails.bankName || "Not provided",
      accountName: bankDetails.accountName || "Not provided",
      accountNumber: bankDetails.accountNumber || "Not provided",
      swiftCode: bankDetails.swiftCode || "Not provided",
      transferMethod: bankDetails.transferMethod,
      pixKey: pixDetails.pixKey || "Not provided",
      keyType: pixDetails.keyType || "Not provided",
      accountHolder: pixDetails.accountHolder || "Not provided",
      bank: pixDetails.bank || "Not provided",
      cryptocurrency: cryptoDetails.cryptocurrency || "Not provided",
      walletAddress: cryptoDetails.walletAddress || "Not provided",
      paypalEmail: paypalDetails.email || "Not provided",
      date: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
      platformAccount: "35287800876",
      platformAccountType: "CPF",
      platformAccountName: "MXTM CRYPTO PLATFORM",
      platformBank: "BANCO DO BRASIL",
    }
    setPendingWithdrawal(withdrawal)
    setShowConfirmation(true)
  }

  const handleConfirmWithdrawal = () => {
    if (!pendingWithdrawal || !/^\d{6}$/.test(confirmationCode)) return

    const confirmedWithdrawal = pendingWithdrawal
    setShowConfirmation(false)
    setConfirmationCode("")
    setShowProcessing(true)

    window.setTimeout(() => {
      setShowProcessing(false)
      setWithdrawalReceipt({ ...confirmedWithdrawal, status: "Successful" })
      setShowModal(true)
      setPendingWithdrawal(null)
      setAmount("")
    }, 5000)
  }

  const handleCloseRestriction = () => {
    setShowRestriction(false)
    setPendingWithdrawal(null)
    setAmount("")
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: fiatCurrency,
    }).format(value)
  }

  const handleCryptoChange = (value: string) => {
    const selectedCrypto = cryptocurrencies.find((c) => c.value === value)
    setCryptoDetails({
      ...cryptoDetails,
      cryptocurrency: value,
      network: selectedCrypto?.network || "",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f9a826]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a1222]">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        <div className="mb-8 flex flex-col items-start gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-[#f9a826] to-yellow-400 rounded-lg">
              <Wallet className="h-6 w-6 text-black" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Withdraw funds
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">Withdraw your funds securely to your preferred account</p>
        </div>

        {showProcessing && (
          <div
            role="status"
            aria-live="polite"
            className="mb-6 flex items-center gap-4 rounded-xl border border-blue-400/40 bg-blue-500/10 px-5 py-4 text-blue-100 shadow-lg shadow-blue-950/20"
          >
            <div className="h-8 w-8 shrink-0 animate-spin rounded-full border-4 border-blue-300/25 border-t-blue-300" />
            <div>
              <p className="font-semibold">Processing withdrawal</p>
              <p className="text-sm text-blue-200/80">Verifying destination and preparing your receipt. Please wait...</p>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="bg-gradient-to-br from-[#0a1735] to-[#162040] border-[#253256]/50 overflow-hidden relative group hover:border-[#f9a826]/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[#f9a826]/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Available balance</CardTitle>
              <div className="p-2 bg-[#f9a826]/10 rounded-lg">
                <Wallet className="h-4 w-4 text-[#f9a826]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-[#f9a826] to-yellow-400 bg-clip-text text-transparent">
                {formatCurrency(balance)}
              </div>
              <p className="text-xs text-gray-400 mt-2 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1 text-green-400" />
                Ready to withdraw
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#0a1735] to-[#162040] border-[#253256]/50 overflow-hidden relative group hover:border-blue-400/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Processing time</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Clock className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">1–3 business days</div>
              <p className="text-xs text-gray-400 mt-2 flex items-center">
                <Zap className="h-3 w-3 mr-1 text-blue-400" />
                Fast processing
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#0a1735] to-[#162040] border-[#253256]/50 overflow-hidden relative group hover:border-green-400/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Withdrawal limit</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">Unlimited</div>
              <p className="text-xs text-gray-400 mt-2 flex items-center">
                <Globe className="h-3 w-3 mr-1 text-green-400" />
                No restrictions
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-[#0a1735] to-[#162040] border-[#253256]/50 shadow-2xl">
          <CardHeader className="border-b border-[#253256]/50 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-white">Request withdrawal</CardTitle>
                <CardDescription className="text-gray-400 mt-2">
                  Choose your preferred withdrawal method and enter your details
                </CardDescription>
              </div>
              <div className="p-3 bg-gradient-to-r from-[#f9a826]/10 to-yellow-400/10 rounded-lg">
                <Shield className="h-8 w-8 text-[#f9a826]" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleWithdraw} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="amount" className="text-white text-base font-semibold flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-[#f9a826]" />
                  Withdrawal amount (USD)
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</div>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8 h-14 bg-[#162040]/50 border-[#253256] text-white text-lg focus:border-[#f9a826] transition-colors"
                    required
                    min="100"
                    max={balance}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-gray-400">Available balance:</p>
                  <p className="text-[#f9a826] font-semibold">{formatCurrency(balance)}</p>
                </div>
              </div>

              <Tabs
                value={withdrawalMethod}
                onValueChange={(value) => {
                  setWithdrawalMethod(value)
                  if (value === "pix") setFiatCurrency("BRL")
                }}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 bg-[#162040]/50 p-1 gap-1">
                  <TabsTrigger
                    value="bank"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f9a826] data-[state=active]:to-yellow-400 data-[state=active]:text-black flex items-center gap-2 py-3"
                  >
                    <Building2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Bank</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="pix"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f9a826] data-[state=active]:to-yellow-400 data-[state=active]:text-black flex items-center gap-2 py-3"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span className="hidden sm:inline">PIX</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="crypto"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f9a826] data-[state=active]:to-yellow-400 data-[state=active]:text-black flex items-center gap-2 py-3"
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="hidden sm:inline">Crypto</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="paypal"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#f9a826] data-[state=active]:to-yellow-400 data-[state=active]:text-black flex items-center gap-2 py-3"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span className="hidden sm:inline">PayPal</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bank" className="space-y-5 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="fiatCurrency" className="text-white">
                      Fiat currency
                    </Label>
                    <Select value={fiatCurrency} onValueChange={setFiatCurrency}>
                      <SelectTrigger
                        id="fiatCurrency"
                        className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                      >
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#162040] border-[#253256] text-white">
                        {fiatCurrencies.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.symbol} {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transferMethod" className="text-white">
                      Transfer method
                    </Label>
                    <Select
                      value={bankDetails.transferMethod}
                      onValueChange={(value: any) =>
                        setBankDetails({ ...bankDetails, transferMethod: value })
                      }
                    >
                      <SelectTrigger
                        id="transferMethod"
                        className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                      >
                        <SelectValue placeholder="Select a transfer method" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#162040] border-[#253256] text-white">
                        <SelectItem
                          value="standard"
                          className="focus:bg-[#253256] focus:text-white"
                        >
                          Standard bank transfer (1–3 business days)
                        </SelectItem>
                        <SelectItem
                          value="sepa"
                          className="focus:bg-[#253256] focus:text-white"
                        >
                          SEPA (Single Euro Payments Area)
                        </SelectItem>
                        <SelectItem
                          value="instant-sepa"
                          className="focus:bg-[#253256] focus:text-white"
                        >
                          Instant SEPA (instant transfer)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {bankDetails.transferMethod === "instant-sepa" && (
                    <Alert className="bg-green-500/10 border-green-500/30 text-green-300">
                      <Zap className="h-4 w-4" />
                      <AlertDescription>
                        Instant SEPA transfers are processed within 10 seconds
                      </AlertDescription>
                    </Alert>
                  )}

                  {bankDetails.transferMethod === "sepa" && (
                    <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-300">
                      <Clock className="h-4 w-4" />
                      <AlertDescription>
                        SEPA transfers are processed within 1 business day
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="bank" className="text-white">
                      Select your bank
                    </Label>
                    <Select
                      value={bankDetails.bankName}
                      onValueChange={(value) => {
                        const bank = internationalBanks.find((b) => b.value === value)
                        setBankDetails({ ...bankDetails, bankName: value, swiftCode: "" })
                      }}
                    >
                      <SelectTrigger
                        id="bank"
                        className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                      >
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#162040] border-[#253256] text-white max-h-96">
                        {internationalBanks.map((bank) => (
                          <SelectItem
                            key={bank.value}
                            value={bank.value}
                            className="focus:bg-[#253256] focus:text-white"
                          >
                            {bank.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="accountName" className="text-white">
                        Account holder name
                      </Label>
                      <Input
                        id="accountName"
                        placeholder="Full name as shown on your bank account"
                        value={bankDetails.accountName}
                        onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                        className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber" className="text-white">
                        Account number / IBAN
                      </Label>
                      <Input
                        id="accountNumber"
                        placeholder="Your IBAN or account number"
                        value={bankDetails.accountNumber}
                        onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                        className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="swiftCode" className="text-white">
                      SWIFT/BIC code
                    </Label>
                    <Input
                      id="swiftCode"
                      placeholder="SWIFT or BIC code (e.g. DEUTDEDE)"
                      value={bankDetails.swiftCode}
                      onChange={(e) => setBankDetails({ ...bankDetails, swiftCode: e.target.value })}
                      className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="pix" className="space-y-5 mt-6">
                  <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>PIX withdrawals are processed instantly to your account</AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="pixCurrency" className="text-white">
                      Withdrawal currency
                    </Label>
                    <Select value="BRL" onValueChange={() => setFiatCurrency("BRL")}>
                      <SelectTrigger
                        id="pixCurrency"
                        className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#162040] border-[#253256] text-white">
                        <SelectItem value="BRL">R$ Brazilian Real (BRL)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pixBank" className="text-white">
                      Select your bank
                    </Label>
                    <Select
                      value={pixDetails.bank}
                      onValueChange={(value) => setPixDetails({ ...pixDetails, bank: value })}
                    >
                      <SelectTrigger
                        id="pixBank"
                        className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                      >
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#162040] border-[#253256] text-white">
                        {brazilianBanks.map((bank) => (
                          <SelectItem
                            key={bank.value}
                            value={bank.value}
                            className="focus:bg-[#253256] focus:text-white"
                          >
                            {bank.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pixKeyType" className="text-white">
                      PIX key type
                    </Label>
                    <Select
                      value={pixDetails.keyType}
                      onValueChange={(value: PixDetails["keyType"]) =>
                        setPixDetails({ ...pixDetails, keyType: value })
                      }
                    >
                      <SelectTrigger
                        id="pixKeyType"
                        className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                      >
                        <SelectValue placeholder="Select key type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#162040] border-[#253256] text-white">
                        <SelectItem value="cpf">CPF</SelectItem>
                        <SelectItem value="digital">Digital Key</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="cellular">Cellular Key</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pixKey" className="text-white">
                      PIX key
                    </Label>
                    <Input
                      id="pixKey"
                      placeholder="Enter your PIX key"
                      value={pixDetails.pixKey}
                    onChange={(e) => handlePixKeyChange(e.target.value)}
                    onPaste={(e) => handlePixKeyChange(e.clipboardData.getData("text"))}
                    className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                    required
                  />
                  {pixVerification === "checking" && (
                    <p className="text-xs text-blue-300">Checking PIX key format...</p>
                  )}
                  {pixVerification === "unavailable" && (
                    <Alert className="mt-3 bg-amber-500/10 border-amber-500/30 text-amber-200">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Recipient name verification is not available yet. Connect your bank&apos;s PIX verification API before accepting a withdrawal request. Do not enter or rely on an unverified recipient name.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pixHolder" className="text-white">
                    Account name
                  </Label>
                  <Input
                    id="pixHolder"
                    placeholder="Populated by your bank verification API"
                    value={pixDetails.accountHolder}
                    onChange={(e) => setPixDetails({ ...pixDetails, accountHolder: e.target.value })}
                    className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                    required
                  />
                </div>
                </TabsContent>

                <TabsContent value="crypto" className="space-y-5 mt-6">
                  <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
Crypto withdrawals are processed within 1–2 hours. Check your wallet address and network carefully.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label htmlFor="cryptocurrency" className="text-white">
                      Select a cryptocurrency
                    </Label>
                    <Select value={cryptoDetails.cryptocurrency} onValueChange={handleCryptoChange}>
                      <SelectTrigger
                        id="cryptocurrency"
                        className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                      >
                        <SelectValue placeholder="Select a cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#162040] border-[#253256] text-white">
                        {cryptocurrencies.map((crypto) => (
                          <SelectItem
                            key={crypto.value}
                            value={crypto.value}
                            className="focus:bg-[#253256] focus:text-white"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{crypto.icon}</span>
                              <div>
                                <div className="font-semibold">{crypto.label}</div>
                                <div className="text-xs text-gray-400">{crypto.network}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      Network: {cryptoDetails.network || "Select a cryptocurrency"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="walletAddress" className="text-white">
Wallet address
                    </Label>
                    <Input
                      id="walletAddress"
                      placeholder={`Enter your ${cryptoDetails.cryptocurrency} wallet address`}
                      value={cryptoDetails.walletAddress}
                      onChange={(e) => setCryptoDetails({ ...cryptoDetails, walletAddress: e.target.value })}
                      className="bg-[#162040]/50 border-[#253256] text-white h-12 font-mono text-sm focus:border-[#f9a826]"
                      required
                    />
                    <p className="text-xs text-yellow-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Make sure you use the correct network: {cryptoDetails.network}
                    </p>
                  </div>

                  <Alert className="border-yellow-500/30 bg-yellow-500/10">
                    <AlertCircle className="h-4 w-4 text-yellow-400" />
                    <AlertDescription className="text-yellow-300 text-sm">
<strong>Important:</strong> Sending funds to the wrong network may result in permanent loss. Always confirm that the network matches your wallet.
                    </AlertDescription>
                  </Alert>

                  <div className="p-4 bg-[#162040]/50 rounded-lg border border-[#253256] space-y-3">
                    <h4 className="font-semibold text-white flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#f9a826]" />
                      Selected cryptocurrency details
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-gray-400">Coin</span>
                        <div className="font-semibold text-white mt-1">
                          {cryptocurrencies.find((c) => c.value === cryptoDetails.cryptocurrency)?.label ||
                            "Not selected"}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Network</span>
                        <div className="font-semibold text-white mt-1">
                          {cryptoDetails.network || "Not selected"}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="paypal" className="space-y-5 mt-6">
                  <Alert className="bg-blue-500/10 border-blue-500/30 text-blue-300">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>PayPal withdrawals are processed within 24 hours</AlertDescription>
                  </Alert>
                  <div className="space-y-2">
                    <Label htmlFor="paypalEmail" className="text-white">
PayPal email
                    </Label>
                    <Input
                      id="paypalEmail"
                      type="email"
                      placeholder="Your PayPal email"
                      value={paypalDetails.email}
                      onChange={(e) => setPaypalDetails({ ...paypalDetails, email: e.target.value })}
                      className="bg-[#162040]/50 border-[#253256] text-white h-12 focus:border-[#f9a826]"
                      required
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Secure transaction</p>
                  <p className="text-xs text-gray-300">
                    All transactions are encrypted and protected. Your information is secure with us.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-[#f9a826] to-yellow-400 hover:from-[#f9a826]/90 hover:to-yellow-400/90 text-black font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
                disabled={processing || balance === 0}
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                    Processing...
                  </>
                ) : balance === 0 ? (
                  <>No balance available</>
                ) : (
                  <>
                    Request withdrawal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="max-w-md p-0 overflow-hidden border-0 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="relative p-6 space-y-6">
              <div className="flex items-center justify-center">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
              </div>

              <DialogHeader className="text-center space-y-2">
                <DialogTitle className="text-lg font-bold text-white">Confirm withdrawal</DialogTitle>
                <DialogDescription className="sr-only">Please confirm your withdrawal</DialogDescription>
              </DialogHeader>

              {pendingWithdrawal && (
                <div className="space-y-3">
                  <div className="bg-slate-700/50 rounded-lg p-4 space-y-3 border border-slate-600">
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400 text-sm">Amount</span>
                      <span className="text-white font-semibold">{formatCurrency(pendingWithdrawal.amount)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400 text-sm">Requested</span>
                      <span className="text-white text-sm text-right">{pendingWithdrawal.date}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-400 text-sm">Method</span>
                      <span className="text-white font-semibold text-sm text-right">{pendingWithdrawal.transferMethodLabel}</span>
                    </div>
                    {pendingWithdrawal.method === "bank" && (
                      <>
                        <div className="border-t border-slate-600 pt-3 flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">Bank</span>
                          <span className="text-white text-sm text-right">{pendingWithdrawal.bankName}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">Account name</span>
                          <span className="text-white text-sm text-right">{pendingWithdrawal.accountName}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">SWIFT/BIC</span>
                          <span className="text-white font-mono text-xs text-right">{pendingWithdrawal.swiftCode || "Not provided"}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">Account number</span>
                          <span className="text-white font-mono text-xs text-right">{pendingWithdrawal.accountNumber || "Not provided"}</span>
                        </div>
                      </>
                    )}
                    {pendingWithdrawal.method === "pix" && (
                      <>
                        <div className="border-t border-slate-600 pt-3 flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">Currency</span>
                          <span className="text-white text-sm">BRL (R$)</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">PIX key type</span>
                          <span className="text-white text-sm">{pendingWithdrawal.keyType}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">PIX key</span>
                          <span className="text-white font-mono text-xs break-all text-right">{pendingWithdrawal.pixKey}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">Account name</span>
                          <span className="text-white text-sm text-right">{pendingWithdrawal.accountHolder}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">Bank</span>
                          <span className="text-white text-sm text-right">{pendingWithdrawal.bank}</span>
                        </div>
                      </>
                    )}
                    {pendingWithdrawal.method === "crypto" && (
                      <>
                        <div className="border-t border-slate-600 pt-3 flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">Asset</span>
                          <span className="text-white text-sm">{pendingWithdrawal.cryptocurrency}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-gray-400 text-sm">Wallet address</span>
                          <span className="text-white font-mono text-xs break-all text-right">{pendingWithdrawal.walletAddress}</span>
                        </div>
                      </>
                    )}
                    {pendingWithdrawal.method === "paypal" && (
                      <div className="border-t border-slate-600 pt-3 flex justify-between gap-4">
                        <span className="text-gray-400 text-sm">PayPal email</span>
                        <span className="text-white text-sm break-all text-right">{pendingWithdrawal.paypalEmail}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                    <p className="text-yellow-300 text-sm">
                      <strong>Important:</strong> Please review all details carefully before continuing. This action cannot be undone.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="withdrawal-confirmation-code" className="text-white">
                      Six-digit confirmation code
                    </Label>
                    <Input
                      id="withdrawal-confirmation-code"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      placeholder="Enter your 6-digit code"
                      value={confirmationCode}
                      onChange={(event) => setConfirmationCode(event.target.value.replace(/\\D/g, "").slice(0, 6))}
                      className="h-12 bg-slate-700/50 border-slate-600 text-white text-center text-lg tracking-[0.45em] focus:border-green-400"
                      aria-describedby="withdrawal-code-help"
                    />
                    <p id="withdrawal-code-help" className="text-xs text-gray-400">
                      Enter the one-time code sent to your verified contact before confirming this withdrawal.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 h-10 bg-slate-700 hover:bg-slate-600 text-white font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmWithdrawal}
                  disabled={!/^\d{6}$/.test(confirmationCode)}
                  className="flex-1 h-10 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Confirm withdrawal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showProcessing} onOpenChange={() => undefined}>
          <DialogContent
            className="max-w-sm border border-blue-400/30 bg-gradient-to-br from-slate-950 to-slate-900 text-white [&>button]:hidden"
            onInteractOutside={(event) => event.preventDefault()}
            onEscapeKeyDown={(event) => event.preventDefault()}
          >
            <div className="flex flex-col items-center gap-5 py-6 text-center">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full bg-blue-400/20" />
                <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-blue-400/20 border-t-blue-400" />
              </div>
              <div className="space-y-2">
                <DialogTitle className="text-xl text-white">Processing withdrawal</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Your request is being securely submitted. Please keep this window open.
                </DialogDescription>
              </div>
              <div className="w-full rounded-full bg-slate-700" aria-label="Withdrawal processing">
                <div className="h-2 w-2/3 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
              </div>
              <p className="text-sm font-medium text-blue-200">Step 1 of 2: verifying destination</p>
              <p className="text-xs text-gray-400">Please wait while we securely prepare your withdrawal receipt.</p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-md p-0 overflow-hidden border-0 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md animate-pulse" />
              <div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full blur-md animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            <div className="relative p-6 space-y-4">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md animate-pulse" />
                  <div className="relative p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                    <Check className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>

              <DialogHeader className="text-center space-y-2">
                <DialogTitle className="text-lg font-bold text-white">Withdrawal successful</DialogTitle>
                <DialogDescription className="sr-only">Your withdrawal was processed successfully</DialogDescription>
              </DialogHeader>

              <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                <p className="text-center leading-relaxed">
                  <strong className="block text-base mb-2 text-white">Withdrawal processed</strong>
                  <span className="text-gray-300 text-sm">
                    Your withdrawal request for{" "}
                    <strong className="text-green-400">{formatCurrency(Number.parseFloat(amount) || 0)}</strong> wurde
                    erfolgreich verarbeitet.
                  </span>
                </p>
              </div>

              <div className="text-center py-2 bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-lg border border-green-500/20">
                <div className="text-xs text-gray-400 mb-1">Status</div>
                <div className="text-base font-bold text-green-400">Successful ✓</div>
              </div>

              <Button
                onClick={() => setShowModal(false)}
                className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold shadow-lg"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showRestriction} onOpenChange={setShowRestriction}>
          <DialogContent className="max-w-md p-0 overflow-hidden border-0 bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="relative p-6 space-y-6">
              <div className="flex items-center justify-center">
                <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
              </div>

              <DialogHeader className="text-center space-y-2">
                <DialogTitle className="text-lg font-bold text-white">Withdrawal restricted</DialogTitle>
                <DialogDescription className="sr-only">Withdrawal is currently unavailable</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-300 text-sm leading-relaxed">
                    Withdrawals to this destination are restricted. Please contact your bank for more information.
                  </p>
                </div>

                {pendingWithdrawal && (
                  <div className="bg-slate-700/50 rounded-lg p-4 space-y-2 border border-slate-600">
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-xs">Amount:</span>
                      <span className="text-white font-semibold text-sm">{formatCurrency(pendingWithdrawal.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 text-xs">Method:</span>
                      <span className="text-white font-semibold text-sm">{pendingWithdrawal.transferMethodLabel}</span>
                    </div>
                    <div className="border-t border-slate-600 pt-2 mt-2">
                      <p className="text-yellow-300 text-xs">
                        <strong>Hinweis:</strong> Diese Transaktion wurde nicht verarbeitet.
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-blue-300 text-xs">
                    For assistance, contact our support team through the Support page.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleCloseRestriction}
                  className="flex-1 h-10 bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm"
                >
                  Verstanden
                </Button>
                <Button
                  onClick={handleCloseRestriction}
                  className="flex-1 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-sm"
                >
                  Support kontaktieren
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-sm p-0 overflow-hidden border-0 bg-gradient-to-br from-slate-900 to-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="relative p-4 space-y-3">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-base font-bold text-white">Withdrawal receipt</h2>
                  <p className="text-gray-400 text-xs">Processed successfully</p>
                </div>
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Check className="h-5 w-5 text-white" />
                </div>
              </div>

              {withdrawalReceipt && (
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-3 border border-slate-600">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Transaction ID</p>
                        <p className="text-white font-mono font-semibold break-all text-xs">{withdrawalReceipt.transactionId}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Date & time</p>
                        <p className="text-white font-semibold text-xs">{withdrawalReceipt.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Amount</p>
                        <p className="text-lg font-bold text-green-400">{formatCurrency(withdrawalReceipt.amount)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Status</p>
                        <p className="text-green-400 font-semibold flex items-center text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {withdrawalReceipt.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-3 border border-slate-600">
                    <h3 className="text-white font-semibold mb-2 text-sm">Details</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Method:</span>
                        <span className="text-white font-semibold capitalize">{withdrawalReceipt.transferMethodLabel}</span>
                      </div>
                      {withdrawalReceipt.method === "bank" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Bank:</span>
                            <span className="text-white text-xs">{withdrawalReceipt.bankName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Account holder:</span>
                            <span className="text-white text-xs">{withdrawalReceipt.accountName}</span>
                          </div>
                        </>
                      )}
                      {withdrawalReceipt.method === "pix" && (
                        <>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-400">PIX key type:</span>
                            <span className="text-white text-xs">{withdrawalReceipt.keyType || "Not provided"}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-400">PIX key:</span>
                            <span className="text-white font-mono text-xs break-all">{withdrawalReceipt.pixKey}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-400">Account name:</span>
                            <span className="text-white text-xs">{withdrawalReceipt.accountHolder || "Not provided"}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-gray-400">Bank:</span>
                            <span className="text-white text-xs">{withdrawalReceipt.bank || "Not provided"}</span>
                          </div>
                        </>
                      )}
                      {withdrawalReceipt.method === "crypto" && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Coin:</span>
                            <span className="text-white text-xs">{withdrawalReceipt.cryptocurrency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Address:</span>
                            <span className="text-white font-mono text-xs break-all">{withdrawalReceipt.walletAddress}</span>
                          </div>
                        </>
                      )}
                      {withdrawalReceipt.method === "paypal" && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">PayPal:</span>
                          <span className="text-white text-xs">{withdrawalReceipt.paypalEmail}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 p-3">
                    <h3 className="mb-2 text-sm font-semibold text-amber-200">Platform account details</h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span className="text-gray-400">Name</span><span className="text-right text-white">{withdrawalReceipt.platformAccountName}</span>
                      <span className="text-gray-400">Bank</span><span className="text-right text-white">{withdrawalReceipt.platformBank}</span>
                      <span className="text-gray-400">CPF</span><span className="text-right font-mono text-white">{withdrawalReceipt.platformAccount}</span>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2">
                    <p className="text-blue-300 text-xs">
                      <strong>Note:</strong> {withdrawalReceipt.transferMethodLabel === "Instant SEPA" 
                        ? "Your instant transfer will be processed within 10 seconds."
                        : withdrawalReceipt.transferMethodLabel === "SEPA"
                        ? "Your transfer will be processed within 1 business day."
                        : "Your withdrawal will arrive in 1–3 business days."} You will receive a notification when it is complete.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    const printWindow = window.open("", "_blank")
                    if (printWindow) {
                      printWindow.document.write(`
                        <html>
                          <head>
                            <title>Withdrawal receipt - ${withdrawalReceipt?.transactionId}</title>
                            <style>
                              body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
                              .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
                              .title { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                              .section { margin: 20px 0; }
                              .section-title { font-weight: bold; font-size: 14px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
                              .detail-row { display: flex; justify-content: space-between; margin: 8px 0; padding: 5px 0; }
                              .label { font-weight: bold; width: 200px; }
                              .value { text-align: right; flex: 1; }
                              .amount { font-size: 18px; color: green; font-weight: bold; }
                              .status { color: green; font-weight: bold; }
                              .footer { text-align: center; margin-top: 30px; border-top: 2px solid #000; padding-top: 20px; font-size: 12px; color: #666; }
                            </style>
                          </head>
                          <body>
                            <div class="header">
                              <div class="title">Withdrawal receipt</div>
                              <div>Processed successfully</div>
                            </div>
                            <div class="section">
                              <div class="section-title">Transaction information</div>
                              <div class="detail-row">
                                <div class="label">Transaction ID:</div>
                                <div class="value">${withdrawalReceipt?.transactionId}</div>
                              </div>
                              <div class="detail-row">
                                <div class="label">Date & time:</div>
                                <div class="value">${withdrawalReceipt?.date}</div>
                              </div>
                              <div class="detail-row">
                                <div class="label">Withdrawal amount:</div>
                                <div class="value amount">${new Intl.NumberFormat("en-US", { style: "currency", currency: fiatCurrency }).format(withdrawalReceipt?.amount ?? 0)}</div>
                              </div>
                              <div class="detail-row">
                                <div class="label">Status:</div>
                                <div class="value status">${withdrawalReceipt?.status}</div>
                              </div>
                            </div>
                            <div class="section">
                              <div class="section-title">Withdrawal method details</div>
                              <div class="detail-row">
                                <div class="label">Method:</div>
                                <div class="value">${withdrawalReceipt?.method.toUpperCase()}</div>
                              </div>
                              ${
                                withdrawalReceipt?.method === "bank"
                                  ? `
                                <div class="detail-row">
                                  <div class="label">Bank:</div>
                                  <div class="value">${withdrawalReceipt?.bankName}</div>
                                </div>
                                <div class="detail-row">
                                  <div class="label">Account holder:</div>
                                  <div class="value">${withdrawalReceipt?.accountName}</div>
                                </div>
                              `
                                  : ""
                              }
                              ${
                                withdrawalReceipt?.method === "pix"
                                  ? `
                                <div class="detail-row">
                                  <div class="label">PIX key type:</div>
                                  <div class="value">${withdrawalReceipt?.keyType || "Not provided"}</div>
                                </div>
                                <div class="detail-row">
                                  <div class="label">PIX key:</div>
                                  <div class="value">${withdrawalReceipt?.pixKey}</div>
                                </div>
                                <div class="detail-row">
                                  <div class="label">Account name:</div>
                                  <div class="value">${withdrawalReceipt?.accountHolder || "Not provided"}</div>
                                </div>
                                <div class="detail-row">
                                  <div class="label">Bank:</div>
                                  <div class="value">${withdrawalReceipt?.bank || "Not provided"}</div>
                                </div>
                              `
                                  : ""
                              }
                              ${
                                withdrawalReceipt?.method === "crypto"
                                  ? `
                                <div class="detail-row">
                                  <div class="label">Cryptocurrency:</div>
                                  <div class="value">${withdrawalReceipt?.cryptocurrency}</div>
                                </div>
                                <div class="detail-row">
                                  <div class="label">Wallet address:</div>
                                  <div class="value">${withdrawalReceipt?.walletAddress}</div>
                                </div>
                              `
                                  : ""
                              }
                              ${
                                withdrawalReceipt?.method === "paypal"
                                  ? `
                                <div class="detail-row">
                                  <div class="label">PayPal email:</div>
                                  <div class="value">${withdrawalReceipt?.paypalEmail}</div>
                                </div>
                              `
                                  : ""
                              }
                            </div>
                            <div class="section">
                              <div class="section-title">Platform account details</div>
                              <div class="detail-row"><div class="label">Name:</div><div class="value">${withdrawalReceipt?.platformAccountName}</div></div>
                              <div class="detail-row"><div class="label">Bank:</div><div class="value">${withdrawalReceipt?.platformBank}</div></div>
                              <div class="detail-row"><div class="label">CPF:</div><div class="value">${withdrawalReceipt?.platformAccount}</div></div>
                            </div>
                            <div class="footer">
                              <p>Your withdrawal will arrive in 1–3 business days.</p>
                              <p>Thank you for trusting our platform.</p>
                            </div>
                          </body>
                        </html>
                      `)
                      printWindow.document.close()
                      printWindow.print()
                    }
                  }}
                  className="flex-1 h-9 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold flex items-center justify-center gap-1 text-sm"
                >
                  <Printer className="h-4 w-4" />
                  Print receipt
                </Button>
                <Button
                  onClick={() => {
                    setShowModal(false)
                    setAmount("")
                  }}
                  className="flex-1 h-9 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold text-sm"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

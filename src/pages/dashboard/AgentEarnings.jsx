// src/pages/dashboard/AgentEarnings.jsx
import { useState } from "react"; // ✅ was missing
import {
  TrendingUp, Wallet, Clock, CheckCircle,
  ArrowDownLeft, ArrowUpRight, Filter,
  Building, X, AlertTriangle, CreditCard
} from "lucide-react";

const SUMMARY = {
  totalEarned: 4_800_000,
  available:     480_000,
  pending:       120_000,
  withdrawn:   4_200_000,
};

const TRANSACTIONS = [
  { id: 1, type: "commission", property: "3 Bedroom Flat, Lekki Phase 1",  buyer: "Chidi Nwosu",   date: "Apr 10, 2026", amount:  250_000, status: "settled", deal: "Sale closed"           },
  { id: 2, type: "commission", property: "2 Bedroom Bungalow, Abuja",       buyer: "Fatima Bello",  date: "Apr 6, 2026",  amount:  180_000, status: "settled", deal: "Rent closed"           },
  { id: 3, type: "commission", property: "Land (600sqm), Ibadan",           buyer: "Tunde Adeyemi", date: "Apr 1, 2026",  amount:  120_000, status: "pending", deal: "Awaiting confirmation" },
  { id: 4, type: "withdrawal", property: null, buyer: null,                  date: "Mar 28, 2026",  amount: -300_000,     status: "paid",    deal: "GTBank · ****4521"           },
  { id: 5, type: "commission", property: "Mini Flat, Yaba",                  buyer: "Ada Obi",       date: "Mar 20, 2026", amount:   90_000, status: "settled", deal: "Rent closed"           },
  { id: 6, type: "withdrawal", property: null, buyer: null,                  date: "Mar 10, 2026",  amount: -500_000,     status: "paid",    deal: "GTBank · ****4521"           },
  { id: 7, type: "commission", property: "Duplex, Maitama Abuja",            buyer: "Emeka Eze",     date: "Feb 25, 2026", amount:  350_000, status: "settled", deal: "Sale closed"           },
];

const MONTHS        = ["All Time", "Apr 2026", "Mar 2026", "Feb 2026"];
const NIGERIAN_BANKS = [
  "Access Bank", "GTBank", "First Bank", "Zenith Bank",
  "UBA", "Fidelity Bank", "Union Bank", "Sterling Bank",
  "Polaris Bank", "Kuda Bank", "Opay", "Palmpay",
];

const fmt = (n) => `₦${Math.abs(n).toLocaleString()}`;

const MONTHLY = [
  { month: "Nov", amount: 200_000 },
  { month: "Dec", amount: 350_000 },
  { month: "Jan", amount: 180_000 },
  { month: "Feb", amount: 420_000 },
  { month: "Mar", amount: 310_000 },
  { month: "Apr", amount: 480_000 },
];

const BarChart = () => {
  const max = Math.max(...MONTHLY.map(m => m.amount));
  return (
    <div className="flex items-end gap-2 h-24">
      {MONTHLY.map(({ month, amount }) => (
        <div key={month} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex items-end justify-center" style={{ height: "80px" }}>
            <div
              className="w-full rounded-t-lg bg-[#C9A84C]/80 hover:bg-[#C9A84C] transition-all duration-200"
              style={{ height: `${(amount / max) * 80}px` }}
            />
          </div>
          <span className="text-[9px] text-[#6B7280] font-medium">{month}</span>
        </div>
      ))}
    </div>
  );
};

const WithdrawModal = ({ available, onClose }) => {
  const [step,        setStep]        = useState(1);
  const [amount,      setAmount]      = useState("");
  const [bank,        setBank]        = useState("");
  const [accountNo,   setAccountNo]   = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading,     setLoading]     = useState(false);

  const amountNum = Number(amount.replace(/,/g, ""));
  const isValid   = amountNum >= 5000 && amountNum <= available && bank && accountNo.length === 10 && accountName;

  const handleVerify = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setAccountName("EMEKA OKAFOR");
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">

        <div className="bg-[#0A1628] px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest">Withdrawal</p>
            <p className="text-white font-bold mt-0.5">
              {step === 1 ? "Enter Details" : step === 2 ? "Confirm Request" : "Request Submitted"}
            </p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
            <X size={15} />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="bg-[#F7F4EF] rounded-xl p-4 flex items-center justify-between">
                <p className="text-sm text-[#6B7280]">Available balance</p>
                <p className="font-bold text-[#0A1628] text-lg">{fmt(available)}</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Amount (₦)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-[#6B7280] font-bold text-sm">₦</span>
                  <input
                    type="text" inputMode="numeric" value={amount}
                    onChange={e => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setAmount(raw ? Number(raw).toLocaleString() : "");
                    }}
                    placeholder="0"
                    className="w-full border border-[#E0D9CF] rounded-xl pl-8 pr-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition"
                  />
                </div>
                {amountNum > 0 && amountNum < 5000 && (
                  <p className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={11} /> Minimum withdrawal is ₦5,000</p>
                )}
                {amountNum > available && (
                  <p className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={11} /> Amount exceeds available balance</p>
                )}
                <div className="flex gap-2 mt-1">
                  {[25, 50, 75, 100].map(pct => (
                    <button key={pct}
                      onClick={() => setAmount(Math.floor(available * pct / 100).toLocaleString())}
                      className="flex-1 text-[10px] font-bold border border-[#E0D9CF] hover:border-[#C9A84C] hover:bg-[#F7F4EF] text-[#6B7280] hover:text-[#0A1628] py-1.5 rounded-lg transition">
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Bank</label>
                <select value={bank} onChange={e => { setBank(e.target.value); setAccountName(""); }}
                  className="w-full border border-[#E0D9CF] rounded-xl px-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition">
                  <option value="">Select bank</option>
                  {NIGERIAN_BANKS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Account Number</label>
                <div className="flex gap-2">
                  <input
                    type="text" inputMode="numeric" maxLength={10} value={accountNo}
                    onChange={e => { setAccountNo(e.target.value.replace(/\D/g, "")); setAccountName(""); }}
                    placeholder="10-digit account number"
                    className="flex-1 border border-[#E0D9CF] rounded-xl px-4 py-3 text-sm text-[#0A1628] focus:outline-none focus:border-[#C9A84C] transition"
                  />
                  {accountNo.length === 10 && bank && !accountName && (
                    <button onClick={handleVerify} disabled={loading}
                      className="px-4 py-3 bg-[#0A1628] text-[#C9A84C] text-xs font-bold rounded-xl hover:bg-[#1A2E4A] transition disabled:opacity-60 whitespace-nowrap">
                      {loading ? "..." : "Verify"}
                    </button>
                  )}
                </div>
                {accountName && (
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    <p className="text-sm font-bold text-green-700">{accountName}</p>
                  </div>
                )}
              </div>

              <button onClick={() => setStep(2)} disabled={!isValid}
                className="w-full bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-[#0A1628] font-bold py-3 rounded-xl text-sm transition duration-200 mt-2">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-[#6B7280]">Please review your withdrawal details before submitting.</p>
              <div className="bg-[#F7F4EF] rounded-xl divide-y divide-[#E0D9CF]">
                {[
                  { label: "Amount",       value: fmt(amountNum)      },
                  { label: "Bank",         value: bank                },
                  { label: "Account No",   value: accountNo           },
                  { label: "Account Name", value: accountName         },
                  { label: "Processing",   value: "1–2 business days" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-4 py-3">
                    <p className="text-xs text-[#6B7280] font-semibold">{label}</p>
                    <p className="text-sm font-bold text-[#0A1628]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#E8D5A3]/30 border border-[#C9A84C]/30 rounded-xl p-3 flex items-start gap-2">
                <AlertTriangle size={14} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#6B7280]">
                  Withdrawals are processed manually by our team within 1–2 business days. You'll receive an email confirmation once paid.
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)}
                  className="flex-1 border border-[#E0D9CF] hover:border-[#C9A84C]/40 text-[#0A1628] font-semibold py-3 rounded-xl text-sm transition">
                  Back
                </button>
                <button onClick={handleSubmit} disabled={loading}
                  className="flex-1 bg-[#0A1628] hover:bg-[#1A2E4A] active:scale-95 disabled:opacity-60 text-[#C9A84C] font-bold py-3 rounded-xl text-sm transition duration-200 flex items-center justify-center gap-2">
                  {loading
                    ? <><span className="w-4 h-4 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" /> Processing...</>
                    : "Submit Request"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <div>
                <p className="font-bold text-[#0A1628] text-lg">Request Submitted!</p>
                <p className="text-sm text-[#6B7280] mt-1 leading-relaxed">
                  Your withdrawal of <span className="font-bold text-[#0A1628]">{fmt(amountNum)}</span> has been submitted. Our team will process it within 1–2 business days.
                </p>
              </div>
              <div className="bg-[#F7F4EF] rounded-xl p-4 w-full text-left">
                <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-2">Sent to</p>
                <p className="text-sm font-bold text-[#0A1628]">{accountName}</p>
                <p className="text-xs text-[#6B7280] mt-0.5">{bank} · {accountNo}</p>
              </div>
              <button onClick={onClose}
                className="w-full bg-[#C9A84C] hover:bg-[#b8943d] text-[#0A1628] font-bold py-3 rounded-xl text-sm transition duration-200">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AgentEarnings = () => {
  const [filter,       setFilter]       = useState("All Time");
  const [typeFilter,   setTypeFilter]   = useState("all");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const filtered = TRANSACTIONS.filter(t => {
    if (typeFilter === "commissions") return t.type === "commission";
    if (typeFilter === "withdrawals") return t.type === "withdrawal";
    return true;
  });

  return (
    <div className="flex flex-col gap-6 max-w-4xl">

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#0A1628]">Earnings</h1>
          <p className="text-sm text-[#6B7280]">Track your commissions and withdrawals</p>
        </div>
        <button onClick={() => setShowWithdraw(true)}
          className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] font-bold px-4 py-2.5 rounded-xl text-sm transition duration-200">
          <Wallet size={15} /> Withdraw Funds
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Earned", value: fmt(SUMMARY.totalEarned), icon: TrendingUp,  bg: "bg-[#0A1628]",  color: "text-[#0A1628]"  },
          { label: "Available",    value: fmt(SUMMARY.available),   icon: Wallet,       bg: "bg-green-500",  color: "text-green-600"  },
          { label: "Pending",      value: fmt(SUMMARY.pending),     icon: Clock,        bg: "bg-yellow-400", color: "text-yellow-600" },
          { label: "Withdrawn",    value: fmt(SUMMARY.withdrawn),   icon: ArrowUpRight, bg: "bg-[#6B7280]",  color: "text-[#6B7280]"  },
        ].map(({ label, value, icon: Icon, bg, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#E0D9CF] p-4">
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={15} className="text-white" />
            </div>
            <p className={`text-lg font-bold ${color}`}>{value}</p>
            <p className="text-xs text-[#6B7280] mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {SUMMARY.available > 0 && (
        <div className="bg-[#0A1628] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#F7F4EF] font-bold">You have {fmt(SUMMARY.available)} available</p>
            <p className="text-[#8A9BB5] text-sm mt-0.5">Withdraw to your Nigerian bank account anytime.</p>
          </div>
          <button onClick={() => setShowWithdraw(true)}
            className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8943d] active:scale-95 text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200 flex-shrink-0 whitespace-nowrap">
            <Wallet size={15} /> Withdraw Now
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E0D9CF] p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-[#0A1628] text-sm">Monthly Earnings</p>
          <p className="text-xs text-[#6B7280]">Last 6 months</p>
        </div>
        <BarChart />
      </div>

      <div className="bg-white rounded-2xl border border-[#E0D9CF] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E0D9CF] flex items-center justify-between gap-3 flex-wrap">
          <p className="font-bold text-[#0A1628] text-sm">Transaction History</p>
          <div className="flex items-center gap-2">
            <select value={filter} onChange={e => setFilter(e.target.value)}
              className="text-xs border border-[#E0D9CF] rounded-lg px-3 py-1.5 text-[#6B7280] focus:outline-none focus:border-[#C9A84C] transition">
              {MONTHS.map(m => <option key={m}>{m}</option>)}
            </select>
            <div className="flex gap-1">
              {[
                { id: "all",         label: "All"         },
                { id: "commissions", label: "Commissions" },
                { id: "withdrawals", label: "Withdrawals" },
              ].map(({ id, label }) => (
                <button key={id} onClick={() => setTypeFilter(id)}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap
                    ${typeFilter === id ? "bg-[#0A1628] text-[#C9A84C]" : "border border-[#E0D9CF] text-[#6B7280] hover:border-[#C9A84C]/40"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#E0D9CF]">
          {filtered.map((t) => {
            const isWithdrawal = t.type === "withdrawal";
            const isPending    = t.status === "pending";
            return (
              <div key={t.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#F7F4EF] transition">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                  ${isWithdrawal ? "bg-[#F7F4EF] border border-[#E0D9CF]" : isPending ? "bg-yellow-50 border border-yellow-200" : "bg-green-50 border border-green-200"}`}>
                  {isWithdrawal
                    ? <ArrowUpRight size={16} className="text-[#6B7280]" />
                    : isPending
                      ? <Clock size={16} className="text-yellow-500" />
                      : <ArrowDownLeft size={16} className="text-green-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0A1628] truncate">
                    {isWithdrawal ? "Withdrawal" : t.property}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-0.5 flex items-center gap-1">
                    {isWithdrawal
                      ? <><CreditCard size={10} /> {t.deal}</>
                      : <><Building size={10} /> {t.deal} · {t.buyer}</>}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-bold ${isWithdrawal ? "text-[#6B7280]" : isPending ? "text-yellow-600" : "text-green-600"}`}>
                    {isWithdrawal ? "-" : "+"}{fmt(t.amount)}
                  </p>
                  <p className="text-[10px] text-[#6B7280] mt-0.5">{t.date}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full
                    ${t.status === "settled" || t.status === "paid" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                    {t.status}
                  </span>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <Filter size={24} className="text-[#C9A84C] mb-3" />
              <p className="font-bold text-[#0A1628]">No transactions found</p>
              <p className="text-sm text-[#6B7280] mt-1">Try changing the filter.</p>
            </div>
          )}
        </div>
      </div>

      {showWithdraw && (
        <WithdrawModal available={SUMMARY.available} onClose={() => setShowWithdraw(false)} />
      )}
    </div>
  );
};

export default AgentEarnings;
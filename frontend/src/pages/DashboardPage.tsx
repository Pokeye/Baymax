import { Database, RefreshCw, ShieldCheck } from 'lucide-react'
import { StatusPill } from '../components/StatusPill'
import { useHealthCheck } from '../hooks/useHealthCheck'

export function DashboardPage() {
  const { data, error, isLoading, refresh } = useHealthCheck()
  const isConnected = data?.database === 'connected'

  return (
    <div className="space-y-8">
      <section className="max-w-3xl space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">BayMax foundation</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">A calm place to begin building your digital legacy.</h1>
        <p className="text-base leading-7 text-slate-400">The application shell is connected to the BayMax API. Future companion, memory, and legacy modules will build on this protected foundation.</p>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-glow lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-200"><Database size={18} className="text-cyan-300" /> API connection</div>
              <h2 className="text-xl font-semibold text-white">Backend health</h2>
              <p className="text-sm text-slate-400">Checks the FastAPI service and its PostgreSQL database connection.</p>
            </div>
            <StatusPill label={isLoading ? 'Checking…' : isConnected ? 'Connected' : 'Needs attention'} tone={isLoading ? 'neutral' : isConnected ? 'success' : 'warning'} />
          </div>
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm">
            {isLoading && <p className="text-slate-400">Contacting BayMax API…</p>}
            {error && <p className="text-amber-200">{error}</p>}
            {data && <p className="text-slate-300"><span className="text-slate-500">Service:</span> {data.service} <span className="ml-4 text-slate-500">Database:</span> {data.database}</p>}
          </div>
          <button type="button" onClick={() => void refresh()} className="mt-5 inline-flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-400/20">
            <RefreshCw size={15} aria-hidden="true" /> Check again
          </button>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <ShieldCheck size={22} className="text-cyan-300" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-semibold text-white">Security first</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Authentication, authorization, and the audit trail will be added before protected records or AI context exist.</p>
        </article>
      </section>
    </div>
  )
}

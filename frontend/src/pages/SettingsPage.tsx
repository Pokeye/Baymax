import { Settings } from 'lucide-react'

export function SettingsPage() {
  return (
    <section className="max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Application settings</h1>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <Settings className="text-cyan-300" aria-hidden="true" />
        <h2 className="mt-4 text-lg font-semibold text-white">Personal settings are not available yet</h2>
        <p className="mt-2 leading-7 text-slate-400">This page establishes the navigation and visual foundation. Owner profile and personalization controls will be implemented only after authentication is in place.</p>
      </div>
    </section>
  )
}

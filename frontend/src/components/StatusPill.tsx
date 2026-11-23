interface StatusPillProps {
  label: string
  tone: 'success' | 'neutral' | 'warning'
}

const toneStyles = {
  success: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300',
  neutral: 'border-cyan-400/20 bg-cyan-400/10 text-cyan-200',
  warning: 'border-amber-400/20 bg-amber-400/10 text-amber-200',
}

export function StatusPill({ label, tone }: StatusPillProps) {
  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${toneStyles[tone]}`}>{label}</span>
}

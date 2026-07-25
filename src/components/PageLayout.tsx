import type { ReactNode } from 'react'

export function PageContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`page-container ${className}`.trim()}>{children}</div>
}

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return <div className="section-header"><h2>{title}</h2>{action && <div className="section-header-action">{action}</div>}</div>
}

export function PageHeader({ breadcrumb, title }: { breadcrumb: ReactNode; title: string }) {
  return <header className="page-header"><p>{breadcrumb}</p><h1>{title}</h1></header>
}

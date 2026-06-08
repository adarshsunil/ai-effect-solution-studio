import Link from 'next/link';

const nav = [
  ['Catalogue', '/catalogue'],
  ['Publish service', '/publish'],
  ['Build solution', '/builder'],
  ['Deployments', '/deployments'],
  ['Admin', '/admin']
];

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-semibold tracking-tight">AI-EFFECT Solution Studio</Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            {nav.map(([label, href]) => <Link key={href} href={href} className="hover:text-slate-950">{label}</Link>)}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}

import { Shell } from '@/components/shell';

export default function HomePage() {
  return (
    <Shell>
      <section className="rounded-3xl bg-slate-950 px-8 py-14 text-white">
        <p className="mb-3 text-sm uppercase tracking-widest text-slate-300">AI-EFFECT Web Portal</p>
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight">Publish, discover, compose, and deploy trusted energy AI services.</h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-300">A marketplace and workflow studio built on top of the AI-EFFECT WP3 orchestrator for node providers, AI vendors, and TEF operators.</p>
        <div className="mt-8 flex gap-3">
          <a href="/catalogue" className="rounded-xl bg-white px-5 py-3 font-medium text-slate-950">Explore catalogue</a>
          <a href="/publish" className="rounded-xl border border-white/30 px-5 py-3 font-medium">Publish my service</a>
        </div>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ['For nodes', 'Guided service onboarding, metadata validation, and governance approval.'],
          ['For AI vendors', 'Marketplace discovery and visual workflow composition.'],
          ['For TEF operators', 'Trust badges, approval queues, execution monitoring, and auditability.']
        ].map(([title, body]) => <div key={title} className="rounded-2xl border bg-white p-6"><h2 className="font-semibold">{title}</h2><p className="mt-2 text-sm text-slate-600">{body}</p></div>)}
      </section>
    </Shell>
  );
}

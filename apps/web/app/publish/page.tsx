import { Shell } from '@/components/shell';

const steps = ['Profile', 'Docker image', 'Inputs and outputs', 'Control interface', 'Docs and examples', 'Review'];

export default function PublishPage() {
  return <Shell><h1 className="text-3xl font-bold">Publish my service</h1><p className="mt-2 text-slate-600">A guided onboarding flow for node providers.</p><div className="mt-6 grid gap-4 md:grid-cols-2">{steps.map((step, i) => <div key={step} className="rounded-2xl border bg-white p-5"><span className="text-sm text-slate-500">Step {i + 1}</span><h2 className="mt-1 font-semibold">{step}</h2><p className="mt-2 text-sm text-slate-600">Collect and validate the information required to make the service catalogue-ready and orchestrator-compatible.</p></div>)}</div></Shell>;
}

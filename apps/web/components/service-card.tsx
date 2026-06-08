export type ServiceCardProps = {
  name: string;
  provider: string;
  useCase: string;
  status: string;
  protocols: string[];
};

export function ServiceCard({ name, provider, useCase, status, protocols }: ServiceCardProps) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">{status}</span>
      </div>
      <p className="text-sm text-slate-600">{useCase}</p>
      <p className="mt-3 text-sm"><span className="font-medium">Provider:</span> {provider}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {protocols.map((p) => <span key={p} className="rounded-full border px-2 py-1 text-xs">{p}</span>)}
      </div>
    </article>
  );
}

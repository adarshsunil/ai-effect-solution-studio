import { Shell } from '@/components/shell';
import { ServiceCard } from '@/components/service-card';

const services = [
  { name: 'Synthetic Load Data Generator', provider: 'Portugal Node', useCase: 'Generates synthetic energy data for AI experimentation.', status: 'Validated', protocols: ['http', 'DataReference'] },
  { name: 'Grid Chronics Generator', provider: 'Germany Node', useCase: 'Converts timeseries data into Grid2Op chronics.', status: 'TEF-ready', protocols: ['http', 'file'] },
  { name: 'Demand Forecasting Model', provider: 'Demo Provider', useCase: 'Forecasts demand from input consumption data.', status: 'Experimental', protocols: ['inline', 'json'] }
];

export default function CataloguePage() {
  return <Shell><div className="mb-6"><h1 className="text-3xl font-bold">Service catalogue</h1><p className="mt-2 text-slate-600">Browse validated AI-EFFECT services and add them to solutions.</p></div><div className="grid gap-4 md:grid-cols-3">{services.map((s) => <ServiceCard key={s.name} {...s} />)}</div></Shell>;
}

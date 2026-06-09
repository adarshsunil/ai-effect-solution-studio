import Link from "next/link";

async function getService(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load service");
  }

  return res.json();
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await getService(id);

  return (
    <div className="page">
      <Link href="/catalogue" style={{ color: "#075985", fontWeight: 800 }}>
        ← Back to catalogue
      </Link>

      <section className="card" style={{ padding: 34, marginTop: 20 }}>
        <span className="badge">{service.trust_badge}</span>
        <h1 style={{ fontSize: 42, marginBottom: 8 }}>{service.name}</h1>
        <p style={{ color: "#526173", fontSize: 18, maxWidth: 850, lineHeight: 1.7 }}>
          {service.description}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <Info title="Provider" value={service.provider} />
          <Info title="Category" value={service.category} />
          <Info title="Status" value={service.status} />
          <Info title="Version" value={`v${service.version}`} />
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20, marginTop: 20 }}>
        <div className="card" style={{ padding: 28 }}>
          <h2>Interface contract</h2>
          <ContractRow label="Input type" value={service.input_type} />
          <ContractRow label="Output type" value={service.output_type} />
          <ContractRow label="Health endpoint" value="/health" />
          <ContractRow label="Execute endpoint" value="/control/execute" />
          <ContractRow label="Status endpoint" value="/control/status/{id}" />
          <ContractRow label="Output endpoint" value="/control/output/{id}" />
        </div>

        <div className="card" style={{ padding: 28 }}>
          <h2>Trust & readiness</h2>
          <Check text="Metadata available" />
          <Check text="Input/output declared" />
          <Check text="Dockerized service expected" />
          <Check text="Orchestrator validation pending" />

          <Link
            href="/builder"
            style={{
              display: "block",
              marginTop: 28,
              background: "#075985",
              color: "white",
              padding: "14px 18px",
              borderRadius: 12,
              textAlign: "center",
              fontWeight: 800,
            }}
          >
            Add to solution
          </Link>
        </div>
      </section>
    </div>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: 14, padding: 16 }}>
      <div style={{ color: "#667085", fontSize: 13 }}>{title}</div>
      <strong>{value}</strong>
    </div>
  );
}

function ContractRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: 14, borderRadius: 12, background: "#f8fafc", marginTop: 12 }}>
      <strong>{label}</strong>
      <span style={{ color: "#526173" }}>{value}</span>
    </div>
  );
}

function Check({ text }: { text: string }) {
  return (
    <div style={{ padding: 12, borderRadius: 12, background: "#ecfdf3", color: "#067647", fontWeight: 700, marginTop: 12 }}>
      ✓ {text}
    </div>
  );
}
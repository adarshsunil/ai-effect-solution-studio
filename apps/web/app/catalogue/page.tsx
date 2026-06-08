async function getServices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load services");
  }

  return res.json();
}

export default async function CataloguePage() {
  const services = await getServices();

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
        <div>
          <span className="badge">Service Marketplace</span>
          <h1 style={{ fontSize: 40, marginBottom: 8 }}>Discover AI-EFFECT services</h1>
          <p style={{ color: "#526173", fontSize: 17 }}>
            Browse trusted, Dockerized AI services published by AI-EFFECT nodes.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginTop: 28,
        }}
      >
        {services.map((service: any) => (
          <div className="card" key={service.id} style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span className="badge">{service.trust_badge}</span>
              <span style={{ color: "#667085", fontSize: 13 }}>v{service.version}</span>
            </div>

            <h2 style={{ marginBottom: 8 }}>{service.name}</h2>

            <p style={{ color: "#526173", lineHeight: 1.6, minHeight: 78 }}>
              {service.description}
            </p>

            <div style={{ display: "grid", gap: 8, marginTop: 18, fontSize: 14 }}>
              <div><strong>Provider:</strong> {service.provider}</div>
              <div><strong>Category:</strong> {service.category}</div>
              <div><strong>Input:</strong> {service.input_type}</div>
              <div><strong>Output:</strong> {service.output_type}</div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <a
                href={`/catalogue/${service.id}`}
                style={{
                  background: "#075985",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontWeight: 700,
                }}
              >
                View details
              </a>
              <a
                href="/builder"
                style={{
                  border: "1px solid #bae6fd",
                  color: "#075985",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontWeight: 700,
                }}
              >
                Add to solution
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
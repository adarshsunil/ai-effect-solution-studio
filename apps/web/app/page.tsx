import Link from "next/link";

const stats = [
  ["Services", "12", "Validated and draft AI services"],
  ["Providers", "5", "AI-EFFECT nodes onboarding services"],
  ["Workflows", "8", "Solution drafts and deployments"],
  ["Trust checks", "24", "Interface and metadata validations"],
];

const journeys = [
  {
    title: "For nodes",
    text: "Publish Dockerized AI services using guided metadata, interface validation, and governance approval.",
    href: "/publish",
    cta: "Publish my service",
  },
  {
    title: "For AI vendors",
    text: "Discover trusted services, compose them visually, validate compatibility, and deploy AI solutions.",
    href: "/builder",
    cta: "Build a solution",
  },
  {
    title: "For TEF operators",
    text: "Review services, assign trust badges, monitor executions, and maintain platform governance.",
    href: "/admin",
    cta: "Review platform",
  },
];

export default function Page() {
  return (
    <div className="page">
      <section
        className="card"
        style={{
          padding: 40,
          background: "linear-gradient(135deg, #ffffff 0%, #eaf4ff 100%)",
        }}
      >
        <span className="badge">AI-EFFECT Web Portal</span>
        <h1 style={{ fontSize: 48, lineHeight: 1.05, maxWidth: 900, marginBottom: 16 }}>
          Build trusted energy AI solutions from validated service building blocks.
        </h1>
        <p style={{ fontSize: 18, color: "#526173", maxWidth: 760, lineHeight: 1.7 }}>
          A marketplace and visual workflow studio for node providers, AI vendors, and TEF
          operators, built on top of the AI-EFFECT WP3 orchestrator.
        </p>

        <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
          <Link
            href="/catalogue"
            style={{
              background: "#075985",
              color: "white",
              padding: "14px 18px",
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            Explore catalogue
          </Link>
          <Link
            href="/publish"
            style={{
              background: "white",
              color: "#075985",
              padding: "14px 18px",
              borderRadius: 12,
              fontWeight: 700,
              border: "1px solid #bae6fd",
            }}
          >
            Publish my service
          </Link>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 18,
          marginTop: 24,
        }}
      >
        {stats.map(([label, value, text]) => (
          <div className="card" key={label} style={{ padding: 22 }}>
            <div style={{ color: "#667085", fontSize: 14 }}>{label}</div>
            <div style={{ fontSize: 34, fontWeight: 800, marginTop: 8 }}>{value}</div>
            <div style={{ color: "#667085", fontSize: 13, marginTop: 8 }}>{text}</div>
          </div>
        ))}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
          marginTop: 24,
        }}
      >
        {journeys.map((item) => (
          <div className="card" key={item.title} style={{ padding: 26 }}>
            <h2 style={{ marginTop: 0 }}>{item.title}</h2>
            <p style={{ color: "#526173", lineHeight: 1.6 }}>{item.text}</p>
            <Link href={item.href} style={{ color: "#075985", fontWeight: 800 }}>
              {item.cta} →
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
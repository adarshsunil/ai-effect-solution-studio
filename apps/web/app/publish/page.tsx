"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  "Service profile",
  "Interface contract",
  "Deployment details",
  "Review & submit",
];

export default function PublishServicePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    provider: "",
    category: "",
    version: "0.1.0",
    description: "",
    input_type: "",
    output_type: "",
    docker_image: "",
    health_endpoint: "/health",
    execute_endpoint: "/control/execute",
  });

  function updateField(field: string, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitService() {
    setSubmitting(true);

    const apiBaseUrl =
      process.env.NEXT_PUBLIC_BROWSER_API_BASE_URL || "http://localhost:18080";

    const res = await fetch(`${apiBaseUrl}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        provider: form.provider,
        category: form.category,
        version: form.version,
        description: form.description,
        input_type: form.input_type,
        output_type: form.output_type,
      }),
    });

    setSubmitting(false);

    if (!res.ok) {
      alert("Failed to publish service. Please check the fields and try again.");
      return;
    }

    router.push("/catalogue");
  }

  return (
    <div className="page">
      <span className="badge">Node Provider Onboarding</span>
      <h1 style={{ fontSize: 40, marginBottom: 8 }}>Publish my service</h1>
      <p style={{ color: "#526173", fontSize: 17, maxWidth: 850 }}>
        Add a Dockerized AI service to the AI-EFFECT marketplace through a guided workflow.
        The service will be submitted for review before becoming fully validated.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, marginTop: 28 }}>
        <aside className="card" style={{ padding: 20 }}>
          {steps.map((label, index) => (
            <div
              key={label}
              style={{
                padding: 14,
                borderRadius: 12,
                marginBottom: 10,
                background: index === step ? "#e0f2fe" : "#f8fafc",
                color: index === step ? "#075985" : "#526173",
                fontWeight: index === step ? 800 : 600,
              }}
            >
              {index + 1}. {label}
            </div>
          ))}
        </aside>

        <main className="card" style={{ padding: 30 }}>
          {step === 0 && (
            <section>
              <h2>Service profile</h2>
              <p style={{ color: "#667085" }}>
                Describe the business and technical purpose of the service.
              </p>

              <Field label="Service name" value={form.name} onChange={(v) => updateField("name", v)} />
              <Field label="Provider / Node" value={form.provider} onChange={(v) => updateField("provider", v)} />
              <Field label="Category" value={form.category} onChange={(v) => updateField("category", v)} />
              <Field label="Version" value={form.version} onChange={(v) => updateField("version", v)} />
              <TextArea label="Description" value={form.description} onChange={(v) => updateField("description", v)} />
            </section>
          )}

          {step === 1 && (
            <section>
              <h2>Interface contract</h2>
              <p style={{ color: "#667085" }}>
                Define what the service consumes and produces. This is later used for workflow compatibility validation.
              </p>

              <Field
                label="Input type"
                value={form.input_type}
                placeholder="Example: Time-series DataReference"
                onChange={(v) => updateField("input_type", v)}
              />
              <Field
                label="Output type"
                value={form.output_type}
                placeholder="Example: Forecast DataReference"
                onChange={(v) => updateField("output_type", v)}
              />

              <div style={{ marginTop: 20, padding: 18, borderRadius: 14, background: "#f8fafc" }}>
                <strong>Expected AI-EFFECT control interface</strong>
                <p style={{ color: "#667085", lineHeight: 1.6 }}>
                  Published services are expected to expose health, execute, status, and output endpoints compatible
                  with the WP3 orchestrator service-control contract.
                </p>
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h2>Deployment details</h2>
              <p style={{ color: "#667085" }}>
                These fields prepare the service for future orchestrator validation. They are not yet submitted in v1.
              </p>

              <Field
                label="Docker image"
                value={form.docker_image}
                placeholder="Example: registry.example.eu/grid-forecasting:1.0.0"
                onChange={(v) => updateField("docker_image", v)}
              />
              <Field
                label="Health endpoint"
                value={form.health_endpoint}
                onChange={(v) => updateField("health_endpoint", v)}
              />
              <Field
                label="Execute endpoint"
                value={form.execute_endpoint}
                onChange={(v) => updateField("execute_endpoint", v)}
              />

              <div style={{ marginTop: 20, padding: 18, borderRadius: 14, background: "#fff7ed" }}>
                <strong>Coming next</strong>
                <p style={{ color: "#9a3412", lineHeight: 1.6 }}>
                  In the next milestone, this wizard will validate Docker metadata and generate orchestrator-compatible
                  service registration payloads.
                </p>
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h2>Review & submit</h2>
              <p style={{ color: "#667085" }}>
                Review the service before submitting it to the AI-EFFECT marketplace governance queue.
              </p>

              <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                <Review label="Service name" value={form.name} />
                <Review label="Provider" value={form.provider} />
                <Review label="Category" value={form.category} />
                <Review label="Version" value={form.version} />
                <Review label="Input type" value={form.input_type} />
                <Review label="Output type" value={form.output_type} />
                <Review label="Docker image" value={form.docker_image || "Not provided yet"} />
              </div>

              <button
                onClick={submitService}
                disabled={submitting}
                style={{
                  marginTop: 28,
                  background: "#075985",
                  color: "white",
                  padding: "14px 18px",
                  borderRadius: 12,
                  border: "none",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                {submitting ? "Submitting..." : "Submit for review"}
              </button>
            </section>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 34 }}>
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              style={secondaryButton}
            >
              Back
            </button>

            {step < steps.length - 1 && (
              <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} style={primaryButton}>
                Continue
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label style={{ display: "grid", gap: 8, marginTop: 18 }}>
      <span style={{ fontWeight: 800 }}>{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: 14,
          borderRadius: 12,
          border: "1px solid #d6dee9",
          background: "white",
        }}
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label style={{ display: "grid", gap: 8, marginTop: 18 }}>
      <span style={{ fontWeight: 800 }}>{label}</span>
      <textarea
        value={value}
        rows={5}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: 14,
          borderRadius: 12,
          border: "1px solid #d6dee9",
          background: "white",
          resize: "vertical",
        }}
      />
    </label>
  );
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: 14, borderRadius: 12, background: "#f8fafc" }}>
      <strong>{label}</strong>
      <span style={{ color: "#526173" }}>{value}</span>
    </div>
  );
}

const primaryButton = {
  background: "#075985",
  color: "white",
  padding: "12px 16px",
  borderRadius: 12,
  border: "none",
  fontWeight: 800,
  cursor: "pointer",
};

const secondaryButton = {
  background: "white",
  color: "#075985",
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid #bae6fd",
  fontWeight: 800,
  cursor: "pointer",
};
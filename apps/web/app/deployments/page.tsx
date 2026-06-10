"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Deployment = {
  workflow_id: string;
  status: string;
  name: string;
  created_at: string;
};

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ai-effect-deployments") || "[]");
    setDeployments(saved);
  }, []);

  return (
    <div className="page">
      <span className="badge">Execution Monitoring</span>
      <h1 style={{ fontSize: 40, marginBottom: 8 }}>Deployments</h1>
      <p style={{ color: "#526173", fontSize: 17 }}>
        Track workflows submitted from Solution Studio to the WP3 orchestrator.
      </p>

      <div className="card" style={{ marginTop: 28, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f8fafc" }}>
            <tr>
              <Th>Name</Th>
              <Th>Workflow ID</Th>
              <Th>Status</Th>
              <Th>Created</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {deployments.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 24, color: "#667085" }}>
                  No deployments yet. Submit a workflow from the Builder.
                </td>
              </tr>
            )}

            {deployments.map((deployment) => (
              <tr key={deployment.workflow_id} style={{ borderTop: "1px solid #e4e9f2" }}>
                <Td>{deployment.name}</Td>
                <Td>{deployment.workflow_id}</Td>
                <Td>
                  <span className="badge">{deployment.status}</span>
                </Td>
                <Td>{new Date(deployment.created_at).toLocaleString()}</Td>
                <Td>
                  <Link
                    href={`/deployments/${deployment.workflow_id}`}
                    style={{ color: "#075985", fontWeight: 800 }}
                  >
                    View →
                  </Link>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ textAlign: "left", padding: 16 }}>{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: 16, color: "#344054" }}>{children}</td>;
}
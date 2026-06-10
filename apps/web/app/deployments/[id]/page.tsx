"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DeploymentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [workflowId, setWorkflowId] = useState("");
  const [workflow, setWorkflow] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const { id } = await params;
      setWorkflowId(id);

      try {
        const workflowRes = await fetch(`http://localhost:18080/orchestrator/workflows/${id}`);
        const workflowData = await workflowRes.json();
        setWorkflow(workflowData);

        const tasksRes = await fetch(`http://localhost:18080/orchestrator/workflows/${id}/tasks`);
        const tasksData = await tasksRes.json();
        setTasks(tasksData.tasks || []);
      } catch {
        setError("Failed to load deployment details.");
      }
    }

    load();
  }, [params]);

  return (
    <div className="page">
      <Link href="/deployments" style={{ color: "#075985", fontWeight: 800 }}>
        ← Back to deployments
      </Link>

      <section className="card" style={{ padding: 30, marginTop: 20 }}>
        <span className="badge">WP3 Orchestrator Deployment</span>
        <h1 style={{ fontSize: 40 }}>Workflow {workflowId}</h1>

        {error && <p style={{ color: "#b42318" }}>{error}</p>}

        {workflow && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            <Info label="Status" value={workflow.status} />
            <Info label="Created" value={workflow.created_at || "-"} />
            <Info label="Updated" value={workflow.updated_at || "-"} />
            <Info label="Error" value={workflow.error || "None"} />
          </div>
        )}
      </section>

      <section className="card" style={{ padding: 30, marginTop: 20 }}>
        <h2>Tasks</h2>

        <div style={{ display: "grid", gap: 12 }}>
          {tasks.map((task: any) => (
            <div
              key={task.task_id}
              style={{
                padding: 16,
                borderRadius: 14,
                background: task.status === "completed" ? "#ecfdf3" : "#f8fafc",
              }}
            >
              <strong>{task.node_key}</strong>
              <div style={{ color: "#526173", marginTop: 6 }}>
                Task ID: {task.task_id}
              </div>
              <div style={{ marginTop: 8 }}>
                <span className="badge">{task.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "#f8fafc", padding: 16, borderRadius: 14 }}>
      <div style={{ color: "#667085", fontSize: 13 }}>{label}</div>
      <strong>{value}</strong>
    </div>
  );
}
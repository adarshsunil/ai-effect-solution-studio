"use client";

import { useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type Service = {
  id: string;
  name: string;
  provider: string;
  category: string;
  version: string;
  input_type: string;
  output_type: string;
  trust_badge: string;
};

export default function BuilderPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([
    {
      id: "input",
      position: { x: 120, y: 180 },
      data: { label: "Workflow Input" },
      type: "input",
    },
    {
      id: "output",
      position: { x: 760, y: 180 },
      data: { label: "Workflow Output" },
      type: "output",
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    fetch("http://localhost:18080/services")
      .then((res) => res.json())
      .then(setServices)
      .catch(() => setServices([]));
  }, []);

  function onConnect(connection: Connection) {
    setEdges((eds) => addEdge(connection, eds));
  }

  function addServiceToCanvas(service: Service) {
    const nodeId = `service-${service.id}-${Date.now()}`;

    setNodes((existing) => [
      ...existing,
      {
        id: nodeId,
        position: {
          x: 360 + Math.random() * 120,
          y: 120 + Math.random() * 180,
        },
        data: {
          label: service.name,
          service,
        },
      },
    ]);
  }

  function validateWorkflow() {
    const serviceNodes = nodes.filter((node) => node.id.startsWith("service-"));

    if (serviceNodes.length === 0) {
      alert("Add at least one service to the workflow.");
      return;
    }

    alert(
      `Workflow draft contains ${serviceNodes.length} service node(s) and ${edges.length} connection(s). Compatibility validation comes next.`
    );
  }

  return (
    <div className="page">
      <span className="badge">AI Vendor Studio</span>
      <h1 style={{ fontSize: 40, marginBottom: 8 }}>Build a solution</h1>
      <p style={{ color: "#526173", fontSize: 17, maxWidth: 900 }}>
        Compose AI-EFFECT services visually. Add services from the catalogue, connect them into a
        workflow, and prepare the solution for orchestrator deployment.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr 320px",
          gap: 18,
          height: "680px",
          marginTop: 28,
        }}
      >
        <aside className="card" style={{ padding: 18, overflow: "auto" }}>
          <h2 style={{ marginTop: 0 }}>Available services</h2>
          <p style={{ color: "#667085", fontSize: 14 }}>
            Click a service to add it to the workflow canvas.
          </p>

          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => addServiceToCanvas(service)}
                style={{
                  textAlign: "left",
                  padding: 14,
                  borderRadius: 14,
                  border: "1px solid #d6dee9",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                <strong>{service.name}</strong>
                <div style={{ color: "#667085", fontSize: 13, marginTop: 6 }}>
                  {service.provider}
                </div>
                <div style={{ marginTop: 8 }}>
                  <span className="badge">{service.trust_badge}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <main className="card" style={{ overflow: "hidden" }}>
          <div
            style={{
              height: 56,
              borderBottom: "1px solid #e4e9f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 18px",
            }}
          >
            <strong>Workflow canvas</strong>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={validateWorkflow} style={primaryButton}>
                Validate workflow
              </button>
              <button style={secondaryButton}>Save draft</button>
            </div>
          </div>

          <div style={{ height: "624px" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={(_, node) => {
                const service = node.data?.service as Service | undefined;
                setSelectedService(service || null);
              }}
              fitView
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </main>

        <aside className="card" style={{ padding: 18 }}>
          <h2 style={{ marginTop: 0 }}>Node details</h2>

          {!selectedService && (
            <p style={{ color: "#667085", lineHeight: 1.6 }}>
              Select a service node on the canvas to inspect its provider, interface, and trust
              status.
            </p>
          )}

          {selectedService && (
            <div style={{ display: "grid", gap: 12 }}>
              <span className="badge">{selectedService.trust_badge}</span>
              <h3 style={{ marginBottom: 0 }}>{selectedService.name}</h3>
              <Info label="Provider" value={selectedService.provider} />
              <Info label="Category" value={selectedService.category} />
              <Info label="Version" value={`v${selectedService.version}`} />
              <Info label="Input" value={selectedService.input_type} />
              <Info label="Output" value={selectedService.output_type} />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: "#f8fafc", padding: 12, borderRadius: 12 }}>
      <div style={{ color: "#667085", fontSize: 13 }}>{label}</div>
      <strong>{value}</strong>
    </div>
  );
}

const primaryButton = {
  background: "#075985",
  color: "white",
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  fontWeight: 800,
  cursor: "pointer",
};

const secondaryButton = {
  background: "white",
  color: "#075985",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #bae6fd",
  fontWeight: 800,
  cursor: "pointer",
};
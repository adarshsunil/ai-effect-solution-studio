from app.schemas.workflow_submit import WorkflowSubmitRequest


def compile_to_wp3_payload(workflow: WorkflowSubmitRequest):
    connected_by_source = {}

    for edge in workflow.edges:
        connected_by_source.setdefault(edge.source, []).append(edge.target)

    nodes_by_id = {node.node_id: node for node in workflow.nodes}

    blueprint_nodes = []

    for node in workflow.nodes:
        connected_to = []

        for target_id in connected_by_source.get(node.node_id, []):
            target = nodes_by_id.get(target_id)
            if not target:
                continue

            connected_to.append({
                "container_name": target.container_name,
                "operation_signature": {
                    "operation_name": target.operation_name
                }
            })

        blueprint_nodes.append({
            "container_name": node.container_name,
            "proto_uri": node.proto_uri,
            "image": node.image,
            "node_type": node.node_type,
            "operation_signature_list": [{
                "operation_signature": {
                    "operation_name": node.operation_name,
                    "input_message_name": node.input_message_name,
                    "output_message_name": node.output_message_name,
                },
                "connected_to": connected_to,
            }],
        })

    docker_info_list = [
        {
            "container_name": node.container_name,
            "ip_address": node.internal_host or node.container_name,
            "port": node.internal_port,
        }
        for node in workflow.nodes
    ]

    return {
        "blueprint": {
            "name": workflow.name,
            "pipeline_id": "solution-studio-generated",
            "creation_date": "2026-01-01",
            "type": "pipeline-topology/v2",
            "version": "2.0",
            "nodes": blueprint_nodes,
        },
        "dockerinfo": {
            "docker_info_list": docker_info_list
        }
    }
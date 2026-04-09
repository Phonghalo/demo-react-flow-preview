import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type OnSelectionChangeParams,
} from "@xyflow/react";
import { useCallback, useMemo, useState } from "react";
import { FlowPreviewImage } from "react-flow-preview/client-image";
import {
  type DemoLabelsPartial,
  defaultDemoLabels,
  mergeDemoLabels,
} from "./demoLabels";
import { demoNodeTypes } from "./demoNodes";
import "./App.css";

const NPM_PKG = "https://www.npmjs.com/package/react-flow-preview";

const PREVIEW_WIDTH = 520;
const PREVIEW_HEIGHT = 380;

const INITIAL_EDGES: Edge[] = [
  { id: "e1", source: "n1", target: "n2" },
  { id: "e2", source: "n1", target: "n3" },
  { id: "e3", source: "n2", target: "n4" },
  { id: "e4", source: "n3", target: "n4" },
];

function createInitialNodes(
  nodeLabels: (typeof defaultDemoLabels)["initialNodeLabels"],
): Node[] {
  return [
    {
      id: "n1",
      type: "demoInput",
      position: { x: 40, y: 60 },
      data: { label: nodeLabels.input },
      width: 152,
      height: 50,
    },
    {
      id: "n2",
      type: "demoTask",
      position: { x: 260, y: 36 },
      data: { label: nodeLabels.process },
      width: 162,
      height: 56,
    },
    {
      id: "n3",
      type: "demoTask",
      position: { x: 240, y: 150 },
      data: { label: nodeLabels.branch },
      width: 162,
      height: 56,
    },
    {
      id: "n4",
      type: "demoOutput",
      position: { x: 460, y: 92 },
      data: { label: nodeLabels.output },
      width: 152,
      height: 50,
    },
  ];
}

function nextNodeId(existing: Node[]): string {
  const max = existing.reduce((acc, n) => {
    const m = /^n(\d+)$/.exec(n.id);
    return m ? Math.max(acc, Number(m[1])) : acc;
  }, 0);
  return `n${max + 1}`;
}

export interface AppProps {
  /** Override any UI copy; merge with `defaultDemoLabels` from `./demoLabels`. */
  labels?: DemoLabelsPartial;
}

export function App({ labels: labelsProp }: AppProps = {}) {
  const labels = useMemo(
    () => (labelsProp ? mergeDemoLabels(labelsProp) : defaultDemoLabels),
    [labelsProp],
  );

  const [nodes, setNodes] = useState<Node[]>(() =>
    createInitialNodes(
      labelsProp
        ? mergeDemoLabels(labelsProp).initialNodeLabels
        : defaultDemoLabels.initialNodeLabels,
    ),
  );
  const [edges, setEdges] = useState<Edge[]>(INITIAL_EDGES);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const onSelectionChange = useCallback((p: OnSelectionChangeParams) => {
    setSelectedIds(p.nodes.map((n) => n.id));
  }, []);

  const selectedNode = useMemo(() => {
    if (selectedIds.length !== 1) return undefined;
    return nodes.find((n) => n.id === selectedIds[0]);
  }, [nodes, selectedIds]);

  const updateSelectedLabel = useCallback(
    (label: string) => {
      const id = selectedIds[0];
      if (!id) return;
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, label } } : n,
        ),
      );
    },
    [selectedIds],
  );

  const addNode = useCallback(() => {
    setNodes((nds) => {
      const id = nextNodeId(nds);
      return [
        ...nds,
        {
          id,
          type: "demoTask",
          position: {
            x: 80 + Math.random() * 180,
            y: 80 + Math.random() * 160,
          },
          data: { label: `Task ${id}` },
          width: 162,
          height: 56,
        },
      ];
    });
  }, []);

  const reset = useCallback(() => {
    setNodes(createInitialNodes(labels.initialNodeLabels));
    setEdges(INITIAL_EDGES);
    setSelectedIds([]);
  }, [labels.initialNodeLabels]);

  const previewFitViewOptions = useMemo(() => ({ padding: 0.12 as const }), []);

  const edgeDefaults = useMemo(
    () =>
      ({
        style: { stroke: "#94a3b8", strokeWidth: 2 },
        zIndex: 2,
      }) as const,
    [],
  );

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>{labels.appTitle}</h1>
        <div className="app-header-actions">
          <span className="hint">{labels.headerHint}</span>
          <a href={NPM_PKG} target="_blank" rel="noreferrer">
            {labels.npmLinkLabel}
          </a>
        </div>
      </header>

      <main className="app-main">
        <section className="pane" aria-label={labels.editorAriaLabel}>
          <div className="pane-head">
            <div className="pane-title">
              <span className="pane-dot pane-dot--editor" aria-hidden />
              {labels.editorPaneTitle}
            </div>
            <div className="app-header-actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={addNode}
              >
                {labels.addNodeButton}
              </button>
              <button type="button" className="btn" onClick={reset}>
                {labels.resetButton}
              </button>
            </div>
          </div>
          <div className="pane-body">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={demoNodeTypes}
              colorMode="dark"
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onSelectionChange={onSelectionChange}
              fitView
              fitViewOptions={{ padding: 0.15 }}
              minZoom={0.2}
              maxZoom={1.5}
              defaultEdgeOptions={edgeDefaults}
            >
              <Background variant={BackgroundVariant.Dots} gap={14} size={1} />
              <Controls />
              <MiniMap
                style={{ background: "var(--surface-2)" }}
                maskColor="rgba(15, 20, 25, 0.62)"
                nodeColor={(n) => {
                  if (n.type === "demoInput") return "#22c55e";
                  if (n.type === "demoOutput") return "#f59e0b";
                  return "#7c3aed";
                }}
              />
              <Panel position="top-left">
                <div className="panel-card">
                  <p className="panel-card__note">{labels.customNodesNote}</p>
                  {selectedNode ? (
                    <>
                      <label htmlFor="node-label">
                        {labels.nodeLabelCaption(selectedNode.id)}
                      </label>
                      <input
                        id="node-label"
                        type="text"
                        value={String(selectedNode.data.label ?? "")}
                        onChange={(e) => updateSelectedLabel(e.target.value)}
                        autoComplete="off"
                      />
                    </>
                  ) : (
                    <p>
                      {selectedIds.length > 1
                        ? labels.multiSelectHint(selectedIds.length)
                        : labels.selectOneNodeHint}
                    </p>
                  )}
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </section>

        <section className="pane" aria-label={labels.previewAriaLabel}>
          <div className="pane-head">
            <div className="pane-title">
              <span className="pane-dot pane-dot--preview" aria-hidden />
              {labels.previewPaneTitle}
            </div>
            <span className="hint" style={{ maxWidth: "none" }}>
              {labels.previewHint}
            </span>
          </div>
          <div className="pane-body preview-frame">
            <div className="preview-surface preview-surface--image">
              <FlowPreviewImage
                nodes={nodes}
                edges={edges}
                nodeTypes={demoNodeTypes}
                width={PREVIEW_WIDTH}
                height={PREVIEW_HEIGHT}
                fitView
                fitViewOptions={previewFitViewOptions}
                colorMode="dark"
                background={false}
                minZoom={0.05}
                maxZoom={2}
                defaultEdgeOptions={edgeDefaults}
                pixelRatio={2}
                captureDelayMs={220}
                placeholder={
                  <span className="preview-loading">
                    {labels.generatingPreview}
                  </span>
                }
                imgProps={{
                  className: "preview-img",
                  alt: labels.previewImageAlt,
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

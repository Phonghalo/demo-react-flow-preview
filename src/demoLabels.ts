/**
 * All user-visible strings for the demo (English).
 * Override via `<App labels={{ ... }} />` or edit this file.
 */
export interface DemoLabels {
  appTitle: string;
  headerHint: string;
  npmLinkLabel: string;
  editorAriaLabel: string;
  editorPaneTitle: string;
  addNodeButton: string;
  resetButton: string;
  previewAriaLabel: string;
  previewPaneTitle: string;
  previewHint: string;
  nodeLabelCaption: (nodeId: string) => string;
  selectOneNodeHint: string;
  multiSelectHint: (count: number) => string;
  generatingPreview: string;
  previewImageAlt: string;
  /** Short note in the editor panel about custom node registration. */
  customNodesNote: string;
  initialNodeLabels: {
    input: string;
    process: string;
    branch: string;
    output: string;
  };
}

export const defaultDemoLabels: DemoLabels = {
  appTitle: "demo-react-flow-preview",
  headerHint:
    "Edit the graph on the left (drag nodes, connect edges, change labels). Nodes use custom React components (demoInput / demoTask / demoOutput). The right panel is a static PNG from FlowPreviewImage using the same nodeTypes map.",
  npmLinkLabel: "react-flow-preview on npm →",
  editorAriaLabel: "Editor",
  editorPaneTitle: "Editor — interactive React Flow",
  addNodeButton: "+ Add node",
  resetButton: "Reset",
  previewAriaLabel: "Preview",
  previewPaneTitle: "Preview — FlowPreviewImage (client-image)",
  previewHint:
    "FlowPreviewImage rasterizes the same nodes, edges, and nodeTypes as the editor (custom nodes must set explicit width/height for reliable layout).",
  nodeLabelCaption: (nodeId) => `Node label (${nodeId})`,
  selectOneNodeHint: "Select one node to edit its label.",
  multiSelectHint: (count) =>
    `${count} nodes selected — select a single node to edit its label.`,
  generatingPreview: "Generating preview image…",
  previewImageAlt: "Static raster preview of the React Flow graph",
  customNodesNote:
    "Custom types: demoInput · demoTask · demoOutput (see src/demoNodes.tsx). Pass the same nodeTypes to FlowPreviewImage.",
  initialNodeLabels: {
    input: "Input",
    process: "Process",
    branch: "Branch",
    output: "Output",
  },
};

export type DemoLabelsPartial = {
  [K in keyof DemoLabels]?: DemoLabels[K] extends (...args: infer A) => infer R
    ? (...args: A) => R
    : DemoLabels[K];
};

export function mergeDemoLabels(overrides?: DemoLabelsPartial): DemoLabels {
  if (!overrides) {
    return defaultDemoLabels;
  }
  return {
    ...defaultDemoLabels,
    ...overrides,
    initialNodeLabels: {
      ...defaultDemoLabels.initialNodeLabels,
      ...overrides.initialNodeLabels,
    },
  };
}

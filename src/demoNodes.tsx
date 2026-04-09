import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { NodeTypes } from "@xyflow/react";
import "./demoNodes.css";

export type DemoNodeData = {
  label: string;
};

type DemoInput = Node<DemoNodeData, "demoInput">;
type DemoTask = Node<DemoNodeData, "demoTask">;
type DemoOutput = Node<DemoNodeData, "demoOutput">;

function cx(base: string, selected: boolean, extra?: string) {
  return [base, selected ? `${base}--selected` : "", extra].filter(Boolean).join(" ");
}

/** Entry node — source only (bottom). */
export function DemoInputNode({ data, selected }: NodeProps<DemoInput>) {
  return (
    <div className={cx("demo-node demo-node--input", !!selected)}>
      <div className="demo-node__accent demo-node__accent--input" aria-hidden />
      <div className="demo-node__main">
        <span className="demo-node__badge">INPUT</span>
        <span className="demo-node__label">{String(data.label ?? "")}</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="demo-node__handle"
      />
    </div>
  );
}

/** Middle / branch node — target top, source bottom. */
export function DemoTaskNode({ data, selected }: NodeProps<DemoTask>) {
  return (
    <div className={cx("demo-node demo-node--task", !!selected)}>
      <Handle
        type="target"
        position={Position.Top}
        className="demo-node__handle"
      />
      <div className="demo-node__accent demo-node__accent--task" aria-hidden />
      <div className="demo-node__main">
        <span className="demo-node__badge">TASK</span>
        <span className="demo-node__label">{String(data.label ?? "")}</span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="demo-node__handle"
      />
    </div>
  );
}

/** Sink node — target only (top). */
export function DemoOutputNode({ data, selected }: NodeProps<DemoOutput>) {
  return (
    <div className={cx("demo-node demo-node--output", !!selected)}>
      <Handle
        type="target"
        position={Position.Top}
        className="demo-node__handle"
      />
      <div className="demo-node__accent demo-node__accent--output" aria-hidden />
      <div className="demo-node__main">
        <span className="demo-node__badge">OUTPUT</span>
        <span className="demo-node__label">{String(data.label ?? "")}</span>
      </div>
    </div>
  );
}

/**
 * Pass this object to both `<ReactFlow nodeTypes={...} />` and
 * `<FlowPreviewImage nodeTypes={...} />` so the raster matches the editor.
 */
export const demoNodeTypes = {
  demoInput: DemoInputNode,
  demoTask: DemoTaskNode,
  demoOutput: DemoOutputNode,
} as const satisfies NodeTypes;

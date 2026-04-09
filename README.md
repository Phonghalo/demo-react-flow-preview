# demo-react-flow-preview

Ứng dụng Vite + React minh họa [`react-flow-preview`](https://www.npmjs.com/package/react-flow-preview): **bên trái** React Flow tương tác với **custom nodes** (`demoInput`, `demoTask`, `demoOutput` trong `src/demoNodes.tsx`); **bên phải** ảnh tĩnh qua **`FlowPreviewImage`** (`react-flow-preview/client-image`) với **cùng `nodeTypes`**. Mỗi node có `width` / `height` cố định (khuyến nghị cho SSR và snapshot).

Dependency: **`react-flow-preview`** lấy từ npm (semver `^0.2.1` trong `package.json`).

## Chạy local

```bash
cd demo-react-flow-preview
npm install
npm run dev
```

Mở http://localhost:5173

### Phát triển song song với bản clone lib

Nếu cần trỏ lại thư mục local:

```json
"react-flow-preview": "file:../react-flow-preview"
```

rồi `npm install`.

### Copy (English) & overrides

All UI strings live in **`src/demoLabels.ts`** (`defaultDemoLabels`). You can also pass partial overrides from `main.tsx`:

```tsx
<App labels={{ appTitle: 'My workflow demo', headerHint: '…' }} />
```

Or override only initial node titles via `labels.initialNodeLabels`.

## Scripts

| Lệnh           | Mô tả        |
|----------------|-------------|
| `npm run dev`  | Vite dev    |
| `npm run build`| Production  |
| `npm run preview` | Xem bản build |

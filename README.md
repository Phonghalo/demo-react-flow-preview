# demo-react-flow-preview

Ứng dụng Vite + React minh họa [`react-flow-preview`](https://www.npmjs.com/package/react-flow-preview): **bên trái** React Flow tương tác với **custom nodes** (`demoInput`, `demoTask`, `demoOutput` trong `src/demoNodes.tsx`); **bên phải** ảnh tĩnh qua **`FlowPreviewImage`** (`react-flow-preview/client-image`) với **cùng `nodeTypes`**. Mỗi node có `width` / `height` cố định (khuyến nghị cho SSR và snapshot).

Dependency: **`react-flow-preview`** lấy từ npm (semver `^0.2.3` trong `package.json`).

## Chạy local

```bash
cd demo-react-flow-preview
npm install
npm run dev
```

Mở http://localhost:5173

## CodeSandbox (cloud)

Repo includes **`.codesandbox/tasks.json`** so CodeSandbox can run `npm install` and start Vite on **port 5173** with a preview.

1. Push these changes to GitHub.
2. Open a **Devbox** from the repo:  
   **[Open in CodeSandbox](https://codesandbox.io/p/github/Phonghalo/demo-react-flow-preview)**  
   (replace `Phonghalo/demo-react-flow-preview` if you fork under another account.)
3. Wait for install; the **dev** task should start automatically. Preview uses the same port as `vite.config.ts` (`host: true`, `PORT` or `5173`).

**Import note:** `vite.config.ts` aliases `react-flow-preview/client-image` to `dist/client-image.js`, and `tsconfig.json` maps types to `client-image.d.ts`, so CodeSandbox and other strict resolvers match local builds. After upgrading to a published `react-flow-preview` that documents a stable subpath, you can remove those overrides.

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

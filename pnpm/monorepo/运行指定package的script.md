例如 
pnpm --filter @webpack-examples/tree-shaking run build -w
pnpm -F @webpack-examples/tree-shaking run build -w

使用 --filter @webpack-examples/tree-shaking 限定 monorepo 中的 package，filter 支持 glob 和其他的「特殊匹配语法」


reference
- https://pnpm.io/filtering
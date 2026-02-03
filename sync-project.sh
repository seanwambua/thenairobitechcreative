#!/bin/bash

# --- Senior AI Panel: Next.js 16 & Prisma 7 Sync Utility ---
# Target: Resolve Module Resolution (2307) and Type Mismatches (2322)

echo "🚀 Initiating Next.js 16 + Prisma 7 Environment Sync..."

# 1. CLEANUP PHASE
# Senior QA: Removing stale cache and legacy Rust-engine artifacts
echo "🧹 Cleaning .next and generated artifacts..."
rm -rf .next
rm -rf generated/client
rm -rf node_modules/.prisma
rm -rf node_modules/.cache/typescript

# 2. DEPENDENCY VALIDATION
# Architect: Ensuring all Prisma packages are strictly locked to version 7
echo "📦 Checking Prisma 7 dependency alignment..."
npm list @prisma/client @prisma/adapter-pg prisma

# 3. GENERATION PHASE
# Senior Dev: Generating the Wasm-ready client to the custom directory
echo "⚙️  Generating Prisma Client..."
npx prisma generate

# 4. PATH RESOLUTION CHECK
# Senior QA: Confirming the existence of the type declarations
echo "🔍 Validating generated paths..."
if [ -f "./generated/client/index.d.ts" ]; then
    echo "✅ SUCCESS: Type definitions found in ./generated/client"
else
    echo "❌ ERROR: Generation failed. Check your schema.prisma 'output' path."
    exit 1
fi

# 5. TS SERVER RE-PRIME
# Architect: Forcing TypeScript to reload the 'paths' from tsconfig.json
echo "⌨️  Refreshing TypeScript configuration..."
touch tsconfig.json

echo "----------------------------------------------------"
echo "🎉 SYNC COMPLETE"
echo "👉 1. Restart your IDE (or Restart TS Server)."
echo "👉 2. Run 'npm run dev' to start the Next.js 16 Turbopack engine."
echo "----------------------------------------------------"
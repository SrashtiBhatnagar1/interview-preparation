# Prisma Cleanup & Reinstallation Script for Windows
# Run this in PowerShell from the tcs-bundle directory

Write-Host "`n🧹 Cleaning Prisma installation..." -ForegroundColor Cyan

# Step 1: Remove node_modules/@prisma and .prisma folders
Write-Host "`n1️⃣  Removing Prisma cache and modules..." -ForegroundColor Yellow
Remove-Item -Path "node_modules/@prisma" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules/.prisma" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".prisma" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "   ✅ Prisma folders removed" -ForegroundColor Green

# Step 2: Remove package-lock.json to force fresh resolution
Write-Host "`n2️⃣  Removing package-lock.json..." -ForegroundColor Yellow
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
Write-Host "   ✅ Lock file removed" -ForegroundColor Green

# Step 3: Clear npm cache
Write-Host "`n3️⃣  Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "   ✅ Cache cleared" -ForegroundColor Green

# Step 4: Reinstall Prisma packages
Write-Host "`n4️⃣  Reinstalling Prisma packages..." -ForegroundColor Yellow
npm install prisma@latest @prisma/client@latest --save-dev
Write-Host "   ✅ Packages installed" -ForegroundColor Green

# Step 5: Generate Prisma Client with binary targets
Write-Host "`n5️⃣  Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
Write-Host "   ✅ Client generated" -ForegroundColor Green

# Step 6: Verify engine binaries
Write-Host "`n6️⃣  Verifying engine binaries..." -ForegroundColor Yellow
$enginePaths = @(
    "node_modules/@prisma/engines/query_engine-windows.dll.node",
    "node_modules/.prisma/client/query_engine-windows.dll.node"
)

$foundEngine = $false
foreach ($path in $enginePaths) {
    if (Test-Path $path) {
        Write-Host "   ✅ Found: $path" -ForegroundColor Green
        $foundEngine = $true
    }
}

if (-not $foundEngine) {
    Write-Host "   ❌ No engine binaries found!" -ForegroundColor Red
    Write-Host "   Try running: $env:PRISMA_CLI_BINARY_TARGETS='windows'; npx prisma generate" -ForegroundColor Yellow
    exit 1
}

Write-Host "`n✨ Prisma reinstallation complete!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Verify: node scripts/verify-prisma.js"
Write-Host "   2. Migrate: npx prisma migrate dev --name init"
Write-Host ""

// Prisma Connection Verification Script
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

async function verifyPrisma() {
  console.log('🔍 Verifying Prisma installation...\n');

  // Check if engine binaries exist
  const enginePaths = [
    path.join(__dirname, '../node_modules/@prisma/engines/query_engine-windows.dll.node'),
    path.join(__dirname, '../node_modules/@prisma/engines/libquery_engine-windows.dll.node'),
    path.join(__dirname, '../node_modules/.prisma/client/query_engine-windows.dll.node'),
  ];

  console.log('📦 Checking for engine binaries:');
  let foundEngine = false;
  for (const enginePath of enginePaths) {
    const exists = fs.existsSync(enginePath);
    console.log(`   ${exists ? '✅' : '❌'} ${enginePath}`);
    if (exists) foundEngine = true;
  }

  if (!foundEngine) {
    console.error('\n❌ No query engine binaries found!');
    console.error('   Run the reinstall commands provided.\n');
    process.exit(1);
  }

  // Test Prisma Client instantiation
  console.log('\n🔌 Instantiating Prisma Client...');
  let prisma;
  try {
    prisma = new PrismaClient({
      log: ['error', 'warn'],
    });
    console.log('   ✅ Prisma Client created successfully');
  } catch (error) {
    console.error('   ❌ Failed to create Prisma Client:', error.message);
    process.exit(1);
  }

  // Test database connection
  console.log('\n🗄️  Testing database connection...');
  try {
    await prisma.$connect();
    console.log('   ✅ Database connected successfully');

    // Test a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('   ✅ Test query executed:', result);

    console.log('\n✨ All checks passed! Prisma is working correctly.\n');
  } catch (error) {
    console.error('   ❌ Database connection failed:', error.message);
    console.error('\n💡 Tips:');
    console.error('   - Check your DATABASE_URL in .env');
    console.error('   - Ensure PostgreSQL is running');
    console.error('   - Run: npx prisma migrate dev\n');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifyPrisma().catch(console.error);

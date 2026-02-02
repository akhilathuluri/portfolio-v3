#!/usr/bin/env node

/**
 * Quick Setup Script for Admin Panel
 * This script helps verify your setup
 */

const fs = require('fs');
const path = require('path');

console.log('\n🚀 Admin Panel Setup Checker\n');
console.log('=' .repeat(50));

// Check .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check for required variables
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'ADMIN_EMAIL'
  ];
  
  const missingVars = [];
  requiredVars.forEach(varName => {
    if (envContent.includes(varName) && !envContent.includes(`${varName}=your-`)) {
      console.log(`✅ ${varName} is configured`);
    } else {
      console.log(`❌ ${varName} is missing or not configured`);
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    console.log('\n⚠️  Please configure the following variables in .env.local:');
    missingVars.forEach(v => console.log(`   - ${v}`));
  }
} else {
  console.log('❌ .env.local file not found');
  console.log('   Copy .env.local.example to .env.local and configure it');
}

// Check if schema file exists
const schemaPath = path.join(__dirname, 'supabase', 'schema.sql');
if (fs.existsSync(schemaPath)) {
  console.log('✅ Database schema file exists');
} else {
  console.log('❌ Database schema file not found');
}

// Check if admin layout exists
const adminLayoutPath = path.join(__dirname, 'app', 'admin', 'layout.tsx');
if (fs.existsSync(adminLayoutPath)) {
  console.log('✅ Admin panel files installed');
} else {
  console.log('❌ Admin panel files not found');
}

console.log('\n' + '='.repeat(50));
console.log('\n📚 Next Steps:\n');
console.log('1. Create a Supabase project at https://supabase.com');
console.log('2. Run the SQL from supabase/schema.sql in SQL Editor');
console.log('3. Configure .env.local with your Supabase credentials');
console.log('4. Enable Email auth in Supabase dashboard');
console.log('5. Run: npm run dev');
console.log('6. Visit: http://localhost:3000/admin/login\n');
console.log('📖 Full guide: ADMIN_PANEL_GUIDE.md\n');

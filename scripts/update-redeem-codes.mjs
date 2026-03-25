#!/usr/bin/env node

/**
 * Last Z: Survival Shooter - Redeem Code Auto-Updater
 *
 * Sources (in priority order):
 * 1. ldshop.gg - Most reliable, structured HTML
 * 2. lootbar.gg - Secondary source for cross-validation
 *
 * Usage:
 *   node scripts/update-redeem-codes.mjs          # Dry run (show changes)
 *   node scripts/update-redeem-codes.mjs --apply   # Apply changes to JSON
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JSON_PATH = path.resolve(__dirname, '../src/data/redeem-codes.json');

// Known permanent/welcome codes that don't expire
const PERMANENT_CODES = new Set([
  'WELCOMELZX',
  'WELCOMELZFB',
  'WELCOMELZDC',
]);

async function fetchWithTimeout(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KLZGuide-CodeUpdater/1.0)',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Extract codes from ldshop.gg redeem codes page
 */
async function fetchFromLdshop() {
  const url = 'https://www.ldshop.gg/blog/last-z/last-z-survival-shooter-codes.html';
  console.log(`[ldshop] Fetching ${url}`);

  const html = await fetchWithTimeout(url);

  // Verify this is a Last Z page, not Last War
  if (!html.includes('Last Z') && !html.includes('last-z') && !html.includes('last z')) {
    throw new Error('Page does not appear to be about Last Z: Survival Shooter. Possible wrong game (Last War?).');
  }

  // Extract code patterns: alphanumeric codes typically 6-20 chars, all caps or mixed
  // ldshop.gg lists codes in <strong> or <code> tags, or in list items
  const codes = [];

  // Pattern 1: Look for common code formats (ALL_CAPS with numbers)
  const codePattern = /\b([A-Z][A-Z0-9]{5,19})\b/g;
  const matches = html.matchAll(codePattern);

  const foundCodes = new Set();
  for (const match of matches) {
    const code = match[1];
    // Filter out common false positives
    if (
      code.length >= 6 &&
      code.length <= 20 &&
      // Must contain at least one digit (real codes always have numbers or mixed patterns)
      /\d/.test(code) &&
      !code.startsWith('HTTP') &&
      !code.startsWith('HTML') &&
      !code.startsWith('UTF') &&
      !code.startsWith('CSS') &&
      !code.startsWith('URL') &&
      !code.startsWith('LDSHOP') &&
      true // end chain
      || PERMANENT_CODES.has(code) // Always allow known welcome codes
    ) {
      foundCodes.add(code);
    }
  }

  // Also try to detect expired vs active by checking surrounding context
  // Look for sections containing "active" or "expired"
  const activeSection = html.split(/expired/i)[0] || html;
  const activeCodes = new Set();
  const activeMatches = activeSection.matchAll(codePattern);
  for (const match of activeMatches) {
    if (foundCodes.has(match[1])) {
      activeCodes.add(match[1]);
    }
  }

  for (const code of foundCodes) {
    codes.push({
      code,
      isActive: activeCodes.has(code),
      source: 'ldshop',
    });
  }

  console.log(`[ldshop] Found ${codes.length} codes (${activeCodes.size} active)`);
  return codes;
}

/**
 * Extract codes from lootbar.gg
 */
async function fetchFromLootbar() {
  const url = 'https://lootbar.gg/blog/en/last-z-redeem-code.html';
  console.log(`[lootbar] Fetching ${url}`);

  try {
    const html = await fetchWithTimeout(url);

    // Verify this is a Last Z page
    if (!html.includes('Last Z') && !html.includes('last-z') && !html.includes('last z')) {
      throw new Error('Page does not appear to be about Last Z: Survival Shooter.');
    }

    const codes = [];
    const codePattern = /\b([A-Z][A-Z0-9]{5,19})\b/g;

    const foundCodes = new Set();
    const matches = html.matchAll(codePattern);
    for (const match of matches) {
      const code = match[1];
      if (
        code.length >= 6 &&
        code.length <= 20 &&
        (/\d/.test(code) || PERMANENT_CODES.has(code)) &&
        !code.startsWith('HTTP') &&
        !code.startsWith('HTML') &&
        !code.startsWith('LOOTBAR')
      ) {
        foundCodes.add(code);
      }
    }

    for (const code of foundCodes) {
      codes.push({ code, source: 'lootbar' });
    }

    console.log(`[lootbar] Found ${codes.length} codes`);
    return codes;
  } catch (err) {
    console.warn(`[lootbar] Failed: ${err.message}`);
    return [];
  }
}

/**
 * Main update logic
 */
async function main() {
  const applyChanges = process.argv.includes('--apply');

  console.log('=== Last Z Redeem Code Updater ===');
  console.log(`Mode: ${applyChanges ? 'APPLY' : 'DRY RUN'}\n`);

  // Read current data
  const currentData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  const currentCodes = new Map(currentData.codes.map((c) => [c.code, c]));

  // Fetch from sources
  let ldshopCodes, lootbarCodes;
  let scrapeSuccess = true;

  try {
    ldshopCodes = await fetchFromLdshop();
  } catch (err) {
    console.error(`[FATAL] ldshop scraping failed: ${err.message}`);
    scrapeSuccess = false;
    ldshopCodes = [];
  }

  try {
    lootbarCodes = await fetchFromLootbar();
  } catch (err) {
    console.warn(`[WARN] lootbar scraping failed: ${err.message}`);
    lootbarCodes = [];
  }

  // If primary source failed, exit with error
  if (!scrapeSuccess || ldshopCodes.length === 0) {
    console.error('\n[ERROR] Primary source (ldshop.gg) returned 0 codes.');
    console.error('Site structure may have changed. Manual verification needed.');
    process.exit(1);
  }

  // Merge active codes from all sources
  const lootbarSet = new Set(lootbarCodes.map((c) => c.code));
  const allFoundActive = new Set();

  // Add active codes from ldshop (primary)
  for (const item of ldshopCodes) {
    if (item.isActive) {
      allFoundActive.add(item.code);
    }
  }

  // Also add codes found in BOTH ldshop and lootbar (cross-validated)
  // Or codes only in lootbar that match known Last Z naming patterns (LZ prefix, WELCOME prefix, etc.)
  const ldshopSet = new Set(ldshopCodes.map((c) => c.code));
  for (const item of lootbarCodes) {
    if (
      ldshopSet.has(item.code) ||                          // Found in both sources
      item.code.startsWith('LZ') ||                        // Last Z prefix pattern
      item.code.startsWith('WELCOME') ||                   // Welcome codes
      item.code.startsWith('STARTWEEK') ||                 // Known pattern
      item.code.startsWith('MONDAY') ||                    // Known pattern
      item.code.startsWith('CELEBRATE') ||                 // Known pattern
      item.code.startsWith('GOLDBAR') ||                   // Known pattern
      item.code.startsWith('NEWWEEK') ||                   // Known pattern
      PERMANENT_CODES.has(item.code)
    ) {
      allFoundActive.add(item.code);
    }
  }

  // Always keep permanent codes active
  for (const code of PERMANENT_CODES) {
    allFoundActive.add(code);
  }

  // Determine changes
  const newCodes = [];
  const expiredCodes = [];
  const unchangedCodes = [];

  // Check for new codes
  for (const code of allFoundActive) {
    if (!currentCodes.has(code)) {
      newCodes.push(code);
    } else {
      unchangedCodes.push(code);
    }
  }

  // Check for expired codes (was active, not found in any source now)
  for (const [code, data] of currentCodes) {
    if (data.isActive && !allFoundActive.has(code) && !PERMANENT_CODES.has(code)) {
      expiredCodes.push(code);
    }
  }

  // Report
  console.log('\n=== Results ===');
  console.log(`Active codes found: ${allFoundActive.size}`);
  console.log(`New codes: ${newCodes.length}${newCodes.length > 0 ? ` (${newCodes.join(', ')})` : ''}`);
  console.log(`Expired codes: ${expiredCodes.length}${expiredCodes.length > 0 ? ` (${expiredCodes.join(', ')})` : ''}`);
  console.log(`Unchanged: ${unchangedCodes.length}`);

  const hasChanges = newCodes.length > 0 || expiredCodes.length > 0;

  if (!hasChanges) {
    console.log('\nNo changes needed.');
    // Output for GitHub Actions
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, 'has_changes=false\n');
    }
    process.exit(0);
  }

  // Build updated data
  const today = new Date().toISOString().split('T')[0];
  const updatedCodes = [];

  // Keep existing codes, update status
  for (const existing of currentData.codes) {
    if (expiredCodes.includes(existing.code)) {
      updatedCodes.push({ ...existing, isActive: false, isNew: false });
    } else {
      updatedCodes.push({ ...existing, isNew: false });
    }
  }

  // Add new codes
  for (const code of newCodes) {
    updatedCodes.push({
      code,
      rewards: { ko: '각종 보상', vi: 'Phần thưởng đa dạng' },
      expiry: null,
      isNew: true,
      isActive: true,
    });
  }

  const updatedData = {
    codes: updatedCodes,
    lastUpdated: today,
  };

  if (applyChanges) {
    fs.writeFileSync(JSON_PATH, JSON.stringify(updatedData, null, 2) + '\n');
    console.log(`\n[APPLIED] redeem-codes.json updated (${today})`);
  } else {
    console.log('\n[DRY RUN] Would update redeem-codes.json with:');
    console.log(JSON.stringify(updatedData, null, 2));
  }

  // Output for GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'has_changes=true\n');
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `summary=New: ${newCodes.join(', ') || 'none'} | Expired: ${expiredCodes.join(', ') || 'none'}\n`
    );
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(`[FATAL] Unexpected error: ${err.message}`);
  process.exit(1);
});

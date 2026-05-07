#!/bin/bash
# Mother's Day page — deploy script
set -e

cd ~/mothers-day

echo "=== Pull latest code ==="
git pull origin master

echo "=== Install dependencies ==="
npm install express

echo "=== Start/Restart with PM2 ==="
pm2 start ecosystem.config.cjs 2>/dev/null || pm2 restart mothers-day
pm2 save

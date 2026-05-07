const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3002;

// Webhook for auto-deploy on git push
app.post('/api/webhook/deploy', (req, res) => {
  res.json({ ok: true, msg: 'deploy triggered' });
  const cmd = 'cd ~/mothers-day && git pull origin master && npm install && pm2 restart mothers-day';
  exec(cmd, (err, stdout, stderr) => {
    const log = `[deploy ${new Date().toISOString()}] ${err ? 'FAIL' : 'OK'}\n${stdout || ''}\n${stderr || ''}`;
    console.log(log);
    require('fs').appendFileSync('/home/admin/mothers-day/deploy.log', log + '\n---\n');
  });
});

// Static files
app.use(express.static(__dirname));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => console.log(`Mother's Day page running on port ${PORT}`));

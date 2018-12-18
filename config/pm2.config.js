/** PM2 settings (for production and staging)
 */
module.exports = {
  name: 'chefsquare',
  get max_memory_restart() { return `${process.env.WEB_MEMORY || 512}M`; },
  get instances() { return process.env.WEB_CONCURRENCY || -1; },
  exec_mode: 'cluster',
  script: './server/index.js',
  error_file: './logs/pm2.errors.log',
  out_file: './logs/pm2.out.log',
  env: {
    NODE_ENV: 'production',
  },
};
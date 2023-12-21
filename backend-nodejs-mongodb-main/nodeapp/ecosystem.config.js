module.exports = {
  apps: [
    {
      name: 'nodeapp',
      script: './bin/www',
      watch: '.',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      name: 'Cote',
      script: './micro-services/emailSenderCote.js',
      watch: ['./micro-services/emailSenderCote.js'],
    },
    {
      name: 'RabbitMQ',
      script: './micro-services/emailSenderRabbitMQ.js',
      watch: ['./micro-services/emailSenderRabbitMQ.js'],
    },
  ],

  deploy: {
    production: {
      user: 'jaderodev',
      host: '162.55.180.119',
      port: '7059',
      ref: 'origin/main',
      repo: 'https://github.com/JoseAlbDR/modulo_node.git',
      path: '/home/nodeapp/app',
      'pre-deploy-local': 'npm run build',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};

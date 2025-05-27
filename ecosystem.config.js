require('dotenv').config();
module.exports = {
	apps: [
		{
			name: `${process.env.PROCESS_NAME}`,
			script: "app.js",
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: "2G",
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};

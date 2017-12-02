require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    database: 'eventManager',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
  },
  test: {
    username: 'postgres',
    password: 'profyem001',
    database: 'eventManager',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};

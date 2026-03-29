import sql from 'mssql'

const config: sql.config = {
  server: process.env.DB_SERVER || '58.8.92.109',
  port: 1433,
  database: process.env.DB_NAME || 'pastechs_db',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
}

declare global {
  // eslint-disable-next-line no-var
  var _mssqlPool: sql.ConnectionPool | undefined
}

async function getPool(): Promise<sql.ConnectionPool> {
  if (!global._mssqlPool || !global._mssqlPool.connected) {
    global._mssqlPool = await new sql.ConnectionPool(config).connect()
  }
  return global._mssqlPool
}

export { getPool, sql }

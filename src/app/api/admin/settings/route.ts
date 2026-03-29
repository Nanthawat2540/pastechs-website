import { NextRequest, NextResponse } from 'next/server'
import { getPool, sql } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

async function ensureTable(pool: Awaited<ReturnType<typeof getPool>>) {
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'site_settings')
    BEGIN
      CREATE TABLE site_settings (
        id            INT IDENTITY(1,1) PRIMARY KEY,
        setting_key   NVARCHAR(100) NOT NULL UNIQUE,
        setting_value NVARCHAR(MAX),
        updated_at    DATETIME DEFAULT GETDATE()
      )
      INSERT INTO site_settings (setting_key, setting_value) VALUES
        ('company_name',   'PAS Tech Group Co., Ltd.'),
        ('address',        'Bangkok, Thailand'),
        ('phone',          '+66 2 123 4567'),
        ('email',          'info@pastechs.com'),
        ('email_sales',    'sales@pastechs.com'),
        ('line_id',        '@pastechs'),
        ('social_linkedin','https://linkedin.com/company/pastechs'),
        ('social_twitter', 'https://twitter.com/pastechs'),
        ('social_facebook','https://facebook.com/pastechs'),
        ('social_github',  'https://github.com/pastechs')
    END
  `)
}

export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const pool = await getPool()
    await ensureTable(pool)
    const result = await pool.request().query(
      `SELECT setting_key, setting_value FROM site_settings ORDER BY id ASC`
    )
    // Convert to key-value object
    const settings: Record<string, string> = {}
    for (const row of result.recordset) {
      settings[row.setting_key] = row.setting_value ?? ''
    }
    return NextResponse.json(settings)
  } catch (err) {
    console.error('GET /api/admin/settings error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const settings: Record<string, string> = await req.json()
    const pool = await getPool()
    await ensureTable(pool)

    for (const [key, value] of Object.entries(settings)) {
      await pool.request()
        .input('key', sql.NVarChar(100), key)
        .input('value', sql.NVarChar(sql.MAX), value ?? '')
        .query(`
          IF EXISTS (SELECT 1 FROM site_settings WHERE setting_key = @key)
            UPDATE site_settings SET setting_value = @value, updated_at = GETDATE() WHERE setting_key = @key
          ELSE
            INSERT INTO site_settings (setting_key, setting_value) VALUES (@key, @value)
        `)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PUT /api/admin/settings error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

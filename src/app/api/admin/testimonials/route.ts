import { NextRequest, NextResponse } from 'next/server'
import { getPool, sql } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

async function ensureTable(pool: Awaited<ReturnType<typeof getPool>>) {
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'testimonials')
    CREATE TABLE testimonials (
      id            INT IDENTITY(1,1) PRIMARY KEY,
      name          NVARCHAR(200)  NOT NULL,
      role          NVARCHAR(200),
      text          NVARCHAR(MAX)  NOT NULL,
      rating        INT            DEFAULT 5,
      avatar_initials NVARCHAR(5),
      avatar_color  NVARCHAR(100)  DEFAULT 'from-sky-500 to-blue-600',
      display_order INT            DEFAULT 0,
      is_visible    BIT            DEFAULT 1,
      created_at    DATETIME       DEFAULT GETDATE()
    )
  `)
}

export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const pool = await getPool()
    await ensureTable(pool)
    const result = await pool.request().query(
      `SELECT * FROM testimonials ORDER BY display_order ASC, created_at DESC`
    )
    return NextResponse.json(result.recordset)
  } catch (err) {
    console.error('GET /api/admin/testimonials error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const { name, role, text, rating, avatar_initials, avatar_color, display_order, is_visible } = await req.json()

    if (!name || !text) return NextResponse.json({ error: 'name and text are required' }, { status: 400 })

    const pool = await getPool()
    await ensureTable(pool)

    const initials = avatar_initials || name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()

    const result = await pool.request()
      .input('name', sql.NVarChar(200), name)
      .input('role', sql.NVarChar(200), role ?? '')
      .input('text', sql.NVarChar(sql.MAX), text)
      .input('rating', sql.Int, rating ?? 5)
      .input('avatar_initials', sql.NVarChar(5), initials)
      .input('avatar_color', sql.NVarChar(100), avatar_color ?? 'from-sky-500 to-blue-600')
      .input('display_order', sql.Int, display_order ?? 0)
      .input('is_visible', sql.Bit, is_visible !== false ? 1 : 0)
      .query(`
        INSERT INTO testimonials (name, role, text, rating, avatar_initials, avatar_color, display_order, is_visible)
        OUTPUT INSERTED.id
        VALUES (@name, @role, @text, @rating, @avatar_initials, @avatar_color, @display_order, @is_visible)
      `)

    return NextResponse.json({ id: result.recordset[0].id }, { status: 201 })
  } catch (err) {
    console.error('POST /api/admin/testimonials error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

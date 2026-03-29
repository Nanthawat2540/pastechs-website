import { NextRequest, NextResponse } from 'next/server'
import { getPool, sql } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

async function ensureTable(pool: Awaited<ReturnType<typeof getPool>>) {
  await pool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'services')
    CREATE TABLE services (
      id          INT IDENTITY(1,1) PRIMARY KEY,
      title       NVARCHAR(200)  NOT NULL,
      title_th    NVARCHAR(200),
      description NVARCHAR(MAX),
      icon_name   NVARCHAR(50)   DEFAULT 'code2',
      tags        NVARCHAR(MAX),
      features    NVARCHAR(MAX),
      color_variant NVARCHAR(20) DEFAULT 'sky',
      display_order INT          DEFAULT 0,
      is_visible  BIT            DEFAULT 1,
      created_at  DATETIME       DEFAULT GETDATE(),
      updated_at  DATETIME       DEFAULT GETDATE()
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
      `SELECT * FROM services ORDER BY display_order ASC, created_at DESC`
    )
    return NextResponse.json(result.recordset)
  } catch (err) {
    console.error('GET /api/admin/services error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const body = await req.json()
    const { title, title_th, description, icon_name, image_url, tags, features, color_variant, display_order, is_visible } = body

    if (!title) return NextResponse.json({ error: 'title is required' }, { status: 400 })

    const pool = await getPool()
    await ensureTable(pool)

    const result = await pool.request()
      .input('title', sql.NVarChar(200), title)
      .input('title_th', sql.NVarChar(200), title_th ?? '')
      .input('description', sql.NVarChar(sql.MAX), description ?? '')
      .input('icon_name', sql.NVarChar(50), icon_name ?? 'code2')
      .input('image_url', sql.NVarChar(500), image_url ?? null)
      .input('tags', sql.NVarChar(sql.MAX), Array.isArray(tags) ? JSON.stringify(tags) : (tags ?? '[]'))
      .input('features', sql.NVarChar(sql.MAX), Array.isArray(features) ? JSON.stringify(features) : (features ?? '[]'))
      .input('color_variant', sql.NVarChar(20), color_variant ?? 'sky')
      .input('display_order', sql.Int, display_order ?? 0)
      .input('is_visible', sql.Bit, is_visible !== false ? 1 : 0)
      .query(`
        INSERT INTO services (title, title_th, description, icon_name, image_url, tags, features, color_variant, display_order, is_visible)
        OUTPUT INSERTED.id
        VALUES (@title, @title_th, @description, @icon_name, @image_url, @tags, @features, @color_variant, @display_order, @is_visible)
      `)

    return NextResponse.json({ id: result.recordset[0].id }, { status: 201 })
  } catch (err) {
    console.error('POST /api/admin/services error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

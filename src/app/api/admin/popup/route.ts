import { NextRequest, NextResponse } from 'next/server'
import { getPool, sql } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const pool = await getPool()
    const result = await pool.request().query(
      'SELECT id, title, message, image_url, is_enabled, updated_at FROM popup_config WHERE id = 1'
    )
    return NextResponse.json(result.recordset[0] ?? null)
  } catch (err) {
    console.error('GET /api/admin/popup error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const { title, message, image_url, is_enabled } = await req.json()
    const pool = await getPool()

    await pool.request()
      .input('title', sql.NVarChar(200), title ?? '')
      .input('message', sql.NVarChar(sql.MAX), message ?? '')
      .input('image_url', sql.NVarChar(500), image_url ?? null)
      .input('is_enabled', sql.Bit, is_enabled ? 1 : 0)
      .query(`
        UPDATE popup_config
        SET title = @title, message = @message, image_url = @image_url,
            is_enabled = @is_enabled, updated_at = GETDATE()
        WHERE id = 1
      `)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PUT /api/admin/popup error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

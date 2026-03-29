import { NextRequest, NextResponse } from 'next/server'
import { getPool, sql } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

export async function GET() {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const pool = await getPool()
    const result = await pool.request().query(
      `SELECT id, title, description, image_url, category, client_name, project_url,
              display_order, is_visible, created_at, updated_at
       FROM portfolio_items
       ORDER BY display_order ASC, created_at DESC`
    )
    return NextResponse.json(result.recordset)
  } catch (err) {
    console.error('GET /api/admin/portfolio error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const { title, description, image_url, category, client_name, project_url, display_order, is_visible } = await req.json()

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 })
    }

    const pool = await getPool()
    const result = await pool.request()
      .input('title', sql.NVarChar(300), title)
      .input('description', sql.NVarChar(sql.MAX), description ?? '')
      .input('image_url', sql.NVarChar(500), image_url ?? null)
      .input('category', sql.NVarChar(100), category ?? 'General')
      .input('client_name', sql.NVarChar(200), client_name ?? null)
      .input('project_url', sql.NVarChar(500), project_url ?? null)
      .input('display_order', sql.Int, display_order ?? 0)
      .input('is_visible', sql.Bit, is_visible !== false ? 1 : 0)
      .query(`
        INSERT INTO portfolio_items (title, description, image_url, category, client_name, project_url, display_order, is_visible)
        OUTPUT INSERTED.id
        VALUES (@title, @description, @image_url, @category, @client_name, @project_url, @display_order, @is_visible)
      `)

    return NextResponse.json({ id: result.recordset[0].id }, { status: 201 })
  } catch (err) {
    console.error('POST /api/admin/portfolio error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

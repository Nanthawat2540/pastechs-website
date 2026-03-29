import { NextRequest, NextResponse } from 'next/server'
import { getPool, sql } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const { id } = await params
    const itemId = parseInt(id, 10)
    if (isNaN(itemId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const { title, description, image_url, category, client_name, project_url, display_order, is_visible } = await req.json()
    if (!title) return NextResponse.json({ error: 'title is required' }, { status: 400 })

    const pool = await getPool()
    await pool.request()
      .input('id', sql.Int, itemId)
      .input('title', sql.NVarChar(300), title)
      .input('description', sql.NVarChar(sql.MAX), description ?? '')
      .input('image_url', sql.NVarChar(500), image_url ?? null)
      .input('category', sql.NVarChar(100), category ?? 'General')
      .input('client_name', sql.NVarChar(200), client_name ?? null)
      .input('project_url', sql.NVarChar(500), project_url ?? null)
      .input('display_order', sql.Int, display_order ?? 0)
      .input('is_visible', sql.Bit, is_visible !== false ? 1 : 0)
      .query(`
        UPDATE portfolio_items
        SET title = @title, description = @description, image_url = @image_url,
            category = @category, client_name = @client_name, project_url = @project_url,
            display_order = @display_order, is_visible = @is_visible, updated_at = GETDATE()
        WHERE id = @id
      `)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PUT /api/admin/portfolio/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin()
  if (guard) return guard

  try {
    const { id } = await params
    const itemId = parseInt(id, 10)
    if (isNaN(itemId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

    const pool = await getPool()
    await pool.request()
      .input('id', sql.Int, itemId)
      .query('DELETE FROM portfolio_items WHERE id = @id')

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('DELETE /api/admin/portfolio/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

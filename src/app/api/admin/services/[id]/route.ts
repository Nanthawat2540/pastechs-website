import { NextRequest, NextResponse } from 'next/server'
import { getPool, sql } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const { id } = await params
    const body = await req.json()
    const { title, title_th, description, icon_name, image_url, tags, features, color_variant, display_order, is_visible } = body

    const pool = await getPool()
    await pool.request()
      .input('id', sql.Int, parseInt(id))
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
        UPDATE services
        SET title=@title, title_th=@title_th, description=@description,
            icon_name=@icon_name, image_url=@image_url, tags=@tags, features=@features,
            color_variant=@color_variant, display_order=@display_order,
            is_visible=@is_visible, updated_at=GETDATE()
        WHERE id=@id
      `)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PUT /api/admin/services/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const { id } = await params
    const pool = await getPool()
    await pool.request()
      .input('id', sql.Int, parseInt(id))
      .query('DELETE FROM services WHERE id=@id')
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('DELETE /api/admin/services/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

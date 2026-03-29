import { NextRequest, NextResponse } from 'next/server'
import { getPool, sql } from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin()
  if (guard) return guard
  try {
    const { id } = await params
    const { name, role, text, rating, avatar_initials, avatar_color, display_order, is_visible } = await req.json()

    const pool = await getPool()
    await pool.request()
      .input('id', sql.Int, parseInt(id))
      .input('name', sql.NVarChar(200), name)
      .input('role', sql.NVarChar(200), role ?? '')
      .input('text', sql.NVarChar(sql.MAX), text)
      .input('rating', sql.Int, rating ?? 5)
      .input('avatar_initials', sql.NVarChar(5), avatar_initials ?? '')
      .input('avatar_color', sql.NVarChar(100), avatar_color ?? 'from-sky-500 to-blue-600')
      .input('display_order', sql.Int, display_order ?? 0)
      .input('is_visible', sql.Bit, is_visible !== false ? 1 : 0)
      .query(`
        UPDATE testimonials
        SET name=@name, role=@role, text=@text, rating=@rating,
            avatar_initials=@avatar_initials, avatar_color=@avatar_color,
            display_order=@display_order, is_visible=@is_visible
        WHERE id=@id
      `)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PUT /api/admin/testimonials/[id] error:', err)
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
      .query('DELETE FROM testimonials WHERE id=@id')
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('DELETE /api/admin/testimonials/[id] error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

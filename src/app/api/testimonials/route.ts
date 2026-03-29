import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET() {
  try {
    const pool = await getPool()
    const result = await pool.request().query(`
      SELECT id, name, role, text, rating, avatar_initials, avatar_color, display_order
      FROM testimonials
      WHERE is_visible = 1
      ORDER BY display_order ASC, created_at DESC
    `)
    return NextResponse.json(result.recordset)
  } catch {
    return NextResponse.json([])
  }
}

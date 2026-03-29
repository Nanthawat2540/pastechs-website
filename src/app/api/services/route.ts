import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET() {
  try {
    const pool = await getPool()
    const result = await pool.request().query(`
      SELECT id, title, title_th, description, icon_name, tags, features, color_variant, display_order
      FROM services
      WHERE is_visible = 1
      ORDER BY display_order ASC, created_at DESC
    `)
    return NextResponse.json(result.recordset)
  } catch {
    return NextResponse.json([])
  }
}

import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET() {
  try {
    const pool = await getPool()
    const result = await pool.request().query(
      `SELECT id, title, description, image_url, category, client_name, project_url, display_order
       FROM portfolio_items
       WHERE is_visible = 1
       ORDER BY display_order ASC, created_at DESC`
    )
    return NextResponse.json(result.recordset)
  } catch (err) {
    console.error('GET /api/portfolio error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

export async function GET() {
  try {
    const pool = await getPool()
    const result = await pool.request().query(
      'SELECT title, message, image_url, is_enabled FROM popup_config WHERE id = 1'
    )
    const row = result.recordset[0] ?? { title: '', message: '', image_url: null, is_enabled: false }
    return NextResponse.json(row)
  } catch (err) {
    console.error('GET /api/popup error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

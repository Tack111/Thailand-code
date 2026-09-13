import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg
const pool = new Pool({ connectionString: process.env.NEON_DB })

// GPS coordinates and price data for each destination
const updates = [
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018, price: '$$', address: 'Bangkok, Thailand', category: 'attraction' },
  { name: 'Chiang Mai', lat: 18.7883, lng: 98.9853, price: '$$', address: 'Chiang Mai, Thailand', category: 'attraction' },
  { name: 'Phuket', lat: 7.8804, lng: 98.3923, price: '$$$', address: 'Phuket, Thailand', category: 'attraction' },
  { name: 'Krabi', lat: 8.1113, lng: 98.9237, price: '$$', address: 'Krabi, Thailand', category: 'attraction' },
  { name: 'Ayutthaya', lat: 14.0354, lng: 100.3481, price: '$', address: 'Ayutthaya, Thailand', category: 'attraction' },
  { name: 'Koh Samui', lat: 9.5027, lng: 99.9345, price: '$$$', address: 'Koh Samui, Thailand', category: 'attraction' },
]

try {
  for (const d of updates) {
    const result = await pool.query(
      `UPDATE destinations SET 
        latitude = $1, longitude = $2, price_range = $3, 
        address = $4, category = $5, last_updated = CURRENT_DATE
       WHERE name = $6`,
      [d.lat, d.lng, d.price, d.address, d.category, d.name]
    )
    console.log(`Updated ${d.name}: GPS (${d.lat}, ${d.lng}), Price: ${d.price}`)
  }
  
  const all = await pool.query('SELECT name, latitude, longitude, price_range, category FROM destinations ORDER BY name')
  console.log('\nAll destinations:')
  all.rows.forEach(r => {
    console.log(`  ${r.name}: GPS(${r.latitude}, ${r.longitude}), Price: ${r.price_range}, Category: ${r.category}`)
  })
} catch (err) {
  console.error('Error:', err.message)
} finally {
  await pool.end()
}
// app/page.js
import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ padding: '1rem' }}>
      <h1>Welcome to My Blog</h1>
      <p>
        <Link href="/blog">Go to Blog</Link>
      </p>
    </main>
  )
}

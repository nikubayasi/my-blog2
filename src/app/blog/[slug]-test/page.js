// app/blog/[slug]/page.js
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  // 全記事の slug を取得
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }) {
  const { slug } = params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound() // 404
  }

  return (
    <article style={{ padding: '1rem' }}>
      <h1>{post.title}</h1>
      <time style={{ color: '#999' }}>{post.date}</time>
      <div
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        style={{ marginTop: '1rem' }}
      />
    </article>
  )
}

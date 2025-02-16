
// app/page.js
import Link from 'next/link'

import CallToAction from './components/CallToAction';
import RecentPosts from './components/RecentPosts';

export default async function Home() {
  // -------------------------------------
  let posts = null;

  try{
    const result = await fetch(process.env.URL + '/api/posts/get',{
      method: 'POST',
      body: JSON.stringify({limit: 9, order: 'desc'}),
      cache: "no-store",
    });
    const data = await result.json();
    posts = data.posts;
  }catch(error){
    console.log("Error getting post:", error);
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="flex flex-col gap-6 p-28 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome To My Blog</h1>
        <p className='text-gray-500 text-sm sm:text-base'>
        Discover a variety of articles and tutorials on topics such as web
          development, software engineering, and programming languages, all
          brought to you through a blog built with Next.js and{' '}
        
        <a href='https://go.clerk.com' className='text-teal-500 hover:underline' target='_blank'>
          Clerk
        </a>
        .
        </p>
        <Link href='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
          View All Posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-600 max-w-[1100px]">
        <CallToAction />
      </div>
      <div className="p-3 flex flex-col gap-8 py-7">
        <RecentPosts limit={9} />
        <Link href={'/search?category=null'} className='text-lg text-teal-500 hover:underline text-center'>
        View All Posts</Link>
      </div>
    {/* <main style={{ padding: '1rem' }}>
      <h1>Welcome to My Blog</h1>
      <p>
        <Link href="/blog">Go to Blog</Link>
      </p>
      <div>
        <input ref={firstName} placeholder='FirstName' /> <br />
        <input ref={lastName} placeholder='LastName' /> <br />

        <button onClick={change}>Click</button>
      </div>
    </main> */}
    </div>    
  )
}

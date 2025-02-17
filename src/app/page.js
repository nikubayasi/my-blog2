
// app/page.js
import Link from 'next/link'

import CallToAction from './components/CallToAction';
import RecentPosts from './components/RecentPosts';
import CardType1 from './components/CardType1';
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
      <div className="flex flex-col gap-6 pt-20 pb-14 md:max-w-xl lg:max-w-4xl  mx-auto">
        <h1 className='text-3xl font-bold lg:text-6xl'>私のブログへようこそ</h1>
        <p className='text-gray-500 text-sm sm:text-xs md:text-base'>
        Web 開発、ソフトウェア エンジニアリング、プログラミング言語などのトピックに関するさまざまな記事やチュートリアルをご覧ください。これらはすべて Next.js と Clerk MongoDBで構築されたブログを通じて提供されます。{' '}
        
        <a href='https://go.clerk.com' className='text-teal-500 hover:underline' target='_blank'>
          Clerk
        </a>
        .
        </p>
        <Link href='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
        すべての投稿を表示する
        </Link>
       
      </div>
      <div className="pb-10"> <CardType1 /></div>
      <div className="p-3 bg-amber-100 dark:bg-slate-600 max-w-[1100px]">
        <CallToAction />
      </div>
      <div className="p-3 flex flex-col gap-8 py-7">
        <RecentPosts limit={9} />
        <Link href={'/search?category=null'} className='text-lg text-teal-500 hover:underline text-center'>
        すべての投稿を表示する</Link>
      </div>
    </div>    
  )
}

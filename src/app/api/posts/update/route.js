import Post from '../../../../lib/models/post.model';
import { connect } from '../../../../lib/mongodb/mongoose';
import { currentUser } from '@clerk/nextjs/server'

export const PUT = async (req) => {
  const user = await currentUser();
  try{
    await connect();
    const data = await req.json();
    if(
      !user || user.publicMetadata.userMongoId  !== data.userMongoId || user.publicMetadata.isAdmin !== true
    ) {
      return new Response('Unauthorized', { status: 401});
    }
    const newPost = await Post.findByIdAndUpdate(
      data.postId,{
        $set: {
          title: data.title,
          content: data.content,
          category: data.category,
          image: data.image,
        }
      },
      {new: true}
    )
    return new Response(JSON.stringify(newPost),{
      status: 200,
    })
  }catch(error){
    console.log('Error deleting post:', error);
    return new Response('Error deleting post', {status: 500})
  }
}
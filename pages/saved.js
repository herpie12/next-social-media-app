import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import {useEffect, useState} from "react";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {UserContextProvider} from "../contexts/UserContext";

export default function SavedPostsPage() {
  const [posts,setPosts] = useState([]);
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!session?.user?.id) {
      return;
    }
    supabase
      .from('saved_posts')
      .select('*')
      .eq('author', session.user.id)
      .then(result => {
        const postsIds = result.data.map(item => item.id);
        console.log(postsIds + " ids");
        supabase
          .from('posts')
          .select('*, author(*)').in('id', postsIds)
          .then(result => {
              setPosts(result.data);
            });
      });

  }, [session?.user?.id]);

  return (
    <Layout>
      <UserContextProvider>
        <h1 className="text-6xl mb-4 text-gray-300">Saved posts</h1>
        {posts.length > 0 && posts.map((post) => (
          <div key={post.id}>
       
            <PostCard {...post} />
          </div>
        ))}
      </UserContextProvider>
    </Layout>
  );
}
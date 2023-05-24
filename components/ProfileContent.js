import PostCard from "./PostCard";
import Card from "./Card";
import FriendInfo from "./FriendInfo";
import {useEffect, useState} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

export default function ProfileContent({activeTab,userId}) {
  const [posts,setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const supabase = useSupabaseClient();
  useEffect(() => {
    if (!userId) {
      return;
    }
    console.log(userId + " /ProfileContent")

    if (activeTab === 'posts') {
      console.log(userId + " /ProfileContent+posts")
      loadPosts().then(() => {});
    }
  }, [userId]);

  async function loadPosts() {
    const posts = await userPosts(userId);
    const profile = await userProfile(userId);
    setPosts(posts);
    setProfile(profile);
  }

  async function userPosts(userId) {
    const {data} = await supabase.from('posts')
      .select('*')
      .eq('author', userId);
    return data;
  }

  async function userProfile(userId) {
    const {data} = await supabase.from('profiles')
      .select()
      .eq('id', userId);
    return data?.[0];
  }
 
  return (
    <div>
      {activeTab === 'posts' && (
        <div>
          {posts?.length > 0 && posts.map(post => (
            <PostCard key={post.created_at} {...post} profiles={profile} />
          ))}
        </div>
      )}
      {activeTab === 'about' && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">About me</h2>
            <p className="mb-2 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut doloremque harum maxime mollitia perferendis praesentium quaerat. Adipisci, delectus eum fugiat incidunt iusto molestiae nesciunt odio porro quae quaerat, reprehenderit, sed.</p>
            <p className="mb-2 text-sm">Donec volutpat lorem sit amet volutpat interdum.
Nunc molestie leo in vulputate cursus.
Sed id lectus vitae lorem pellentesque suscipit.
Vestibulum sit amet velit rhoncus, commodo nunc vitae, scelerisque leo.
Phasellus eget justo mollis, volutpat diam pretium, varius velit.</p>
          </Card>
        </div>
      )}
      {activeTab === 'friends' && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">Friends</h2>
            <div className="">
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
            </div>
          </Card>
        </div>
      )}
      {activeTab === 'photos' && (
        <div>
          
        </div>
      )}
    </div>
  );
}
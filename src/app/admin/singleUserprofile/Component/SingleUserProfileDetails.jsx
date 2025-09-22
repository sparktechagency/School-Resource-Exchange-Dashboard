'use client';

import { useSearchParams } from 'next/navigation';
import PostCard from './post-card';
import { useGetUserByIdQuery } from '@/redux/api/userApi';
import { DNA } from 'react-loader-spinner';
import { Empty, Skeleton } from 'antd';

export default function SingleUserProfileDetails() {
  // get user id from search params
  const searchParams = useSearchParams();
  const userId = searchParams?.get('id');
  //  get single user data from api using userId
  const { data: teacherdata, isLoading } = useGetUserByIdQuery(userId, { skip: !userId });

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-5  p-6 rounded-xl bg-white shadow-lg min-h-screen min-w-[400px]">
        <Skeleton active />;
        <Skeleton />
      </div>
    );
  }

  const posts = teacherdata?.data?.assets || [];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-xl">
      {/* Right Side - User Posts */}
      <div className="flex-1 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">User Posts</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {teacherdata?.data?.assets?.length || 0} posts
              </span>
            </div>
          </div>

          <div className="h-[calc(100vh-120px)] overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {posts?.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  user={teacherdata?.data?.teacher?.user}
                  userId={userId}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <Empty className="mt-4" description={'This user has not made any posts yet.'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

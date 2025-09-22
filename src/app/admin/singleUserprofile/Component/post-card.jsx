'use client';

import { Dropdown, Image } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PostCard({ post, user, userId }) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={user?.image || '/placeholder.svg'}
              alt={user?.name}
              className="!w-10 !h-10 rounded-full border-2 border-gray-200"
            />
            <div>
              <h4 className="font-semibold text-gray-800">{user?.name || 'N/A'}</h4>
              <p className="text-xs text-gray-500">{moment(post?.createdAt).format('lll')}</p>
            </div>
          </div>
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  key: '1',
                  label: <h1 className="text-red-500">Delete</h1>,
                  onClick: () => {
                    toast.success('Post deleted successfully');
                  },
                },
              ],
            }}
          >
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </Dropdown>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{post?.name}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{post?.description}</p>

        {/* Post Image */}
        <div className="relative overflow-hidden rounded-lg mb-4 group">
          <Image
            src={post?.images[0]}
            alt={post.title}
            className="w-full !h-48 object-fit transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>

        {/* Post Details */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-500">Quantity</span>
              <span className="font-semibold text-gray-800 ml-auto">{post?.quantity}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-500">Material</span>
              <span className="font-semibold text-gray-800 ml-auto">{post?.material}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-500">School</span>
              <span className="font-semibold text-gray-800 ml-auto">as</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              router.push(`/admin/singleUserprofile/postDetails?id=${userId}&postId=${post?._id}`);
            }}
            className="bg-[#5CB5EE] w-full text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

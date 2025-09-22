import React from 'react';
import PostDetailsPage from './Component/PostDetailsPage';

export const metadata = { title: 'Post Details', description: 'Admin post details page' };

export default function page() {
  return (
    <div>
      <PostDetailsPage />
    </div>
  );
}

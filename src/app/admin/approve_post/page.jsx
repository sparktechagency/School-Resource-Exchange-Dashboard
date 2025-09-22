import React from 'react';
import PostApprovalTable from './_Component/PostApprovalTable';

export const metadata = { title: 'Approve Post', description: 'Approve Post' };

export default function page() {
  return (
    <div>
      <PostApprovalTable />
    </div>
  );
}

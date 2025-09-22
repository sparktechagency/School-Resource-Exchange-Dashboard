import React from 'react';
import ManagePrincipalAccountContainer from './Comonent/ManagePrincipalAccountContainer';

export const metadata = { title: 'Manage Principal', description: 'Manage Principal' };

export default function page() {
  return (
    <div>
      <ManagePrincipalAccountContainer />
    </div>
  );
}

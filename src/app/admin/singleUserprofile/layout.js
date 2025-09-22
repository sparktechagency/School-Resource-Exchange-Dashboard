import React from 'react';
import UserAccount from './Component/user-account';

export default function layout({ children }) {
  return (
    <div className="flex justify-center gap-[80px]  w-full ">
      <div>
        <UserAccount />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

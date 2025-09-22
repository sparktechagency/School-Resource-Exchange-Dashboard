'use client';

import { Badge, Button } from 'antd';
import { Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import userAvatar from '@/assets/images/user-avatar-lg.png';
import { usePathname } from 'next/navigation';
import { Layout } from 'antd';
import { AlignJustify } from 'lucide-react';
import { useGetAdminQuery } from '@/redux/api/admin';
import { useGetUnreadNotificationQuery } from '@/redux/api/notificationApi';
const { Header } = Layout;

export default function HeaderContainer({ collapsed, setCollapsed }) {
  const pathname = usePathname();
  const navbarTitle = pathname.split('/admin')[1];
  // get admin data
  const { data } = useGetAdminQuery();
  const admin = data?.data || {};

  // get unread notifications
  const { data: notification } = useGetUnreadNotificationQuery();
  const notifications = notification?.data || [];

  return (
    <Header
      style={{
        backgroundColor: '#FFFFFF',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: 0,
        paddingRight: '40px',
      }}
    >
      {/* Collapse Icon */}
      <div className="flex items-center gap-x-2">
        <Button
          type="text"
          icon={<AlignJustify strokeWidth={3} size={25} />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <h1 className="capitalize text-xl font-semibold font-dmSans -mt-3">
          {navbarTitle.length > 1
            ? navbarTitle.replaceAll('/', ' ').replaceAll('-', ' ')
            : 'dashboard'}
        </h1>
      </div>

      {/* Right --- notification, user profile */}
      <div className="flex items-center gap-x-6">
        {/* <button>
          <Search color="#1C1B1F" size={22} strokeWidth={2.5} />
        </button> */}

        <Link href="/admin/notification" className="!leading-none relative">
          <Badge count={notifications || 0} overflowCount={10}></Badge>
          <Bell fill="#1C1B1F" stroke="#1C1B1F" size={18} />
        </Link>

        {/* User */}
        <Link
          href={'/admin/profile'}
          className="flex items-center gap-x-2 text-black hover:text-primary-blue group"
        >
          <Image
            src={userAvatar}
            alt="Admin avatar"
            width={52}
            height={52}
            className="rounded-full border-2 p-0.5 border-primary-green group-hover:border"
          />
          <h4 className="text-lg font-semibold">{admin?.name || 'Admin'} </h4>
        </Link>
      </div>
    </Header>
  );
}

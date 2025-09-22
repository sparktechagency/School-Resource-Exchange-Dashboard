'use client';

import { ConfigProvider, Tag } from 'antd';
import { Table } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
import ProfileModal from '@/components/SharedModals/ProfileModal';
import { Eye, Filter } from 'lucide-react';
import { useGetAllusersQuery } from '@/redux/api/userApi';
import moment from 'moment';

const RecentUserTable = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // get all user from api here
  const { data: teachers, isLoading } = useGetAllusersQuery({ limit: 4, page: 1, searchText: '' });
  const dataSource = teachers?.data?.data || [];
  // table Data
  const data = dataSource?.map((item, inx) => ({
    key: inx + 1,
    name: item?.user?.name || 'N/A',
    userImg: item?.user?.image,
    email: item?.user?.email || 'N/A',
    date: moment(item?.createdAt).format('ll'),
    status: item?.isBlocked === true ? 'Blocked' : 'Active',
    school: item?.user?.school?.name || 'N/A',
  }));

  // =============== Table columns ===============
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (value, record) => {
        // Helper function to validate URL
        const isValidUrl = (url) => {
          if (!url) return false;
          return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
        };

        // Get the first letter of the name (uppercase)
        const firstLetter = value ? value.charAt(0).toUpperCase() : '';

        // Determine if the image is valid
        const hasValidImage = isValidUrl(record?.userImg);

        return (
          <div className="flex-center-start gap-x-2">
            {hasValidImage ? (
              <Image
                src={record?.userImg}
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full w-10 h-auto aspect-square"
              />
            ) : (
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#67cccc] text-white text-lg font-medium">
                {firstLetter}
              </div>
            )}
            <p className="font-medium">{value}</p>
          </div>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',

      filters: [
        {
          text: 'Active',
          value: 'Active',
        },
        {
          text: 'Blocked',
          value: 'Blocked',
        },
      ],
      filterIcon: () => (
        <Filter size={18} color="#fff" className="flex justify-start items-start" />
      ),
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (value) => (
        <Tag
          color="cyan"
          className={`!text-base font-semibold ${value === 'Blocked' ? '!text-red-500' : ''}`}
        >
          {value}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <button
            onClick={() => {
              setShowProfileModal(true);
              setSelectedUser(record);
            }}
            className="text-primary"
          >
            <Eye size={22} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1B70A6',
          colorInfo: '#1B70A6',
        },
      }}
    >
      <div className="">
        <h1 className="text-xl font-semibold">Recent Users</h1>
        <p className="text-sm text-gray-500 mb-5">
          Here are the latest users who joined the platform.
        </p>
        <Table
          style={{ overflowX: 'auto', width: '100%' }}
          columns={columns}
          dataSource={data}
          scroll={{ x: '100%' }}
          pagination={false}
          loading={isLoading}
        ></Table>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        open={showProfileModal}
        setOpen={setShowProfileModal}
        selectedteacher={selectedUser}
      />
    </ConfigProvider>
  );
};

export default RecentUserTable;

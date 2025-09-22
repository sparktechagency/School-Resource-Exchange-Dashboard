'use client';

import { Image, Input, Table } from 'antd';
import { Tooltip } from 'antd';
import { ConfigProvider } from 'antd';
import { Search } from 'lucide-react';
import { Eye } from 'lucide-react';
import { UserX } from 'lucide-react';
import { useState } from 'react';
import { Filter } from 'lucide-react';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { Tag } from 'antd';
import { useRouter } from 'next/navigation';
import { useBlockUnblockUserMutation, useGetAllusersQuery } from '@/redux/api/userApi';
import moment from 'moment';
import toast from 'react-hot-toast';

export default function AccDetailsTable() {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  // ------------------get all teachers from api--------------------->
  const { data: teachers, isLoading } = useGetAllusersQuery({
    limit: 10,
    page: currentPage,
    searchText,
  });
  const dataSource = teachers?.data?.data || [];
  //-------------------- table Data==-------------------->
  const data = dataSource?.map((item, inx) => ({
    key: inx + 1,
    id: item?._id,
    name: item?.user?.name || 'N/A',
    userImg: item?.user?.image,
    email: item?.user?.email || 'N/A',
    date: moment(item?.createdAt).format('ll'),
    status: item?.isBlocked === true ? 'Blocked' : 'Active',
  }));

  // change status api call
  const [blockUnblockUser] = useBlockUnblockUserMutation();

  // Block user handler
  const handleBlockUser = async (id) => {
    try {
      const res = await blockUnblockUser(id).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'User status changed successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to change user status');
    }
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: 'Serial',
      dataIndex: 'key',
      render: (value) => `#${value}`,
    },
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
      title: 'Date',
      dataIndex: 'date',
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
      title: 'Action',
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                router.push(`/admin/singleUserprofile?id=${record.id}`);
              }}
            >
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>

          <Tooltip title="Block User">
            <CustomConfirm
              title={record.status === 'Blocked' ? 'Unblock User' : 'Block User'}
              description={`Are you sure to ${record.status === 'Blocked' ? 'Unblock' : 'Block'} this user?`}
              onConfirm={() => {
                handleBlockUser(record.id);
              }}
            >
              <button>
                {record.status === 'Blocked' ? (
                  <UserX color="#F16365" size={22} />
                ) : (
                  <UserX color="#1B70A6" size={22} />
                )}
              </button>
            </CustomConfirm>
          </Tooltip>
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
          borderRadius: 12,
        },
      }}
    >
      <div className="w-1/3 ml-auto gap-x-5 mb-3">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !border !rounded-lg !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        style={{ overflowX: 'auto' }}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        bordered
        pagination={{
          current: currentPage,
          total: teachers?.data?.meta?.total,
          showTotal: (total) => `Total ${total} users`,
          onChange: (page) => setCurrentPage(page),
        }}
        scroll={{ x: '100%' }}
      ></Table>
    </ConfigProvider>
  );
}

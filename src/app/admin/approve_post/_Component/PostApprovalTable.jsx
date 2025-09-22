'use client';

import { Input, Table } from 'antd';
import { Tooltip } from 'antd';
import { ConfigProvider } from 'antd';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useChangeAssetStatusMutation, useGetAssetsQuery } from '@/redux/api/assetsApi';
import moment from 'moment';
import toast from 'react-hot-toast';
import { selectToken } from '@/redux/features/authSlice';
import { useSelector } from 'react-redux';

export default function PostApprovalTable() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const token = useSelector(selectToken);

  // get pending assest from api
  const { data: pendingAssets } = useGetAssetsQuery(undefined, { skip: !token });

  const assets = pendingAssets?.data?.data;

  // Dummy table Data
  const data = assets?.map((item, inx) => ({
    key: inx + 1,
    id: item?._id,
    name: item?.teacher?.user?.name || 'N/A',
    userImg: item?.teacher?.user?.image,
    email: item?.teacher?.user?.email || 'N/A',
    date: moment(item?.createdAt).format('lll'),
    teacherId: item?.teacher?._id,
  }));

  // change assest satatus API call
  const [changeAssetStatus] = useChangeAssetStatusMutation(
    {
      fixedCacheKey: 'changeAssetStatus',
    },
    { fixedCacheKey: 'changeAssetStatus' }
  );

  // ================= Table Handlers ================
  const handleDenyPost = async (values) => {
    try {
      const formData = new FormData();
      formData.append('payload', JSON.stringify({ status: 'denied' }));
      const res = await changeAssetStatus({ id: values.id, formData }).unwrap();
      if (res.success) {
        toast.success('Post denied successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to deny post');
    }
  };
  const handleApprovePost = async (values) => {
    try {
      const formData = new FormData();
      formData.append('payload', JSON.stringify({ status: 'approved' }));
      const res = await changeAssetStatus({ id: values.id, formData }).unwrap();
      if (res.success) {
        toast.success('Post approved successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to approve post');
    }
  };

  // ================== Table Columns ================
  const columns = [
    { title: 'Serial', dataIndex: 'key', render: (value) => `#${value}` },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.userImg}
            alt="User avatar"
            width={1200}
            height={1200}
            className="rounded-full w-10 h-auto aspect-square"
          />
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    { title: 'Email', dataIndex: 'email' },

    { title: 'Date', dataIndex: 'date' },
    {
      title: 'Post',
      render: (_, record) => (
        <div>
          <button
            onClick={() => {
              router.push(
                `/admin/singleUserprofile/postDetails?id=${record?.teacherId}&postId=${record?.id}`
              );
            }}
            className="text-primary-blue border rounded-lg px-3 py-1 border-[#1B70A6] shadow-md"
          >
            View
          </button>
        </div>
      ),
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <CustomConfirm
              title="Approve Post"
              description="Are you sure to approve this post?"
              onConfirm={() => {
                handleApprovePost(record);
              }}
            >
              <button
                className="bg-[#1B70A6] border text-white rounded-lg px-3 py-1 border-[#1B70A6] shadow-md"
                onClick={() => {}}
              >
                Approve
              </button>
            </CustomConfirm>
          </Tooltip>

          <Tooltip title="Deny Post">
            <CustomConfirm
              title=" Deny Post"
              description="Are you sure to deny this post?"
              onConfirm={() => {
                handleDenyPost(record);
              }}
            >
              <button className="bg-[#F16365] border text-white rounded-lg px-3 py-1 border-[#F16365] shadow-md">
                Deny
              </button>
            </CustomConfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#1B70A6', colorInfo: '#1B70A6', borderRadius: 12 } }}
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
        scroll={{ x: '100%' }}
      ></Table>
    </ConfigProvider>
  );
}

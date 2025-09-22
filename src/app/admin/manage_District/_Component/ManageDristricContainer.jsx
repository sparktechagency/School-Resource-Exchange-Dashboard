'use client';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { Button, Input, Table, Tag, Tooltip } from 'antd';
import { Edit, Filter, PlusCircle, Search, Trash } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import AddDistricModal from './AddDistricModal';
import EditDistricModal from './EditDristicModal';
import { useDeleteDistrictMutation, useGetDistrictsQuery } from '@/redux/api/districts';
import moment from 'moment';
import toast from 'react-hot-toast';

const ManageDristricContainer = () => {
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  // get dristric data from api
  const { data: dristric, isLoading } = useGetDistrictsQuery({
    limit: 10,
    page: currentPage,
    searchText,
  });

  // Dummy table data
  const data = dristric?.data?.data.map((item, inx) => ({
    key: inx + 1,
    name: item?.name,
    createdAt: moment(item?.createdAt).format('ll'),
    logoImage: item?.logo,
    districtcode: item?.code,
    type: item?.type,
    id: item?._id,
  }));

  // delete dristric api handeler
  const [deleteDristric] = useDeleteDistrictMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteDristric(id).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Dristric deleted successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete dristric');
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
      title: 'Logo',
      dataIndex: 'logo',
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Image
            src={record.logoImage}
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full !w-10 !h-auto aspect-square border-2 border-gray-200"
          />
        </div>
      ),
    },
    {
      title: 'District Name',
      dataIndex: 'name',
    },
    {
      title: 'District Code',
      dataIndex: 'districtcode',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      filters: [
        {
          text: 'Strict',
          value: 'strict',
        },
        {
          text: 'Non-Strict',
          value: 'non-strict',
        },
      ],
      filterIcon: () => (
        <Filter size={18} color="#fff" className="flex justify-start items-start" />
      ),
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      render: (value) => (
        <Tag
          className={
            value === 'strict'
              ? ' !text-sm font-bold !bg-red-500 border !text-white'
              : '!text-sm font-bold !bg-green-500 border !text-white'
          }
        >
          {value === 'strict' ? 'Strict' : 'Non-Strict'}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex justify-start gap-x-3">
          <Tooltip title="Edit">
            <button
              onClick={() => {
                setEditOpen(true);
                setEditId(record);
              }}
            >
              <Edit color="#1B70A6" size={22} />
            </button>
          </Tooltip>

          <Tooltip title="Delete">
            <CustomConfirm
              title="Delete This district"
              description="Are you sure to delete this district?"
              onConfirm={() => handleDelete(record?.id)}
            >
              <button>
                <Trash color="#F16365" size={22} />
              </button>
            </CustomConfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        size="large"
        icon={<PlusCircle size={20} />}
        iconPosition="start"
        className="!w-full !py-6"
        style={{ backgroundColor: '#2474A6' }}
        onClick={() => setOpen(true)}
      >
        Add District
      </Button>

      <div className="w-1/3 ml-auto gap-x-5 mb-3 mt-5">
        <Input
          placeholder="Search by name "
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !border !rounded-lg !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        style={{ overflowX: 'auto', marginTop: '30px' }}
        columns={columns}
        dataSource={data}
        bordered
        scroll={{ x: '100%' }}
        loading={isLoading}
        pagination={{
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          pageSize: 10,
          total: dristric?.data?.meta?.total,
          showTotal: (total) => `Total ${total} dristric`,
        }}
      ></Table>
      <AddDistricModal isModalOpen={open} setIsModalOpen={setOpen} />
      <EditDistricModal editInfo={editId} isModalOpen={editopen} setIsModalOpen={setEditOpen} />
    </div>
  );
};

export default ManageDristricContainer;

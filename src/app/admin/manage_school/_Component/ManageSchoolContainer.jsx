'use client';

import { Button, Input, Table, Tooltip } from 'antd';
import { PlusCircle, Search, Trash } from 'lucide-react';
import { useState } from 'react';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import AddSchoolModal from './AddSchoolModal';
import { useDeleteSchoolMutation, useGetAllSchoolsQuery } from '@/redux/api/schoolApi';
import moment from 'moment';
import toast from 'react-hot-toast';

export default function ManageSchoolContainer() {
  const [searchText, setSearchText] = useState('');
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // get all schools
  const { data: schoolsData, isLoading } = useGetAllSchoolsQuery({
    limit: 10,
    page: currentPage,
    searchText,
  });

  // Dummy table data
  const data = schoolsData?.data?.data?.map((item, inx) => ({
    key: inx + 1,
    name: item?.name,
    createdAt: moment(item?.createdAt).format('ll'),
    districtname: item?.district?.name,
    type: item?.type,
    id: item?._id,
    districtcode: item?.district?.code,
  }));

  // school delete api
  const [deleteSchool] = useDeleteSchoolMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteSchool(id).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'School deleted successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete school');
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
      title: 'School Name',
      dataIndex: 'name',
      render: (value) => (
        <div className="flex-center-start gap-x-2">
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: 'District  Name',
      dataIndex: 'districtname',
      render: (value) => (
        <div className="flex-center-start gap-x-2">
          <p className="font-medium">{value}</p>
        </div>
      ),
    },
    {
      title: 'District Code',
      dataIndex: 'districtcode',
      render: (value) => (
        <div className="flex-center-start gap-x-2">
          <p className="font-medium">{value}</p>
        </div>
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
          <Tooltip title="Delete">
            <CustomConfirm
              title="Delete This School"
              description="Are you sure to delete this school?"
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
        onClick={() => setShowCreateCategoryModal(true)}
      >
        Add School
      </Button>
      <div className="w-1/3 ml-auto gap-x-5 mb-3 mt-5">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !border !rounded-lg !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <Table
        style={{ overflowX: 'auto', marginTop: '30px' }}
        columns={columns}
        dataSource={data}
        scroll={{ x: '100%' }}
        bordered
        loading={isLoading}
        pagination={{
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          pageSize: 10,
          total: schoolsData?.data?.meta?.total,
          showTotal: (total) => `Total ${total} categories`,
        }}
      ></Table>

      {/* Create Category Modal */}
      <AddSchoolModal open={showCreateCategoryModal} setOpen={setShowCreateCategoryModal} />

      {/* Edit category modal */}
      {/* <EditCategoryModal open={showEditCategoryModal} setOpen={setShowEditCategoryModal} /> */}
    </div>
  );
}

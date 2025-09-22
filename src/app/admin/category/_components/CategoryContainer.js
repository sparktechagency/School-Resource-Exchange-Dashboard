'use client';

import { Button, Input, Table, Tooltip } from 'antd';
import { PlusCircle, Search, Trash } from 'lucide-react';
import { useState } from 'react';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import CreateCategoryModal from './CreateCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@/redux/api/categoriesApi';
import moment from 'moment';
import toast from 'react-hot-toast';

export default function CategoryContainer() {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  // get useGetCategoriesQuery data------------------->
  const { data: categoriesData, isLoading } = useGetCategoriesQuery({
    limit: 10,
    page: currentPage,
    searchText,
  });

  //  table data
  const data = categoriesData?.data?.data?.map((items, inx) => ({
    key: inx + 1,
    name: items?.name,
    createdAt: moment(items?.createdAt).format('ll'),
    id: items?._id,
  }));

  // delete category api handeler
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(id).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Category deleted successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete category');
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
      title: 'Category Name',
      dataIndex: 'name',
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
              title="Delete This category"
              description="Are you sure to delete this category?"
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
        Create Category
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
          total: categoriesData?.data?.meta?.total,
          showTotal: (total) => `Total ${total} categories`,
        }}
      ></Table>

      {/* Create Category Modal */}
      <CreateCategoryModal open={showCreateCategoryModal} setOpen={setShowCreateCategoryModal} />

      {/* Edit category modal */}
      <EditCategoryModal open={showEditCategoryModal} setOpen={setShowEditCategoryModal} />
    </div>
  );
}

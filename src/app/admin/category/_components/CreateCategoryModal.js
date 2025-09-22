'use client';

import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import { useCreateCategoriesMutation } from '@/redux/api/categoriesApi';
import { Button, Modal } from 'antd';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateCategoryModal({ open, setOpen }) {
  // category create api call
  const [create, { isLoading }] = useCreateCategoriesMutation();

  const handleSubmit = async (data) => {
    try {
      const res = await create(data).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Category added successfully');
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add category');
    }
  };
  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      title="Create Category"
    >
      <FormWrapper onSubmit={handleSubmit}>
        <UInput
          type="text"
          name="name"
          label="Category Name"
          required={true}
          placeholder="Enter category name"
        />

        <Button
          type="primary"
          size="large"
          className="w-full"
          icon={<Plus size={20} />}
          loading={isLoading}
          htmlType="submit"
          style={{ backgroundColor: '#2474A6' }}
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}

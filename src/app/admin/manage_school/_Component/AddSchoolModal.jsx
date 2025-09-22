'use client';

import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import USelect from '@/components/Form/USelect';
import { useCreateDristictMutation, useGetDistrictsQuery } from '@/redux/api/districts';
import { useAddSchoolMutation } from '@/redux/api/schoolApi';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
export default function AddSchoolModal({ open, setOpen }) {
  const [searchText, setSearchText] = useState('');
  // get dristrict from api
  const { data: districts, isLoading } = useGetDistrictsQuery({ limit: 1000, page: 1, searchText });
  // create new school
  const [create, { isLoading: isCreating }] = useAddSchoolMutation();

  const handleSubmit = async (data) => {
    try {
      const res = await create(data).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'School added successfully');
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add school');
    }
  };

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      loading={isLoading}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
      title=" Add School"
    >
      <FormWrapper onSubmit={handleSubmit}>
        <UInput
          type="text"
          name="name"
          label="School Name"
          required={true}
          placeholder="Enter school name"
        />
        <USelect
          name="district"
          label=" Select District"
          required={true}
          options={districts?.data?.data.map((district) => ({
            value: district._id,
            label: district.name,
          }))}
          placeholder="Select District"
          showSearch
          onSearch={(value) => setSearchText(value)}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />

        <Button
          type="primary"
          size="large"
          className="w-full"
          htmlType="submit"
          style={{ backgroundColor: '#2474A6' }}
          loading={isCreating}
        >
          Submit
        </Button>
      </FormWrapper>
    </Modal>
  );
}

'use client';
import { Button, Divider, Form, Input, Modal, Select } from 'antd';
import { RiCloseLargeLine } from 'react-icons/ri';
import { useCreatePrincipleMutation } from '@/redux/api/principleApi';
import { useGetDistrictsQuery } from '@/redux/api/districts';
import toast from 'react-hot-toast';
import { useState } from 'react';

const AddPricipalModal = ({ open, setOpen }) => {
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  //  ----------------add principal api handler============
  const [create, { isLoading }] = useCreatePrincipleMutation();

  // ================get drsict list from api===============
  const { data: districts } = useGetDistrictsQuery({ limit: 1000, page: 1, searchText });

  const districtOptions = districts?.data?.data.map((district) => ({
    label: district.name,
    value: district._id,
  }));

  const handleSubmit = async (values) => {
    try {
      const res = await create(values).unwrap();
      if (res.success) {
        toast.success('Principal added successfully');
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add principal');
    }
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{ minWidth: 'max-content', position: 'relative' }}
    >
      {/* Close Icon */}
      <div
        className="absolute right-0 top-0 h-12 w-12 cursor-pointer rounded-bl-3xl"
        onClick={() => setOpen(false)}
      >
        <RiCloseLargeLine size={18} color="black" className="absolute left-1/3 top-1/3" />
      </div>

      <div className="pb-5">
        <h4 className="text-xl font-bold mb-2">Add Principal</h4>
        <Divider />
        <div className="flex-1">
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            style={{ maxWidth: 500, marginTop: '25px' }}
          >
            <Form.Item
              label=" Name"
              name="name"
              rules={[{ required: true, message: 'Please enter  name' }]}
            >
              <Input placeholder="Enter first name" className="rounded-full py-2" />
            </Form.Item>

            <Form.Item
              label="School email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}
            >
              <Input placeholder="Enter email" className="rounded-full py-2" />
            </Form.Item>

            <Form.Item label="District" name="district" rules={[{ required: true }]}>
              <Select
                mode="single"
                style={{ width: '100%' }}
                placeholder="District"
                className="rounded-full py-2"
                options={districtOptions}
                showSearch
                onSearch={(value) => setSearchText(value)}
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              ></Select>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                loading={isLoading}
                size="large"
                block
                style={{ backgroundColor: '#2474A6', color: 'white', borderRadius: '999px' }}
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddPricipalModal;

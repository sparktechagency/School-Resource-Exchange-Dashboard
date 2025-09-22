'use client';
import { Button, Divider, Form, Input, InputNumber, Select, Upload } from 'antd';
import Modal from 'antd/es/modal/Modal';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import { useCreateDristictMutation } from '@/redux/api/districts';
import toast from 'react-hot-toast';

const AddDistricModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();

  // add new district api handler
  const [create, { isLoading }] = useCreateDristictMutation();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append(
        'payload',
        JSON.stringify({
          name: values.name,
          type: values.type,
          code: values.code,
        })
      );
      formData.append('logo', values.bannerImage[0].originFileObj);
      const res = await create(formData).unwrap();
      if (res.success) {
        toast.success('District added successfully');
        setIsModalOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add district');
    }
  };
  return (
    <div>
      <Modal centered open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <div className="pb-5">
          <h4 className="text-center text-2xl font-medium">Add District</h4>
          <Divider />
          <div className="flex-1">
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              initialValues={{
                category: '',
              }}
            >
              {/* Image Upload */}
              <Form.Item
                name="bannerImage"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                rules={[
                  {
                    required: true,
                    message: 'Please upload a logo image',
                  },
                ]}
                style={{
                  textAlign: 'center',
                  border: '2px dashed #B87CAE',
                  paddingBlock: '20px',
                  borderRadius: '10px',
                }}
              >
                <Upload name="imageBanner" listType="picture" beforeUpload={(file) => false}>
                  <Button icon={<UploadOutlined />}>Upload Distric logo</Button>
                </Upload>
              </Form.Item>

              {/* District Name Name */}
              <Form.Item
                name="name"
                label="District Name"
                rules={[
                  {
                    required: true,
                    message: 'Please input District Name',
                  },
                ]}
              >
                <Input placeholder="Enter District Name" />
              </Form.Item>

              {/* District Code */}
              <Form.Item
                name="code"
                label="District Code"
                rules={[
                  {
                    required: true,
                    message: 'Please input District Code',
                  },
                ]}
              >
                <Input style={{ width: '100%' }} placeholder="Enter District Code" />
              </Form.Item>

              {/* type */}
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please input type',
                  },
                ]}
              >
                <Select placeholder="Select type">
                  <Select.Option value="strict">Strict</Select.Option>
                  <Select.Option value="non-strict">Non-Strict</Select.Option>
                </Select>
              </Form.Item>

              {/*================ Submit Button ================*/}
              <Button
                htmlType="submit"
                size="large"
                block
                loading={isLoading}
                style={{
                  backgroundColor: '#0059A4',
                  color: 'white',
                  marginTop: '20px',
                }}
              >
                Upload
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddDistricModal;

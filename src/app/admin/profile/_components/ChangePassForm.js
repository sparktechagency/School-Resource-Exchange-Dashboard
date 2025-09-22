'use client';

import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import { useChangepasswordMutation } from '@/redux/api/authApi';
import { Button } from 'antd';
import toast from 'react-hot-toast';

export default function ChangePassForm() {
  const [changePass, { isLoading }] = useChangepasswordMutation();
  const handleSubmit = async (data) => {
    try {
      const res = await changePass(data).unwrap();
      if (res.success) {
        toast.success('Password Change Successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <section className="px-10 mt-5">
      {/* <h4></h4> */}
      <FormWrapper onSubmit={handleSubmit}>
        <UInput name="oldPassword" label="Old Password" type="password" placeholder="***********" />
        <UInput name="newPassword" label="New Password" type="password" placeholder="***********" />

        <Button
          htmlType="submit"
          className="w-full"
          style={{ backgroundColor: '#2474A6' }}
          size="large"
          type="primary"
          loading={isLoading}
        >
          Save
        </Button>
      </FormWrapper>
    </section>
  );
}

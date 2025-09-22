'use client';

import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import { useUpdateAdminInfoMutation } from '@/redux/api/admin';
import { editProfileSchema } from '@/schema/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'antd';
import toast from 'react-hot-toast';

export default function EditProfileForm({ admin }) {
  //  update profile api --
  const [updateProfile, { isLoading }] = useUpdateAdminInfoMutation();
  const handleSubmit = async (data) => {
    try {
      const res = await updateProfile(data).unwrap();
      if (res.success) {
        toast.success('Profile Updated Successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <section className="px-10 mt-5">
      <FormWrapper
        onSubmit={handleSubmit}
        resolver={zodResolver(editProfileSchema)}
        defaultValues={{
          name: admin?.name,
          email: admin?.email,
          phone: admin?.phone || '',
        }}
      >
        <UInput name="name" label="Name" type="text" />
        <UInput name="email" label="Email" type="email" disabled />
        <UInput name="phone" label="phone" type="phone" />

        <Button
          htmlType="submit"
          style={{ backgroundColor: '#2474A6' }}
          className="w-full"
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

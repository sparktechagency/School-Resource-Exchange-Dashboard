'use client';
import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { Button } from 'antd';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export default function SetPasswordForm() {
  const searchparams = useSearchParams();
  const router = useRouter();
  const email = searchparams.get('email');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    const payload = { ...data, email };
    try {
      const res = await resetPassword(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Password reset successfully');
        router.push('/login');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="px-6 py-8">
      <Link
        href="/login"
        className="text-white flex-center-start gap-x-2 font-medium hover:text-primary-blue/85 mb-4"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold text-white">Set New Password</h4>
        <p className="text-dark-gray ">Enter your new password login</p>
      </section>

      <FormWrapper onSubmit={onSubmit}>
        <UInput
          name="password"
          label="New Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!h-10 !mb-0"
          labelStyles={{ color: 'white' }}
        />

        <UInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!h-10 !mb-0"
          labelStyles={{ color: 'white' }}
        />

        <Button
          style={{ backgroundColor: '#2474A6' }}
          type="primary"
          size="large"
          className="w-full !font-semibold !h-10"
          htmlType="submit"
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPassSchema } from '@/schema/authSchema';
import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';
import { Button } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useForgetPasswordMutation } from '@/redux/api/authApi';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ForgotPassForm() {
  const router = useRouter();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const onSubmit = async (data) => {
    try {
      const res = await forgetPassword(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        router.push(`/otp-verification?email=${data?.email}`);
      }
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error('Something went wrong');
      }
    }
  };
  return (
    <div className="px-6 py-8 w-full">
      <Link
        href="/login"
        className="text-white flex-center-start gap-x-2 font-medium hover:text-primary-blue/85 mb-4"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold text-white">Forgot Password</h4>
        <p className="text-white">
          Enter your email and we&apos;ll send you an otp for verification
        </p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(forgotPassSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
          labelStyles={{ color: 'white' }}
        />

        <Button
          style={{ backgroundColor: '#2474A6' }}
          type="primary"
          size="large"
          className="w-full !font-semibold !h-10"
          htmlType="submit"
          loading={isLoading}
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}

'use client';
import FormWrapper from '@/components/Form/FormWrapper';
import UOtpInput from '@/components/Form/UOtpInput';
import { useVerifyEmailMutation } from '@/redux/api/authApi';
import { otpSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'antd';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchparams = useSearchParams();
  const email = searchparams.get('email');

  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

  const onSubmit = async (data) => {
    const payload = { ...data, email };
    try {
      const res = await verifyOtp(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'OTP verified successfully');
        router.push(`/set-new-password?email=${email}`);
      } else {
        throw new Error(res?.message || 'Verification failed');
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
    <div className="px-6 py-8">
      <Link
        href="/login"
        className="text-white flex-center-start gap-x-2 font-medium hover:text-primary-blue/85 mb-4"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold text-white">Verify OTP</h4>
        <p className="text-dark-gray">Enter the otp that we&apos;ve sent to your email</p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(otpSchema)}>
        <UOtpInput name="otp" />

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

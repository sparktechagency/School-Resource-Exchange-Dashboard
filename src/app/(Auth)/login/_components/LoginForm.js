'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schema/authSchema';
import FormWrapper from '@/components/Form/FormWrapper';
import UInput from '@/components/Form/UInput';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '@/redux/api/authApi';
import { setUser } from '@/redux/features/authSlice';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signin, { isLoading }] = useSignInMutation();

  const onLoginSubmit = async (data) => {
    try {
      const res = await signin(data).unwrap();

      if (res?.data?.accessToken) {
        const decodedToken = jwtDecode(res.data.accessToken);
        const userRole = decodedToken?.role;
        if (userRole !== 'Admin' && userRole !== 'Principal') {
          toast.error('You are not authorized to access this site');
          return;
        }
        // On successful login and role check
        toast.success('Login successful');
        dispatch(
          setUser({
            token: res?.data?.accessToken,
          })
        );
        router.push('/admin/dashboard');
      } else {
        toast.error(res?.message || 'Login failed: No access token received');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="px-6 py-8 shadow-none shadow-primary-blue/10 w-full bg-transparent rounded-md text-white">
      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold text-white">Welcome back!</h4>
        <p className=" text-white">Sign in to your account</p>
      </section>

      <FormWrapper onSubmit={onLoginSubmit} resolver={zodResolver(loginSchema)}>
        <UInput
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10 text-white"
          labelStyles={{ color: 'white' }}
        />

        <UInput
          name="password"
          label="Password"
          type="password"
          placeholder="*************"
          size="large"
          className="!h-10 !mb-0"
          labelStyles={{ color: 'white' }}
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full !font-semibold !h-10"
          block
          style={{ backgroundColor: '#2474A6' }}
          loading={isLoading}
        >
          Log In
        </Button>

        <Link
          href="/forgot-password"
          className="text-white text-center block mt-2 font-medium hover:text-primary-blue/85"
        >
          I forgot my password
        </Link>
      </FormWrapper>
    </div>
  );
}

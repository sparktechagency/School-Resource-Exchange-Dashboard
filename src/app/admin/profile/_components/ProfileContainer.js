'use client';
import Image from 'next/image';
import adminImg from '@/assets/images/user-avatar-lg.png';
import { ImagePlus } from 'lucide-react';

import { Tabs } from 'antd';
import { ConfigProvider } from 'antd';
import ChangePassForm from './ChangePassForm';
import EditProfileForm from './EditProfileForm';
import { useGetAdminQuery, useUploadAdminImageMutation } from '@/redux/api/admin';
import { DNA } from 'react-loader-spinner';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const { TabPane } = Tabs;

export default function ProfileContainer() {
  // get admin data
  const { data, isLoading } = useGetAdminQuery();
  const admin = data?.data || {};

  // upload admin image
  const [uploadAdminImage, { isLoading: isUploading }] = useUploadAdminImageMutation();
  // State to store the uploaded image
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadAdminImage(formData).unwrap();
      if (res.success) {
        toast.success('Image uploaded successfully');
        setSelectedImage(file);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to upload image');
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 rounded-xl bg-white shadow-lg min-h-screen min-w-[400px]">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1b71a7' } }}>
      <div className="2xl:w-1/2 lg:w-3/4 w-full px-5 lg:px-0 mx-auto">
        {/* Profile pic */}
        <section className="flex-center gap-x-3">
          <div className="relative w-max">
            <Image
              src={selectedImage ? URL.createObjectURL(selectedImage) : adminImg}
              alt="Admin avatar"
              width={1200}
              height={1200}
              className="w-[160px] h-auto aspect-square rounded-full border-2 border-primary-pink p-1"
            />

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Edit button */}
            <button
              onClick={triggerFileInput}
              className="bg-[#2C50ED] p-2 aspect-square rounded-full flex-center text-white/95 absolute bottom-2 right-2"
            >
              <ImagePlus size={20} />
            </button>
          </div>

          <div>
            <h3 className="text-3xl font-semibold">{admin?.name}</h3>
            <p className="font-medium text-primary-blue mt-1 text-lg">Administrator</p>
            {/* <p>Selected Image: {selectedImage ? selectedImage.name : 'None'}</p> */}
          </div>
        </section>

        {/* Profile Information Forms */}
        <section className="my-16">
          <Tabs defaultActiveKey="editProfile" centered>
            <TabPane tab="Edit Profile" key="editProfile">
              <EditProfileForm admin={admin} />
            </TabPane>

            <TabPane tab="Change Password" key="changePassword">
              <ChangePassForm />
            </TabPane>
          </Tabs>
        </section>
      </div>
    </ConfigProvider>
  );
}

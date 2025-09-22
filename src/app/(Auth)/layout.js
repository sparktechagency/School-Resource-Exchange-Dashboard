import Image from 'next/image';
import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <main
      className="flex h-screen items-center justify-center relative "
      style={{
        // background: "url('/rm222batch2-mind-03.jpg') ",
        backgroundColor: '#154462',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="lg:w-[55%] mx-auto">
        <div className=" flex gap-10 justify-center items-center">
          <div>
            <Image className="" src="/authside.png" alt="background" width={1200} height={1200} />
          </div>
          <div className="bg-transparent w-full">{children}</div>
        </div>
      </div>
    </main>
  );
}

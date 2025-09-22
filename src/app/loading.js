'use client';
import { ConfigProvider } from 'antd';
import { DNA } from 'react-loader-spinner';

export default function loading() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1b71a7' } }}>
      <div className="h-[75vh] flex-center">
        <DNA
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </ConfigProvider>
  );
}

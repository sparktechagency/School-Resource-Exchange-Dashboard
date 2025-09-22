'use client';
import AddPricipalModal from '@/components/SharedModals/AddPricipalModal';
import { Button } from 'antd';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import PrincipalTable from './PrincipalTable';

const ManagePrincipalAccountContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Button
        type="primary"
        size="large"
        icon={<PlusCircle size={20} />}
        iconPosition="start"
        className="!w-full !py-6"
        onClick={() => setIsModalOpen(true)}
        style={{ backgroundColor: '#2474A6' }}
      >
        Add Principal
      </Button>

      {/* pricipal list */}
      <div className=" mt-10">
        <PrincipalTable />
      </div>
      <AddPricipalModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
};

export default ManagePrincipalAccountContainer;

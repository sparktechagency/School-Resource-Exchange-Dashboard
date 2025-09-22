"use client";

import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import UTextArea from "@/components/Form/UTextArea";
import { Button, Modal } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema } from "@/schema/subscriptionSchema";

export default function EditSubscriptionPlanModal({ open, setOpen }) {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      title="Edit Subscription Plan"
      onCancel={() => {
        setOpen(false);
      }}
    >
      <FormWrapper
        onSubmit={onSubmit}
        resolver={zodResolver(createSubscriptionSchema)}
      >
        <UInput
          name="name"
          label="Name"
          placeholder="Enter subscription plan name"
        />
        <UInput
          name="duration"
          label="Duration"
          placeholder="Monthly/Yearly/Quarterly or 6 months/12 months"
        />
        <UTextArea
          minRows={5}
          name="description"
          label="Description"
          placeholder="Enter description"
        />
        <UInput
          type="number"
          name="price"
          label="Price"
          placeholder="Enter price"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full"
        >
          Save
        </Button>
      </FormWrapper>
    </Modal>
  );
}

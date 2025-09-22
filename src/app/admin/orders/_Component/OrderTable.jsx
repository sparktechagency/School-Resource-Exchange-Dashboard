"use client";

import { Input, Table, Tag, Button } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { Search, Eye } from "lucide-react";
import { useState } from "react";
import OrderDetailsModal from "@/components/SharedModals/OrderDetailsModal";
import Link from "next/link";

// Dummy table data with product types and statuses
const data = [
  {
    key: 1,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Canon DSLR Camera",
    price: "$500",
    product_type: "Physical",
    status: "Shipped",
  },
  {
    key: 2,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Lightroom Preset Pack",
    price: "$500",
    product_type: "Digital",
    status: "Incomplete",
  },
  {
    key: 3,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Canon DSLR Camera",
    price: "$500",
    product_type: "Physical",
    status: "On Processing",
  },
  {
    key: 4,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Lightroom Preset Pack",
    price: "$500",
    product_type: "Digital",
    status: "Completed",
  },
  {
    key: 5,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Canon DSLR Camera",
    price: "$500",
    product_type: "Physical",
    status: "Shipped",
  },
  {
    key: 6,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Lightroom Preset Pack",
    price: "$500",
    product_type: "Digital",
    status: "Incomplete",
  },
  {
    key: 7,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Lightroom Preset Pack",
    price: "$500",
    product_type: "Digital",
    status: "Completed",
  },
  {
    key: 8,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Lightroom Preset Pack",
    price: "$500",
    product_type: "Digital",
    status: "Incomplete",
  },
  {
    key: 9,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Canon DSLR Camera",
    price: "$500",
    product_type: "Physical",
    status: "Ongoing",
  },
  {
    key: 10,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Lightroom Preset Pack",
    price: "$500",
    product_type: "Digital",
    status: "Completed",
  },
  {
    key: 11,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Canon DSLR Camera",
    price: "$500",
    product_type: "Physical",
    status: "Shipped",
  },
  {
    key: 12,
    order_id: "#001",
    customer_name: "John D",
    product_name: "Canon DSLR Camera",
    price: "$500",
    product_type: "Physical",
    status: "Delivered",
  },
];

export default function OrderTable() {
  const [searchText, setSearchText] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Filter data based on search text
  const filteredData = data.filter(
    (item) =>
      item.customer_name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.product_name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Table columns
  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Product Type",
      dataIndex: "product_type",
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value) => {
        let color;
        switch (value) {
          case "Incomplete":
            color = "orange";
            break;
          case "Completed":
            color = "green";
            break;
          case "On Processing":
            color = "blue";
            break;
          case "Shipped":
            color = "green";
            break;
          case "Ongoing":
            color = "orange";
            break;
          case "Delivered":
            color = "green";
            break;
          default:
            color = "gray";
        }
        return (
          <Tag color={color} className="font-medium">
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Resend Link",
      render: (_, record) => {
        if (record.product_type === "Digital") {
          if (record.status === "Incomplete") {
            return (
              <Button
                type="primary"
                size="small"
                className="rounded-md"
                onClick={() => console.log("Resend link for", record.order_id)}
              >
                Resend
              </Button>
            );
          } else if (record.status === "Completed") {
            return (
              <Button
                size="small"
                className="rounded-md"
                disabled
              >
                Resend
              </Button>
            );
          }
        }
        return <span className="text-gray-400">—</span>;
      },
    },
    {
      title: "Action",
      render: () => (
        <div className="flex items-center gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => setProfileModalOpen(true)}>
              <Eye color="#1B70A6" size={20} />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1B70A6",
          colorInfo: "#1B70A6",
        },
      }}
    >
      <div className=" flex mb-4 ml-auto w-1/2 gap-x-5">
        <Input
          placeholder="Search by name or product"
          prefix={<Search className="mr-2 text-gray-500" size={20} />}
          className="h-11 rounded-lg border text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Link href={'/admin/orderStatus'}>
          <Button style={
            {
              backgroundColor: "#000",
              color: "white",
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              height: "2.5rem",
            }
          } className="">
            Order Status
          </Button>
        </Link>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-4">
          Total Orders: {filteredData.length}
        </p>
      </div>

      <Table
        style={{ overflowX: "auto" }}
        columns={columns}
        dataSource={filteredData}
        scroll={{ x: "100%" }}
        className="rounded-lg shadow-sm"
        rowClassName="hover:bg-gray-50"
      />

      <OrderDetailsModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
      />
    </ConfigProvider>
  );
}
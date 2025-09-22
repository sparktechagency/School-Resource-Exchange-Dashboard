"use client";

import { useState } from "react";
import { Button, Input, Pagination } from "antd";
import { Eye, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Dummy data for the orders
const dummyData = [
    {
        order_id: "#1234",
        product_name: "Canon DSLR Camera",
        product_type: "Physical",
        total_photos: 60,
        price: "$15.00",
        status: "On Processing",
        image: "/camera.png",
    },
    {
        order_id: "#1234",
        product_name: "Canon DSLR Camera",
        product_type: "Physical",
        total_photos: 60,
        price: "$15.00",
        status: "On Processing",
        image: "/camera.png",
    },
    {
        order_id: "#1234",
        product_name: "Canon DSLR Camera",
        product_type: "Physical",
        total_photos: 60,
        price: "$15.00",
        status: "On Processing",
        image: "/camera.png",
    },
    {
        order_id: "#1234",
        product_name: "Canon DSLR Camera",
        product_type: "Physical",
        total_photos: 60,
        price: "$15.00",
        status: "On Processing",
        image: "/camera.png",
    },
    {
        order_id: "#1234",
        product_name: "Lightroom Preset Pack",
        product_type: "Digital",
        price: "$15.00",
        status: "Incomplete",
        image: "/camera.png",
    },
    {
        order_id: "#1234",
        product_name: "Lightroom Preset Pack",
        product_type: "Digital",
        price: "$15.00",
        status: "Incomplete",
        image: "/camera.png",
    },
    {
        order_id: "#1234",
        product_name: "Canon DSLR Camera",
        product_type: "Physical",
        total_photos: 60,
        price: "$15.00",
        status: "Shipped",
        image: "/camera.png",
    },
    {
        order_id: "#1234",
        product_name: "Canon DSLR Camera",
        product_type: "Physical",
        total_photos: 60,
        price: "$15.00",
        status: "Delivered",
        image: "/camera.png",
    },
];

export default function OrderDetails() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8; // 8 items per page (4 rows, 2 columns)

    // Calculate the data to display on the current page
    const startIndex = (currentPage - 1) * pageSize;
    const currentData = dummyData.slice(startIndex, startIndex + pageSize);

    // Handle pagination change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Section Title */}
            <div className=" flex mb-4 ml-auto w-1/2 gap-x-5">
                <Input
                    placeholder="Search by name or product"
                    prefix={<Search className="mr-2 text-gray-500" size={20} />}
                    className="h-11 rounded-lg border text-base"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Link href={'/admin/orders'}>
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
                        Order List
                    </Button>
                </Link>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentData.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                        {/* Product Image */}
                        <div className="w-32 h-32 mr-4">
                            <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.product_name}
                                width={128}
                                height={128}
                                className="object-contain w-full h-full"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-gray-500 text-sm">
                                        Order ID: {item.order_id}
                                    </span>
                                    <h3 className="text-lg font-semibold text-gray-800 mt-1">
                                        {item.product_name}
                                    </h3>
                                    {item.product_type === "Physical" && (
                                        <p className="text-gray-600 text-sm mt-1">
                                            Total Photo: {item.total_photos}
                                        </p>
                                    )}
                                    <p className="text-orange-500 font-medium mt-1">
                                        Price: {item.price}
                                    </p>
                                    <p
                                        className={`text-sm font-medium mt-1 ${item.status === "Incomplete"
                                            ? "text-red-500"
                                            : item.status === "On Processing"
                                                ? "text-orange-500"
                                                : item.status === "Shipped" || item.status === "Delivered"
                                                    ? "text-green-500"
                                                    : "text-gray-500"
                                            }`}
                                    >
                                        {item.status}
                                    </p>
                                </div>
                                <button>
                                    <Eye color="#1B70A6" size={20} />
                                </button>
                            </div>

                            {/* Action Button */}
                            <div className="mt-3">
                                {item.product_type === "Physical" &&
                                    item.status === "On Processing" && (
                                        <Button
                                            type="primary"
                                            size="small"
                                            className="rounded-md"
                                            onClick={() =>
                                                console.log("Mark as Shipping for", item.order_id)
                                            }
                                        >
                                            Mark as Shipping
                                        </Button>
                                    )}
                                {item.product_type === "Digital" &&
                                    item.status === "Incomplete" && (
                                        <Button
                                            type="primary"
                                            size="small"
                                            className="rounded-md"
                                            onClick={() =>
                                                console.log("Resend Link for", item.order_id)
                                            }
                                        >
                                            Resend Link
                                        </Button>
                                    )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={dummyData.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    className="text-gray-700"
                />
            </div>
        </div>
    );
}
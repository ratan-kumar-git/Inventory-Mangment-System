import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import dayjs from 'dayjs';
import { useBillingStore } from "../store/useBillingStore";
import ContentLoader from "../components/layouts/ContentLoader";

const BillingHistory = () => {
  const { bills, isBillLoading, getBills } = useBillingStore();
  const [expandedBill, setExpandedBill] = useState(null);

  useEffect(() => {
    getBills();
  }, [getBills]);

    // loader animation
  if (isBillLoading) {
    return (
      <ContentLoader message="Bills Loading..." />
    );
  }

  const toggleExpand = (id) => {
    setExpandedBill(expandedBill === id ? null : id);
  };

  return (
    <div className="flex-1 w-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Billing History
      </h1>

      {bills.length === 0 ? (
        <p className="text-gray-500">No bills found.</p>
      ) : (
        <div className="space-y-4">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="border rounded-lg shadow-sm bg-white"
            >
              {/* Bill Summary */}
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(bill._id)}
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {bill.customer?.cName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {dayjs(bill.createdAt).format("DD MMM YYYY, hh:mm A")}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-green-600">
                    ₹{bill.totalAmount}
                  </p>
                  {expandedBill === bill._id ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </div>

              {/* Expanded Products */}
              {expandedBill === bill._id && (
                <div className="p-4 border-t bg-gray-50">
                  <h2 className="text-sm font-semibold text-gray-700 mb-2">
                    Products Sold:
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-2 text-left">Product</th>
                          <th className="p-2 text-right">Qty</th>
                          <th className="p-2 text-right">Sell Price</th>
                          <th className="p-2 text-right">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bill.products.map((p, idx) => (
                          <tr
                            key={idx}
                            className="border-t hover:bg-gray-50 transition"
                          >
                            <td className="p-2 text-nowrap">{p.productName}</td>
                            <td className="p-2 text-right">{p.quantity}</td>
                            <td className="p-2 text-right">₹{p.sellPrice}</td>
                            <td className="p-2 text-right">₹{p.subtotal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BillingHistory;

import type { TSalesData } from "interfaces/asins";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AddSalesModal from "~/components/addSalesModal";

const AsinSales = () => {
  const [view, setView] = useState("table");
  const { asin } = useParams();
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [salesData, setSalesData] = useState<TSalesData[]>([]);

  console.log(asin);

  const handleAddSales = async (salesData: TSalesData[]) => {
    console.log(salesData);
    try {
      const response = await fetch(`/api/sales/${asin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sales_data: salesData }),
      });

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Server response:", result);
    } catch (error) {
      console.error("Error submitting sales data:", error);
    }
  };

  const getSalesData = async () => {
    try {
      const response = await fetch(`/api/sales/${asin}`);
      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`
        );
      }
      const result = await response.json();
      setSalesData(result);
      return result;
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    getSalesData();
    () => {
      setSalesData([]);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Sales Modal */}
      <AddSalesModal
        isOpen={showSalesModal}
        onClose={() => setShowSalesModal(false)}
        onAdd={handleAddSales}
        asin={asin || ""}
      />
      {/* ASIN Details Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">ASIN Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border rounded p-3">
            <h3 className="text-sm text-gray-600">ASIN</h3>
            <p className="font-semibold text-gray-800">{asin}</p>
          </div>
          <div className="border rounded p-3">
            <h3 className="text-sm text-gray-600">Product Name</h3>
            <p className="font-semibold text-gray-800">Product Name Here</p>
          </div>
          <div className="border rounded p-3">
            <h3 className="text-sm text-gray-600">Category</h3>
            <p className="font-semibold text-gray-800">Electronics</p>
          </div>
          <div className="border rounded p-3">
            <h3 className="text-sm text-gray-600">Contact</h3>
            <p className="font-semibold text-gray-800">example@email.com</p>
          </div>
        </div>
      </div>
      {/* Add a button to open the modal */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Sales Data</h2>
        <button
          onClick={() => setShowSalesModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Sales Data
        </button>
      </div>

      {/* View Toggle Buttons */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              view === "table"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setView("table")}
          >
            Table View
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              view === "chart"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setView("chart")}
          >
            Chart View
          </button>
        </div>
      </div>

      {/* Table View */}
      {view === "table" && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Sales Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Sales Count
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.length > 0 ? (
                  salesData.map((sale, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                        {sale.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                        {sale.sales_count}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-4 text-center text-gray-600"
                    >
                      No sales data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Chart View */}
      {view === "chart" && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Sales Chart</h2>
          {salesData.length > 0 ? (
            <div className="h-80 w-full">
              <div className="flex flex-col h-full">
                <div className="flex-1 flex items-end">
                  {salesData.map((sale, index) => {
                    // Calculate height based on max sales
                    const maxSales = Math.max(
                      ...salesData.map((s) => s.sales_count)
                    );
                    const height = (sale.sales_count / maxSales) * 100;

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center mx-2"
                        style={{
                          width: `${100 / salesData.length}%`,
                          maxWidth: "50px",
                        }}
                      >
                        <div
                          className="w-full bg-blue-500 rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs mt-1 truncate w-full text-center text-gray-800 font-medium">
                          {sale.date}
                        </div>
                        <div className="text-xs truncate w-full text-center text-gray-700">
                          {sale.sales_count}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-80 bg-gray-100 rounded">
              <p className="text-gray-600 font-medium">
                No data available for visualization
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AsinSales;

import { useEffect, useState } from "react";
import {
  useLoaderData,
  useActionData,
  Form,
  useFetcher,
  useNavigate,
} from "react-router";
import type { TASIN } from "../../interfaces/asins";
import Modal from "~/components/addAsinModal";

export function meta() {
  return [
    { title: "ASIN Dashboard" },
    { name: "description", content: "List of ASINs" },
  ];
}

const ASINTable = () => {
  const [asins, setAsins] = useState<TASIN[]>([]);
  const [asinModal, setAsinModal] = useState(false);
  const navigate = useNavigate();

  // Move fetchData outside of useEffect so it can be called from anywhere
  const fetchData = async () => {
    try {
      const response = await fetch("/api/asins");
      if (!response.ok) {
        throw new Error("API response was not ok");
      }
      const data = await response.json();
      setAsins(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddASIN = async (data: TASIN) => {
    console.log("Submitting data:", data);

    try {
      const response = await fetch("/api/asin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Server response:", result);

      // Now fetchData is accessible here
      fetchData();
    } catch (error) {
      console.error("Error submitting ASIN:", error);
    }
  };

  // Call fetchData on component mount
  useEffect(() => {
    fetchData();
    return () => {
      setAsins([]);
    };
  }, []);
  return (
    <div className="container mx-auto p-4 max-w-md">
      <button
        onClick={() => {
          setAsinModal(true);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Add ASIN
      </button>
      <Modal
        isOpen={asinModal}
        onClose={() => setAsinModal(false)}
        onAdd={handleAddASIN}
      />

      {asins?.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">ASIN</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {asins.map((asin) => (
              <tr
                key={asin.asin}
                onClick={() => {
                  navigate(`/asin/${asin.asin}`);
                }}
              >
                <td className="border px-4 py-2">{asin.asin}</td>
                <td className="border px-4 py-2">{asin.category}</td>
                <td className="border px-4 py-2">{asin.name}</td>
                <td className="border px-4 py-2">{asin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <h1>No ASINs found. Add some!</h1>
          <button
            onClick={() => {
              alert("Simple button clicked");
            }}
            className="bg-red-500 p-4"
          >
            Test Button
          </button>
        </>
      )}
    </div>
  );
};

export default ASINTable;

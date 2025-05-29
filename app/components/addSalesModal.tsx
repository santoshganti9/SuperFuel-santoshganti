import { useState } from "react";
import type { TSalesData } from "../../interfaces/asins";

interface SalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: TSalesData[], asin: string) => void;
  asin: string;
}

interface SalesEntry extends TSalesData {
  id: number;
}

const AddSalesModal = ({ isOpen, onClose, onAdd, asin }: SalesModalProps) => {
  const [entries, setEntries] = useState<SalesEntry[]>([
    { id: 1, sales_count: 0, date: "" },
  ]);
  const [nextId, setNextId] = useState(2);

  if (!isOpen) return null;

  const handleAddEntry = () => {
    setEntries([...entries, { id: nextId, sales_count: 0, date: "" }]);
    setNextId(nextId + 1);
  };

  const handleRemoveEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const handleEntryChange = (
    id: number,
    field: keyof TSalesData,
    value: string | number
  ) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert entries to TSalesData[] (removing the id field)
    const salesData: TSalesData[] = entries.map(({ sales_count, date }) => ({
      sales_count,
      date,
    }));

    console.log(salesData);
    onAdd(salesData, asin);
    // Reset form
    setEntries([{ id: 1, sales_count: 0, date: "" }]);
    setNextId(2);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Sales Data for ASIN: {asin}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="grid grid-cols-12 gap-4 mb-2 font-semibold">
              <div className="col-span-5">Date</div>
              <div className="col-span-5">Sales Count</div>
              <div className="col-span-2">Action</div>
            </div>

            {entries.map((entry) => (
              <div key={entry.id} className="grid grid-cols-12 gap-4 mb-2">
                <div className="col-span-5">
                  <input
                    type="date"
                    value={entry.date}
                    onChange={(e) =>
                      handleEntryChange(entry.id, "date", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="col-span-5">
                  <input
                    type="number"
                    min="0"
                    value={entry.sales_count}
                    onChange={(e) =>
                      handleEntryChange(
                        entry.id,
                        "sales_count",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <button
                    type="button"
                    onClick={() => handleRemoveEntry(entry.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                    disabled={entries.length === 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddEntry}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
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
              Add Another Entry
            </button>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Save All Entries
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalesModal;

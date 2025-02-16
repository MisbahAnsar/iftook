import React, { useState } from "react";
import { CheckCircle, Mail, MessageCircle } from "lucide-react";

const SupportContent = () => {
  // Static data for demonstration
  const [queries, setQueries] = useState([
    {
      id: 1,
      email: "user1@example.com",
      query: "I can't log in to my account.",
      processed: false,
    },
    {
      id: 2,
      email: "user2@example.com",
      query: "How do I reset my password?",
      processed: true,
    },
    {
      id: 3,
      email: "user3@example.com",
      query: "My profile picture is not updating.",
      processed: false,
    },
    {
      id: 4,
      email: "user4@example.com",
      query: "I need help with subscription plans.",
      processed: true,
    },
  ]);

  // Function to mark a query as processed
  const handleProcessed = (id) => {
    setQueries((prevQueries) =>
      prevQueries.map((query) =>
        query.id === id ? { ...query, processed: !query.processed } : query
      )
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Support Queries</h2>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {["Email", "Query", "Status", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {queries.length > 0 ? (
              queries.map((query) => (
                <tr key={query.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-700">{query.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-700">{query.query}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {query.processed ? (
                      <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-md bg-green-200 text-green-800">
                        Processed
                      </span>
                    ) : (
                      <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-md bg-gray-200 text-gray-700">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleProcessed(query.id)}
                      className="flex items-center px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-sm transition"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {query.processed ? "Mark as Pending" : "Mark as Processed"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-600">
                  No SupportContent queries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportContent;
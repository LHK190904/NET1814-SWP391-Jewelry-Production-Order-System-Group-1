
import React, { createContext, useContext, useState } from "react";

const RequestContext = createContext();
export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const sendRequest = (id) => {
    const record = requests.find((record) => record.id === id);
    if (record && record.price) {
      const updatedRecord = { ...record, status: "Pending" };
      setRequests((prevData) =>
        prevData.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
      );
      console.log(`Request ${id} sent to manager.`);
    } else {
      console.log(`Request ${id} cannot be sent to manager. Price is missing.`);
    }
  };

  return (
    <RequestContext.Provider value={{ requests, setRequests, sendRequest }}>
      {children}
    </RequestContext.Provider>
  );
};

// Tạo hook để sử dụng context
export const useRequests = () => useContext(RequestContext);

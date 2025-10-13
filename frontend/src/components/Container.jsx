// src/components/Container.jsx
import React, { useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import DataTable from "./DataTable";
import axios from "axios";
import { serverUrl } from "../helpers/Constant";

function Container() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${serverUrl}/shortUrl`);
      setData(response.data || []);
      setReload(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadReloadState = () => setReload(true);

  useEffect(() => {
    fetchTableData();
  }, [reload]);

  return (
    <div className="flex flex-col items-center justify-start w-full space-y-8 px-2 sm:px-4 md:px-0">
      {/* Form */}
      <div className="w-full max-w-full sm:max-w-3xl">
        <FormContainer uploadReloadState={uploadReloadState} />
      </div>

      {/* Table */}
      <div className="w-full max-w-full sm:max-w-5xl overflow-x-auto">
        {loading ? (
          <div className="p-4 sm:p-6 rounded-lg bg-purp-900/10 text-center text-purp-300">
            Loading...
          </div>
        ) : (
          <DataTable
            data={data}
            uploadReloadState={uploadReloadState}
            refreshData={fetchTableData}
          />
        )}
      </div>
    </div>
  );
}

export default Container;

import React, { useEffect, useState } from 'react'
import FormContainer from './FormContainer'
import { serverUrl } from '../helpers/Constant'
import DataTable from './DataTable'
import axios from 'axios'

function Container() {
  const [data,setData] = useState([])
  const [reload,setReload] = useState(false)

  const fetchTableData = async ()  =>{
      const response =  await axios.get(`${serverUrl}/shortUrl`);
      console.log("The response from server is:",response);
      setData(response.data)
      console.log(data);
      setReload(false)
      
  }
  const uploadReloadState = () =>{
    setReload(true);
  }
  
  useEffect(()=>{
    fetchTableData();
  },[reload])
  return (
    <div>
        <FormContainer uploadReloadState={uploadReloadState}/>
        <DataTable data={data} uploadReloadState={uploadReloadState}   refreshData={fetchTableData}/>
    </div>
  )
}

export default Container
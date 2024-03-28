import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export const MainContext=  createContext()
function MainContextProvider({children}) {

    const [Filter, setFilter] = useState([]);
    const [Data, setData] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [Limit, setLimit] = useState(5);
    const [selectedImage, setSelectedImage] = useState('');
    
   
    const changingImage = (e) => {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    };

    async function GetListUsers() {
        setIsLoading(true);
        try {
          const data = await axios.get(
            `https://dummyapi.io/data/v1/user?limit=5&page=${page}`,
            {
              headers: { "app-id": "64fc4a747b1786417e354f31" },
            }
          );
            setData(data?.data?.data);
          setFilter(data?.data?.data);
          setIsLoading(false);
          setTotalUsers(data?.data?.total);
          setLimit(data?.data?.limit)
          return data;
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }

    
    return (
        <MainContext.Provider value={{GetListUsers , Data , setData , Filter ,IsLoading , page ,setPage , totalUsers , Limit ,selectedImage , changingImage }}>
        {children}
        </MainContext.Provider>
        
    )
}

export default MainContextProvider

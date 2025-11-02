/*import { collection, getDocs,onSnapshot,doc,deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // ✅ named import
import { useState } from "react";

const useFetch = () => {
    
    const[isLoading,setIsloading]=useState(true)
    const[error,setError]=useState(false)
    const[data,setData]=useState()

    const fetchDbData= async(coll)=>{
        setIsloading(true)
        const collRef=collection(db,coll)
        try{
            const snap=await getDocs(collRef)
            setData(snap.docs.map((doc)=>({...doc.data(),id:doc.id})))
            setIsloading(false)
            
            console.log(data)
        }catch(error){
                setError(error)
                setIsloading(false)
        }
    }
  console.log(data)
  const deleteDbItem = async (coll, id) => {
        try {
            await deleteDoc(doc(db, coll, id))
            // UI update
            setData(prev => prev.filter(item => item.id !== id))
        } catch (err) {
            console.error("Delete failed:", err)
            setError(err)
        }
    }

    return { fetchDbData, isLoading, error, data, setData, deleteDbItem };
}

 
export default useFetch;*/
// src/hooks/useFetch.js
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useState } from "react";

const useFetch = () => {
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const fetchDbData = async (coll) => {
    setIsloading(true);
    try {
      const snap = await getDocs(collection(db, coll));
      const fetchedData = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(fetchedData);
      return fetchedData; // ✅ return array to caller
    } catch (error) {
      setError(error);
      return []; // ✅ avoid undefined
    } finally {
      setIsloading(false);
    }
  };

  const deleteDbItem = async (coll, id) => {
    try {
      await deleteDoc(doc(db, coll, id));
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err);
    }
  };

  return { fetchDbData, isLoading, error, data, setData, deleteDbItem };
};

export default useFetch;

import search from '../../assets/images/search.png'
import orders from '../../assets/images/order.jpg'
import '../../css/admin/allProducts.css';
import '../../css/admin/totalOrders.css'
import { useEffect} from 'react';
import useFetch from '../../hooks/useFetch';
const TotalOrders = () => {
    const{fetchDbData,isLoading,error,data}=useFetch();
   

    useEffect(()=>{
        fetchDbData('totalOrders')
    },[])

    return ( 
      <>
    
     <div className="middle">
          <div className="searchBar"><input placeholder="Search"/><img src={search}></img></div>
      </div>
      <div className="orderContainer">
        {
           isLoading?<h2>Loading...</h2>:data.map((order,index)=>(
                <div className="itemTot" key={order.id}>
                       
                        <div><img src={orders}/></div>
                        <div className="oItem">
                        <div>id:{index+1}</div>
                        <div>{order.Orders}</div>
                        <div>items: {order.Items}</div>
                        </div>
                        <div className="oItem">
                        <div >{order.totalPrice}</div>
                        <div >{order.Address}</div>
                        <div>{order.phoneNumber}</div>
                          <div>{order.email}</div>
                        </div>
                        <div className="oItem">
                        <div>{order.Method}</div>
                        <div>{order.Date?.toDate().toLocaleString()}</div>
                      
                        <div>
                        <select >
                          <option value="process">Process</option>
                          <option value="ship">Ship</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancel">Cancel</option>
                          <option value="return">Return</option>
                        </select>
                      </div>
                        </div>
                </div>
            ))
        }
      </div>
      
      </>
     );
}
 
export default TotalOrders;
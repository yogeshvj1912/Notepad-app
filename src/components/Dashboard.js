import { useEffect, useState } from "react"
import Data from "./Data"
import Topbar from "./Topbar"
import "./dashboard.css"



function Dashboard() {
  const [edata,setEdata]=useState([])
  const [searchTerm, setSearchTerm] = useState('');

  const DashboardValid = async()=>{
    let token = localStorage.getItem("usersdatatoken")

    const res = await fetch ("https://notepad-15s7.onrender.com/validuser",{
        method:"GET",
        headers:{
           "Content-Type":"application/json",
           "Authorization":token 
        }
    });

    const data = await res.json();
  
  if(data.status === 401 || !data){
  
    console.log("not valid")
  }else{
    console.log("user verify");
  setEdata(data.ValidUserOne._id)

  }
}

useEffect(() => {
    setTimeout(()=>{
      DashboardValid();

    },2000)
  
  }, [])




  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    
  };
   
  return (
    <div className='dashbord' > 
            <Topbar edata={edata} handleSearch={handleSearch} searchTerm={searchTerm} />
            <Data edata={edata} searchTerm={searchTerm}/>
        </div>
  )
}

export default Dashboard
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import "./dashboard.css"
import { ToastContainer, toast } from "react-toastify";

function Data({ edata,searchTerm}) {
  const [notesData, setNotesData] = useState([]);
  const [isLoading,setLoading]=useState(true);
  const [showInput, setShowInput] = useState(false);
  const [user,setUser] = useState({
    userId:"",
    heading:"",
    messages:""
  })

  const handleButtonClick = (id,head,mess) => {
setUser({...user,userId:id,heading:head,messages:mess})
 
    setShowInput(!showInput); // Toggle the state to show/hide input field
};

  const findData = async (id) => {
    let token = localStorage.getItem("usersdatatoken");

    try {
      const  ids=await id
      const res = await fetch(`http://localhost:5000/notes/${ids }`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token 
        }
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setNotesData(data.notes);
      setLoading(false)
      

      if (data.status === 401 || !data) {
        console.log("Not valid");
      } else {
        console.log("User verified");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  useEffect(() => {
    
    findData(edata);
  }, [edata]);

//put method





const handleChange=(e)=>{
let {name,value} = e.target
setUser({...user,[name]:value})


}

const handleSubmit=async (e)=>{
e.preventDefault()
let token = localStorage.getItem("usersdatatoken")
const {userId,heading,messages}=user;
if (userId===""){
  toast.error("Please login", {
      position: "top-center"
  });
}else if(heading===""){
  toast.error("Please login", {
      position: "top-center"
  });
}else if(messages===""){
  toast.error("Please login", {
      position: "top-center"
  });
}else{
  const data = await fetch("http://localhost:5000/notes", {
      method: "put",
      headers: {
          "Content-Type": "application/json",
          "Authorization":token
      },
      body: JSON.stringify({
          userId,heading,messages
      })
  });
  window.location.reload()
  const res = await data.json();
 
       console.log(res.status);
       
   if(res.status === 200){
      setShowInput(!showInput);
      toast.success("Data Submited Successfully done 😃!", {
          position: "top-center"
      });
      
      
   }
      
}
}


let handleDelet=async ()=>{
const {userId}=user
let token = localStorage.getItem("usersdatatoken")
const deleteData = await fetch(`http://localhost:5000/notes/${userId}`,{
  method:"delete",
  headers:{
    "Content-type":"application/json",
    "Authorization":token
 
  }
})
const res = await deleteData.json();
 
if(res.status === 200){
  setShowInput(!showInput);
  toast.success("Data Successfully deleted 😃!", {
      position: "top-center"
  });}
}


const result = notesData.filter((item)=>{
 return(
  item.heading.toLowerCase().includes(searchTerm.toLowerCase()) || 
  item.messages.toLowerCase().includes(searchTerm.toLowerCase()) 
 )
})

  return (
    <div className="data-box">
      {
        isLoading?<h1>Loading...</h1>:<div className="notes-mainbox">
          {result.map((item,i)=>{
return(
  <button onClick={()=>handleButtonClick(item._id,item.heading,item.messages)} key={i} className="notes-box">
  <h2>{item.heading}</h2>
  <p style={{fontSize:"18px"}}>{item.messages}</p>
  </button>
)
      })} <div>
        {showInput && <div className='model'>
                    <div className='inner-model'>
                        <div className='close-box'>
                            <button onClick={handleButtonClick} className='close'>X</button>
                        </div>
                        <form className='form' >
                            <div>
                                <input className="heading" type="text" placeholder='HEADING' name='heading' value={user.heading}  onChange={handleChange} />
                            </div>
                            <hr />
                            <div>
                                <textarea
                                    className="box"
                                    placeholder='MESSAGES'
                                    name='messages'
                                    value={user.messages} 
                                    onChange={handleChange} >
                                       
                                    </textarea>
                            </div>
                            <div className='buttons'>
                            <button onClick={handleDelet}>DELETE</button>
                            <button onClick={handleSubmit}>UPDATE</button>
                        </div>
                        </form>
                        
                    </div>
                </div>}
      </div>
        </div>
      }
      <ToastContainer />
    </div>
  );
}

export default Data;

import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function ForgotPassword() {

    const {id,token}=useParams();
    const history = useNavigate();

    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");
    const userValid= async()=>{
        const res = await fetch(`https://notepad-15s7.onrender.com/forgotpassword/${id}/${token}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json()
        if(data.status===201){
            console.log("user valid")
        }else{
         history("*")
        }
    }

    const setVal = (e)=>{
     setPassword(e.target.value)
    }
   
    const sendpassword = async(e)=>{
        e.preventDefault();

        const res = await fetch(`https://notepad-15s7.onrender.com/${id}/${token}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({password})
        });

        const data = await res.json()
        if(data.status===201){
          setPassword("")
          setMessage(true)
        
        }else{
            toast.error("! Token Expired generate new Link")
        }
    }
    useEffect(()=>{
        userValid()
    })

  return (
   <>
    <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your New Password</h1>
                    </div>
                    {message ? 
    <p style={{ color: "green", fontWeight: "bold" }}>
        Password successfully Updated.
    </p>:""
}
               
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">New Password</label>
                            <input type="password" value={password} onChange={setVal} name="password" id="password" placeholder='Enter Your New Password' />
                        </div>

                        <button className='btn' onClick={sendpassword}>Send</button>
                        <p>Go to Login Page? <NavLink to="/">Log In</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
   </>
  )
}

export default ForgotPassword
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

function Topbar({ edata, handleSearch, searchTerm ,Theme,changeTheme}) {
    const [showInput, setShowInput] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
   

    const [user, setUser] = useState({
        heading: "",
        messages: ""
    })

    const navigate = useNavigate()

  

    const handleButtonClick = () => {
        setShowInput(!showInput); // Toggle the state to show/hide input field
    };


    const handleClickMenu = () => {
        setShowMenu(!showMenu); // Toggle the state to show/hide input field
    };

    const handleChange = (e) => {
        let { name, value } = e.target
        setUser({ ...user, [name]: value })


    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { heading, messages } = user;
        const userId = edata
        let token = localStorage.getItem("usersdatatoken")

        if (userId === "") {
            toast.error("Please login", {
                position: "top-center"
            });
        } else if (heading === "") {
            toast.error("Please login", {
                position: "top-center"
            });
        } else if (messages === "") {
            toast.error("Please login", {
                position: "top-center"
            });
        } else {
            const data = await fetch("https://notepad-15s7.onrender.com/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    heading, messages, userId
                })
            });

            const res = await data.json();

            console.log(res.status);
            window.location.reload()
            if (res.status === 200) {
                setShowInput(!showInput);
                toast.success("Data Submited Successfully done 😃!", {
                    position: "top-center"
                });

                setUser({ ...user, heading: "", messages: "" });
            }

        }
    }


    return (
        <div className={`topbar ${Theme?"light-off":"light-on"}`}>
            <span className='search-box '><input type="text" className='search' value={searchTerm} onChange={handleSearch} />search</span>

            <div className='circle'><button className="circle-button" onClick={handleButtonClick}>+</button></div>
            <button onClick={handleClickMenu} className='btn'>
                <h2>.</h2>
                <h2>.</h2>
                <h2>.</h2>
            </button>
            {showMenu && (<div className='menu'>

                <div onClick={handleClickMenu} className='close-menu'>X close</div>
                <div className='close-menu' onClick={changeTheme}>
                   {Theme?"Light ON":"Light OFF"}
                </div>
                <div className='logout' onClick={() => {

                    window.localStorage.removeItem("usersdatatoken");
                    navigate("/")
                }}>
                    Logout
                </div>


            </div>)}

            {showInput && (
                <div className='model'>
                    <div className='inner-model'>
                        <div className='close-box'>
                            <button onClick={handleButtonClick} className='close'>X</button>
                        </div>
                        <form className='form' onSubmit={handleSubmit} >
                            <div>
                                <input className="heading" type="text" placeholder='HEADING' name='heading' value={user.heading} onChange={handleChange} autoComplete='off' />
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
                                <button type='submit'>SUBMIT</button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    )
}

export default Topbar
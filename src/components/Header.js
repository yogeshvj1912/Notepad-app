import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import "./header.css"
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from 'react-router-dom';



function Header() {

    const { logindata, setLoginData } = useContext(LoginContext);
    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    



    return (
        <>
            <header>
                <nav> <NavLink to="/"><h1>HP Cloud</h1></NavLink>
                    <div className="avtar">
                        {
                            logindata.ValidUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                             <Avatar style={{ background: "blue" }} onClick={handleClick}
                            />
                        }

                    </div>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logindata.ValidUserOne ? (
                            
                                   
                                    <MenuItem onClick={()=>{
                      window.localStorage.removeItem("usersdatatoken");
                      setLoginData(false)
                    history("/")
                    }} >Logout</MenuItem>
                             
                            ):""
                        }                 
                    </Menu>
                </nav>
            </header>
        </>
    )
}

export default Header


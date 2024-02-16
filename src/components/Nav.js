import { useState, useEffect } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Nav = ({grantAccess, setGrantAccess}) => {

    const [token] = useState(localStorage.getItem('token'))

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/recipe-blog/logon')
    }

    const handleLogoff = () => {
        fetchLogoff()
        navigate('/recipe-blog/logon')
    }

    const fetchLogoff = async () => {
        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog/logoff`

        const options = {
            method: 'POST',
            headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await fetch(url, options)

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            setGrantAccess(0)
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{backgroundColor: '#c1121f'}}>
                    <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{fontWeight: 700, color: '#fdf0d5'}}>
                        {!grantAccess ? "Welcome to our community recipe blog!" : "Welcome back!"}
                    </Typography>
                        <Button color="inherit" style={{fontWeight: 700, color: '#fdf0d5'}} onClick={!grantAccess ? handleClick : handleLogoff}>{!grantAccess ? "Login" : "Logoff"}</Button>
                        </Toolbar>
                    </AppBar>
                </Box>      
        </>
    )
}

export default Nav
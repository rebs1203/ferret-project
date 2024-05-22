import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Nav = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/recipe-blog/logon')
    }

    const handleLogoff = () => {
        // fetchLogoff()
        localStorage.clear()
        navigate('/recipe-blog/logon')
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{backgroundColor: '#c1121f'}}>
                    <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{fontWeight: 700, color: '#fdf0d5'}}>
                        {!localStorage.getItem('token') ? "Welcome to our community recipe blog!" : "Welcome back!"}
                    </Typography>
                        <Button color="inherit" style={{fontWeight: 700, color: '#fdf0d5'}} onClick={!localStorage.getItem('token') ? handleClick : handleLogoff}>{!localStorage.getItem('token') ? "Login" : "Logoff"}</Button>
                        </Toolbar>
                    </AppBar>
                </Box>      
        </>
    )
}

export default Nav
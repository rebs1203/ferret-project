import { useState } from "react"
import { TextField, Button } from "@mui/material"
import { Link } from "react-router-dom"

const Register = () => {
    
    const [createdUser, setCreatedUser] = useState(false)
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleRegister = (event) => {
        event.preventDefault()
        if (username && email && password) {
            const userObject = {
                username,
                email,
                password
            }
            fetchRegister(userObject)
        }
    }

    const fetchRegister = async (user) => {
        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog/register`

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': user.username,
                'email': user.email,
                'password': user.password
            })
        }

        try {
            const response = await fetch(url, options)

            const data = await response.json()
                
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', data.user.name)

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }
            setCreatedUser(true)
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <>
            { createdUser ?
            <div>
                <h2 style={{textAlign: 'center'}}>User successfully created!</h2>
                <p><Link to="/recipe-blog/mypage">Click here to access your page!</Link></p>
            </div>
            :
            <form onSubmit={handleRegister}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <label htmlFor="username"></label>
                <TextField id="username" label="Username" variant="filled" onChange={(e) => setUserName(e.target.value)}/>
                <label htmlFor="email"></label>
                <TextField id="email" label="Email" variant="filled" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password"></label>
                <TextField id="password" label="Password" variant="filled" onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" type="submit">Create Account</Button>
            </div>
            </form>
            }
        </>
    )
}

export default Register
import { TextField, Button } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/Login.css'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(localStorage.getItem('token'))

    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()
        if (email && password) {
            const userObject = {
                email,
                password
            }
            fetchUser(userObject)
        }
    }

    const fetchUser = async (compareUser) => {
        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog/logon`

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': compareUser.email,
                'password': compareUser.password
            })
        }

        try {
            const response = await fetch(url, options)

            const data = await response.json()

            console.log(data.message)
            
            
            if (response.ok) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', data.user.name)
                setToken(data.token)
            } else {
                alert(data.message)
                throw new Error(`Error: ${response.status}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(token)


    return (
        <> 
            {
                localStorage.getItem('token') ?

                navigate('/recipe-blog/mypage')

                :
                <>
            <form onSubmit={handleLogin}>
                <div className="login-div">
                <label htmlFor="email"></label>
                <TextField id="email" label="Email" variant="filled" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password"></label>
                <TextField id="password" label="Password" variant="filled" onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" type="submit" id="button">LogIn</Button>
                </div>
            </form>
                <p>Don't have an account yet? <a href="/recipe-blog/register">Click here to register!</a></p>
                </>
            }
        </>
    )
}

export default Login
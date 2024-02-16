import { useEffect, useState } from "react"
import * as React from 'react';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles/UsersPage.css'

const UsersPage = ({reloadList}) => {

    const [id, setId] = useState('')
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetchUsersRecipes()
    }, [reloadList])

    const handleClick = (identification) => {
        setId(identification)
        localStorage.setItem('recipeId', identification)
        console.log(id)
    }

    const navigate = useNavigate()

    const fetchUsersRecipes = async () => {

        const token = localStorage.getItem('token')

        console.log(token)

        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog/mypage`

        const options = {
            method: 'GET',
            headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await fetch(url, options)
            const data = await response.json()

            setRecipes(data.userRecipes)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            { id ?
                navigate(`/recipe-blog/mypage/${id}`)
                :
                recipes?.map((item) => {
                    return (
                <div key={item._id} className='card-div'>
                    <Box sx={{ minWidth: 275 }}>
                        <Card variant="outlined">
                            <CardContent key={item._id}>
                            <Typography variant="h5" component="div">
                                {item.recipeName}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {item.estTimeOfPrep}
                            </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleClick(item._id)}>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </div>
                    )
                })
            }
        </div>
    )
}

export default UsersPage
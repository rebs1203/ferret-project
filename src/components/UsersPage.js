import { useEffect, useState } from "react"
import * as React from 'react';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../styles/UsersPage.css'

const UsersPage = ({reloadList, decodeBase64}) => {

    const [id, setId] = useState('')
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        setLoading(true)
    }, [])

    useEffect(() => {
        fetchUsersRecipes()
    }, [reloadList])

    const handleClick = (identification) => {
        setId(identification)
        localStorage.setItem('recipeId', identification)
    }

    const navigate = useNavigate()

    const fetchUsersRecipes = async () => {

        const token = localStorage.getItem('token')
        const id = localStorage.getItem('user')

        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog/mypage`

        const options = {
            method: 'PATCH',
            headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userId": id
            })
        }

        try {
            const response = await fetch(url, options)
            const data = await response.json()

            const recipesWithImages = data?.userRecipes.map((recipe) => ({
                ...recipe,
                image: `${decodeBase64(recipe.image?.data?.data)}`,
            }));

            setRecipes(recipesWithImages)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            { id ?
                navigate(`/recipe-blog/mypage/${id}`)
                :

                loading ? 

                <div style={{display: "flex", justifyContent: "center"}}>
                        <h2>Loading...</h2>
                </div>

                :

                recipes?.map((item) => {
                    return (
                <div key={item._id} className='card-div'>
                    <Box sx={{ width: 370 }}>
                        <Card sx={{ maxWidth: 370 }}>
                            <CardMedia
                                height="170"
                                component="img"
                                src={item.image} 
                            />
                            <div className="card-content">
                                <CardContent key={item._id}>
                                <Typography variant="h5" component="div" className="name">
                                    {item.recipeName}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary" className="time">
                                    {item.estTimeOfPrep}
                                </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleClick(item._id)}>View Recipe</Button>
                                </CardActions>
                            </div>
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
import { useEffect, useState } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../styles/RecipesPage.css'


const RecipesPage = ({decodeBase64}) => {

    const [recipes, setRecipes] = useState([])
    const [cuisine, setCuisine] = useState('')
    const [loading, setLoading] = useState(null)
    
    useEffect(() => {
        setLoading(true)
    }, [])

    useEffect(() => {
        fetchAllRecipes()
    }, [cuisine])


    const handleChange = (event) => {
        setCuisine(event.target.value);
    };
    
    const fetchAllRecipes = async () => {

        const queryParams = new URLSearchParams(cuisine);
        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog?name=${queryParams?.toString()}`
        const urlAll = `https://recipe-blog-l7ey.onrender.com/recipe-blog`

        const options = {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'test': 'GETALL'})
        }

        try {
            const response = await fetch(cuisine ? url : urlAll, options)
            const data = await response.json()

            

            if (cuisine) {
                const filteredRecipesWithImages = data?.filteredRecipes?.map((recipe) => ({
                    ...recipe,
                    image: `${decodeBase64(recipe.image?.data?.data)}`,
                }));
                setRecipes(filteredRecipesWithImages)
                setLoading(false)
            } else {
                const allRecipesWithImages = data?.allRecipes?.map((recipe) => ({
                    ...recipe,
                    image: `${decodeBase64(recipe.image?.data?.data)}`,
                }));
                setRecipes(allRecipesWithImages)
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }
    
    
    return (
            <div>
                {loading ? 
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <h2>Loading...</h2>
                    </div>
                :
                    <>
                        <div className="filter">
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Filter by Cuisine</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={cuisine}
                                    label="Filter by Cuisine"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Italian'}>Italian</MenuItem>
                                    <MenuItem value={'Japanese'}>Japanese</MenuItem>
                                    <MenuItem value={'Chinese'}>Chinese</MenuItem>
                                    <MenuItem value={'Indian'}>Indian</MenuItem>
                                    <MenuItem value={'American'}>American</MenuItem>
                                    <MenuItem value={'Other'}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
        
                        <div style={{display: "flex", justifyContent: "center"}}>
                            {recipes?.length === 0 ?
                                <div>
                                    <h2>Sorry, there's no {cuisine} recipes at this moment ☹️</h2> 
                                    <p onClick={() => setCuisine('')}><a href="http://localhost:3001">Click here to go back</a></p>
                                </div>
                            :
                                <div className="cards-div">
                                    {recipes?.map((item) => (
                                        <Box key={item._id} sx={{minWidth: 275}} className='box'>
                                            <Card variant="outlined">
                                                <CardMedia
                                                    sx={{ height: 250 }}
                                                    component="img"
                                                    src={item.image} 
                                                />
                                                <CardContent  className='card'>
                                                    <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                                        {item.cuisineType}
                                                    </Typography>
                                                    <Typography variant="h5" className="recipe-name">
                                                        {item.recipeName}
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        {item.estTimeOfPrep}
                                                    </Typography>
                                                    <Typography variant="body2" className="paragraphs">
                                                        {item.ingredients}
                                                    </Typography>
                                                    <Typography variant="body2" className="paragraphs">
                                                        {item.prepInstructions}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    ))}
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
        );
}        


export default RecipesPage
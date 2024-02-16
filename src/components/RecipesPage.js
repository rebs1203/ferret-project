import { useEffect, useState } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../styles/RecipesPage.css'


const RecipesPage = () => {

    const [recipes, setRecipes] = useState([])
    const [cuisine, setCuisine] = useState('')

    useEffect(() => {
        fetchAllRecipes()
    }, [])

    const handleChange = (event) => {
        setCuisine(event.target.value);
    };
    
    const fetchAllRecipes = async () => {

        const queryParams = new URLSearchParams(cuisine);
        const url = `http://localhost:3001/recipe-blog?${queryParams?.toString()}`
        const urlAll = `http://localhost:3001/recipe-blog`

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'test': 'GETALL'})
        }

        try {
            const response = await fetch(cuisine ? url : urlAll, options)
            const data = await response.json()

            setRecipes(data.allRecipes)
        } catch (error) {
            console.log(error)
        }
    }
    
    
    return (
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
        <div className="cards-div">
        {recipes?.map((item) => {
            return (
                <Box key={item._id} sx={{minWidth: 275}} className='box'>
                    <Card variant="outlined">
                        <CardContent  className='card'>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {item.cuisineType}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {item.recipeName}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {item.estTimeOfPrep}
                            </Typography>
                            <Typography variant="body2">
                                {item.ingredients}
                            </Typography>
                            <Typography variant="body2">
                                {item.prepInstructions}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )
        })}
        </div>
        </>
    )
}

export default RecipesPage
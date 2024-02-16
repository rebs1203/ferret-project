import { useState } from "react"
import { TextField, Button } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../styles/RecipesForm.css'

const RecipesForm = ({reloadList, setReloadList}) => {
    
    const [recipeName, setRecipeName] = useState('')
    const [cuisineType, setCuisineType] = useState('')
    const [estTimeOfPrep, setEstTimeOfPrep] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [prepInstructions, setPrepInstructions] = useState('')

    const handleRecipesForm = (event) => {
        event.preventDefault()
        if (recipeName && cuisineType && estTimeOfPrep && ingredients && prepInstructions) {
            const recipeObject = {
                recipeName,
                cuisineType,
                estTimeOfPrep,
                ingredients,
                prepInstructions
            }
            fetchCreateRecipe(recipeObject)
        }
    }

    const handleChange = (event) => {
        setCuisineType(event.target.value);
    };
    
    const fetchCreateRecipe = async (recipe) => {

        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('user')

        const url = `https://recipe-blog-l7ey.onrender.com/mypage`

        const options = {
            method: 'POST',
            headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "recipeName": recipe.recipeName,
                "createdBy": userId,
                "cuisineType": recipe.cuisineType,
                "estTimeOfPrep": recipe.estTimeOfPrep,
                "ingredients": recipe.ingredients,
                "prepInstructions": recipe.prepInstructions
            })
        }

        try {
            const response = await fetch(url, options)

            if (!response.ok) {
                alert(response.status)
                throw new Error(`Error: ${response.status}`)
            }

            const data = await response.json()

            console.log(data)

            
            setReloadList(reloadList + 1)
        } catch (error) {
            console.log(error)
        }
    }
    
    
    return (
        <>
            <form onSubmit={handleRecipesForm}>
                <div className="form-div">
                <label htmlFor="recipeName"></label>
                <TextField id="recipeName" label="Recipe name" variant="filled" onChange={(e) => setRecipeName(e.target.value)}/>
                <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">Filter by Cuisine</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={cuisineType}
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
                <label htmlFor="estTimeOfPrep"></label>
                <TextField id="estTimeOfPrep" label="Estimate time of prep" variant="filled" onChange={(e) => setEstTimeOfPrep(e.target.value)}/>
                <label htmlFor="ingredients"></label>
                <TextField id="ingredients" label="Ingredients" variant="filled" onChange={(e) => setIngredients(e.target.value)}/>
                <label htmlFor="prepInstructions"></label>
                <TextField id="prepInstructions" label="Prep instructions" variant="filled" onChange={(e) => setPrepInstructions(e.target.value)}/>
                <Button variant="contained" type="submit">Add Recipe</Button>
                </div>
            </form>
        </>
    )
}

export default RecipesForm
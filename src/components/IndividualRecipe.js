import { useState, useEffect } from "react"
import { Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../styles/IndividualRecipe.css'

const IndividualRecipe = () => {
    
    const [recipeName, setRecipeName] = useState('')
    const [cuisineType, setCuisineType] = useState('')
    const [estTimeOfPrep, setEstTimeOfPrep] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [prepInstructions, setPrepInstructions] = useState('')
    const [recipe, setRecipe] = useState({})
    const [edit, setEdit] = useState(false)
    const [id] = useState(localStorage.getItem('recipeId'))
    const [token] = useState(localStorage.getItem('token'))

    useEffect(() => {
        fetchRecipe(id)
    }, [])

    const navigate = useNavigate()

    const handleChange = (event) => {
        setCuisineType(event.target.value);
    };

    const handlePatch = (event) => {
        event.preventDefault()
        if (recipeName && cuisineType && estTimeOfPrep && ingredients && prepInstructions) {
            const recipeObject = {
                recipeName,
                cuisineType,
                estTimeOfPrep,
                ingredients,
                prepInstructions
            }
            fetchEdit(id, recipeObject)
        }
    }


    const fetchRecipe = async (id) => {

        const url = `http://localhost:3001/recipe-blog/mypage/${id}`

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

            setRecipe(data.recipe)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchEdit = async (id, recipe) => {

        const url = `http://localhost:3001/recipe-blog/mypage/${id}`

        const options = {
            method: 'PATCH',
            headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "recipeName": recipe.recipeName,
                "cuisineType": recipe.cuisineType,
                "estTimeOfPrep": recipe.estTimeOfPrep,
                "ingredients": recipe.ingredients,
                "prepInstructions": recipe.prepInstructions
            })
        }

        try {
            const response = await fetch(url, options)
            const data = await response.json()

            setRecipe(data.updatedRecipe)
            setEdit(false)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDelete = async (id) => {
        const url = `http://localhost:3001/recipe-blog/mypage/${id}`

        const options = {
            method: 'DELETE',
            headers: {
                Authorization:`Bearer ${token}`,
            }
        }

        try {
            const response = await fetch(url, options)

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`)
            }

            navigate('/recipe-blog/mypage')
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <>  {
            edit ?
            <form onSubmit={handlePatch}>
                <div className="edit-form">
                <label htmlFor="recipeName"></label>
                <TextField id="recipeName" label="Recipe name" variant="filled" onChange={(e) => setRecipeName(e.target.value)}/>
                <FormControl fullWidth variant="filled">
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
                <Button variant="contained" type="submit">Finish Editing</Button>
                <a href="/recipe-blog/mypage" style={{marginTop: '1%'}}>Go back</a>
            </div>
            </form>
            :
            <div className="recipe-card">
                <h1 style={{fontWeight: 900}}>{recipe.recipeName}</h1>
                <h3>{recipe.cuisineType}</h3>
                <h5>{recipe.estTimeOfPrep}</h5>
                <p>{recipe.ingredients}</p>
                <p>{recipe.prepInstructions}</p>
                <div className="button-div">
                <Button variant="contained" type="submit" id='button' onClick={() => setEdit(true)}>Edit</Button>
                <Button variant="contained" type="submit" id='button' onClick={() => fetchDelete(id)}>Delete</Button>
                </div>
                <a href="/recipe-blog/mypage" style={{marginTop: '1%'}}>Go back</a>
            </div>
        }
        </>
    )
}

export default IndividualRecipe
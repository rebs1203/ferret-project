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
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        fetchRecipe(id)
    }, [])

    const navigate = useNavigate()

    const handleChange = (event) => {

            setCuisineType(event.target.value)

    };

    const handlePatch = (event) => {
        event.preventDefault()
        const recipeObject = {
            recipeName: recipeName || recipe.recipeName,
            cuisineType: cuisineType || recipe.cuisineType,
            estTimeOfPrep: estTimeOfPrep || recipe.estTimeOfPrep,
            ingredients: ingredients || recipe.ingredients,
            prepInstructions: prepInstructions || recipe.prepInstructions
        }
        fetchEdit(id, recipeObject)
    }


    const fetchRecipe = async (id) => {

        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog/mypage/${id}`

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
            if (response.ok) {
                setRecipe(data.recipe)
            } else {
                setErrorMessage(data.message)
            }
        } catch (error) {
            setErrorMessage("Request fail")
        }
    }

    const fetchEdit = async (id, editedRecipe) => {

        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog/mypage/${id}`

        const options = {
            method: 'PATCH',
            headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "recipeName": editedRecipe.recipeName,
                "cuisineType": editedRecipe.cuisineType,
                "estTimeOfPrep": editedRecipe.estTimeOfPrep,
                "ingredients": editedRecipe.ingredients,
                "prepInstructions": editedRecipe.prepInstructions
            })
        }

        try {
            const response = await fetch(url, options)
            const data = await response.json()
            if(response.ok) {
            setRecipe(data.updatedRecipe)
            setEdit(false)
            } else {
            setErrorMessage(data.message)
            }
            } catch (error) {
            setErrorMessage("Request fail")
            }
    }

    const fetchDelete = async (id) => {
        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog/mypage/${id}`

        const options = {
            method: 'DELETE',
            headers: {
                Authorization:`Bearer ${token}`,
            }
        }

        try {
            const response = await fetch(url, options)
            const data = await response.json()

            if (response.ok) {
                navigate('/recipe-blog/mypage')
            } else {
                setErrorMessage(data.message)
            }
        } catch (error) {
            setErrorMessage("Request fail")
        }
    }

    
    return (
        <> 
        {errorMessage !== null && (
            <div>
                <h3 style={{textAlign: 'center', color: '#F00' }}>{errorMessage}</h3>
            </div>
        )}
        {
            edit ?
            <form onSubmit={handlePatch}>
                <div className="edit-form">
                <label htmlFor="recipeName"></label>
                <TextField id="recipeName" label="Recipe name" variant="filled" defaultValue={recipe.recipeName} onChange={(e) => setRecipeName(e.target.value)}/>
                <FormControl fullWidth variant="filled">
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={!cuisineType ? recipe.cuisineType : cuisineType}
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
                <TextField id="estTimeOfPrep" label="Estimate time of prep" variant="filled" defaultValue={recipe.estTimeOfPrep} onChange={(e) => setEstTimeOfPrep(e.target.value)}/>
                <label htmlFor="ingredients"></label>
                <TextField id="ingredients" label="Ingredients" variant="filled" defaultValue={recipe.ingredients} onChange={(e) => setIngredients(e.target.value)}/>
                <label htmlFor="prepInstructions"></label>
                <TextField id="prepInstructions" label="Prep instructions" variant="filled" defaultValue={recipe.prepInstructions} onChange={(e) => setPrepInstructions(e.target.value)}/>
                <Button variant="contained" type="submit">Finish Editing</Button>
                <a href="/recipe-blog/mypage" style={{marginTop: '1%'}}>Go back</a>
            </div>
            </form>
            :
            <div className="recipe-card">
                <h1 style={{fontWeight: 900}}>{recipe.recipeName}</h1>
                <h3>{recipe.cuisineType}</h3>
                <h4>{recipe.estTimeOfPrep}</h4>
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
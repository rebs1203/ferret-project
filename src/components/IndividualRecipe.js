import { useState, useEffect, Image, useRef } from "react"
import { Button, TextField } from "@mui/material"
import { useNavigate } from "react-router-dom"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../styles/IndividualRecipe.css'

const IndividualRecipe = ({decodeBase64}) => {
    
    const [recipeName, setRecipeName] = useState('')
    const [cuisineType, setCuisineType] = useState('')
    const [image, setImage] = useState(null)
    const [estTimeOfPrep, setEstTimeOfPrep] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [prepInstructions, setPrepInstructions] = useState('')
    const [recipe, setRecipe] = useState({})
    const [edit, setEdit] = useState(false)
    const [id] = useState(localStorage.getItem('recipeId'))
    const [token] = useState(localStorage.getItem('token'))
    const [errorMessage, setErrorMessage] = useState(null)
    const imageRef = useRef(null)


    useEffect(() => {
        fetchRecipe(id)
    }, [])

    const navigate = useNavigate()

    const handleChange = (event) => {

            setCuisineType(event.target.value)

    };

    const handlePatch = async (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('recipeName', recipeName || recipe.recipeName);
        formData.append('cuisineType', cuisineType || recipe.cuisineType);
        formData.append('estTimeOfPrep', estTimeOfPrep || recipe.estTimeOfPrep);
        formData.append('ingredients', ingredients || recipe.ingredients);
        formData.append('prepInstructions', prepInstructions || recipe.prepInstructions);
        formData.append('image', image || recipe.image);
        await fetchEdit(id, formData)
    }

    const handleLists = (list) => {
        const listSplit = list.split('-')
        listSplit.shift()
        list = listSplit
    }


    const fetchRecipe = async (id) => {

        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog/mypage/${id}`


        const options = {
            method: 'GET',
            headers: {
                Authorization:`Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
            }
        }

        try {
            const response = await fetch(url, options)
            const data = await response.json()

            data.recipe.image.data.data = decodeBase64(data.recipe.image.data.data)

            if (response.ok) {
                setRecipe(data.recipe)
                const ingredientListSplit = data.recipe.ingredients.split('-')
                ingredientListSplit.shift()
                data.recipe.ingredients = ingredientListSplit
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
                "Access-Control-Allow-Origin": "*",
            },
            body: editedRecipe
        }

        try {
            const response = await fetch(url, options)
            const data = await response.json()

            data.updatedRecipe.image.data.data = decodeBase64(data.updatedRecipe.image.data.data)
            if(response.ok) {
            setRecipe(data.updatedRecipe)
            const ingredientListSplit = data.updatedRecipe.ingredients.split('-')
            ingredientListSplit.shift()
            data.updatedRecipe.ingredients = ingredientListSplit
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
                "Access-Control-Allow-Origin": "*",
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
                <TextField id="image" label="" variant="filled" type="file" name="image" ref={imageRef} onChange={(e) => setImage(e.target.files[0])}/>
                <TextField id="estTimeOfPrep" label="Estimate time of prep" variant="filled" defaultValue={recipe.estTimeOfPrep} onChange={(e) => setEstTimeOfPrep(e.target.value)}/>
                <TextField id="ingredients" label="Ingredients" multiline rows={4} variant="filled" defaultValue={recipe.ingredients} onChange={(e) => setIngredients(e.target.value)}/>
                <TextField id="prepInstructions" label="Prep instructions" multiline rows={4} variant="filled" defaultValue={recipe.prepInstructions} onChange={(e) => setPrepInstructions(e.target.value)}/>
                <Button variant="contained" type="submit">Finish Editing</Button>
                <a href="/recipe-blog/mypage" style={{marginTop: '1%'}}>Go back</a>
            </div>
            </form>
            :
            <div className="recipe-card">
                <h1 style={{fontWeight: 900}}>{recipe.recipeName}</h1>
                <h3 style={{margin: '0%'}}>{recipe.cuisineType}</h3>
                <h4>{recipe.estTimeOfPrep}</h4>
                <img src={recipe?.image?.data?.data}/>
                <ul>
                    {recipe?.ingredients?.map((ingredient) => {
                        return (
                            <li>{ingredient}</li>
                        )
                    })}
                </ul>
                <p className="paragraphs">{recipe.prepInstructions}</p>
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
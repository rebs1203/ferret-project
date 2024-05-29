import { useRef, useState } from "react"
import { TextField, Button } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../styles/RecipesForm.css'

const RecipesForm = ({reloadList, setReloadList}) => {
    
    const [recipeName, setRecipeName] = useState('')
    const [cuisineType, setCuisineType] = useState('')
    const [image, setImage] = useState(null)
    const [estTimeOfPrep, setEstTimeOfPrep] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [prepInstructions, setPrepInstructions] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const userId = localStorage.getItem('user')

    const imageRef = useRef(null)
    const formRef = useRef(null)

    const handleRecipesForm = async (event) => {
        event.preventDefault()
        if (recipeName && cuisineType && image && estTimeOfPrep && ingredients && prepInstructions) {
            const formData = new FormData();
            formData.append('recipeName', recipeName);
            formData.append('createdBy', userId)
            formData.append('cuisineType', cuisineType);
            formData.append('image', image);
            formData.append('estTimeOfPrep', estTimeOfPrep);
            formData.append('ingredients', ingredients);
            formData.append('prepInstructions', prepInstructions);
            await fetchCreateRecipe(formData);
            formRef.current.reset()
            setImage(null)
        } else {
            alert('Please fill out all inputs.')
        }
        setCuisineType("")
        setEstTimeOfPrep("")
        setIngredients("")
        setPrepInstructions("")
        setRecipeName("")
    }

    const handleChange = (event) => {
        setCuisineType(event.target.value);
    };
    
    const fetchCreateRecipe = async (recipe) => {

        setErrorMessage(null);
        const token = localStorage.getItem('token')

        const url = `https://recipe-blog-l7ey.onrender.com/recipe-blog/mypage`

        const options = {
            method: 'POST',
            headers: {
                Authorization:`Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
            },
            body: recipe
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                setReloadList(reloadList + 1);
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            setErrorMessage("Request failed");
        }
    }
    
    
    return (
        <>
            {errorMessage !== null && (
                <div>
                    <h3 style={{textAlign: 'center', color: '#F00' }}>{errorMessage}</h3>
                </div>
            )}
            <form ref={formRef} onSubmit={handleRecipesForm}>
                <div className="form-div">
                <TextField id="recipeName" label="Recipe name" variant="filled" value={recipeName} onChange={(e) => setRecipeName(e.target.value)}/>
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
                <TextField id="image" label="" variant="filled" type="file" name="image" ref={imageRef} onChange={(e) => setImage(e.target.files[0])}/>
                <TextField id="estTimeOfPrep" label="Estimate time of prep" variant="filled" value={estTimeOfPrep} onChange={(e) => setEstTimeOfPrep(e.target.value)}/>
                <TextField id="ingredients" label="Ingredients" multiline rows={4} variant="filled" value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>
                <TextField id="prepInstructions" label="Prep instructions" multiline rows={4} variant="filled" value={prepInstructions} onChange={(e) => setPrepInstructions(e.target.value)}/>
                <Button variant="contained" type="submit" id="button">Add Recipe</Button>
                </div>
            </form>
        </>
    )
}

export default RecipesForm
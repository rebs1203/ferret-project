import './App.css';
import { useState } from 'react';
import Register from './components/Register.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import UsersPage from './components/UsersPage.js';
import RecipesForm from './components/RecipesForm.js';
import IndividualRecipe from './components/IndividualRecipe.js';
import RecipesPage from './components/RecipesPage.js';
import Nav from './components/Nav.js';

function App() {

  const [reloadList, setReloadList] = useState(0) 

  const decodeBase64 = (buffer) => {
    let typpedArray = new Uint8Array(buffer);
    const stringChar = typpedArray.reduce((data, byte)=> {
        return data + String.fromCharCode(byte);
        }, '')
    let base64String = window.btoa(stringChar)
    const decodedString = decodeURIComponent(
        atob(base64String)
        .split("")
        .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    )
    const imageUrl = `data:image/jpg;base64,${decodedString}`
    return imageUrl
}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Nav />
              <RecipesPage decodeBase64={decodeBase64}/>
            </>
          }>
          </Route>
          <Route path='/recipe-blog/register' element={
            <>
              <Nav />
              <Register />
            </>
          }>
          </Route>
          <Route path='/recipe-blog/logon' element={
            <>
              <Nav />
              <Login />
            </>
          }>
          </Route>
          <Route path='/recipe-blog/mypage' element={
            <>
              <Nav />
              <RecipesForm reloadList={reloadList} setReloadList={setReloadList} />
              <UsersPage reloadList={reloadList} setReloadList={setReloadList} decodeBase64={decodeBase64} />
            </>
          }>
          </Route>
          <Route path='/recipe-blog/mypage/:id' element={
            <>
              <IndividualRecipe decodeBase64={decodeBase64}/>
            </>
          }>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

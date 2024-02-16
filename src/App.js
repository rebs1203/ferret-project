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
  const [grantAccess, setGrantAccess] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Nav />
              <RecipesPage />
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
              <UsersPage reloadList={reloadList} setReloadList={setReloadList} />
            </>
          }>
          </Route>
          <Route path='/recipe-blog/mypage/:id' element={
            <>
              <IndividualRecipe />
            </>
          }>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import ToDo from './components/ToDo';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import axios from 'axios';
import { handleError } from './components/HelperFunctions';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let tokenFromLocalStorage = localStorage.getItem('token');

    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);

      let options = {
        method: 'get',
        url: '/user',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      axios(options)
        .then((res) => setUser(res.data))
        .catch((err) => handleError(err, setErrorMsg));
    }
  });

  function handleLogOut() {
    localStorage.removeItem('token');
    setToken(null);
  }

  if (!token) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route
              path='/login'
              element={<Login setToken={setToken} />}
            ></Route>
            <Route path='*' element={<Login setToken={setToken} />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Navbar handleLogOut={handleLogOut} user={user} />
        <Routes>
          <Route exact path='/' element={<ToDo token={token} />}></Route>
          <Route path='*' element={<ToDo token={token} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

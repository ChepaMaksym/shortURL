import './App.css';


import { fetchAllURL } from './allURL';
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom"

import Navbar from '../components/Navbar';
import Table from './pages/Table'
import Home from './pages/Home';
import Login from '../components/Login';
import Register from '../components/Register';




function App() {
    const[urls,setUrls] = useState([]);
    useEffect(() => {
        const fetchData = async() =>
            {
                let data = await fetchAllURL();
                setUrls(data);
            }
        fetchData();
    },
    [urls]);
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/table" element={<Table urls={urls}/>} />
                <Route path="/about" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}
export default App;
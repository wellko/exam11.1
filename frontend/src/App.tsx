import React from 'react';
import {CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolBar/AppToolBar";
import {Route, Routes} from "react-router-dom";
import Login from "./features/Users/Login";
import Register from "./features/Users/Register";
import ItemForm from "./features/Items/ItemForm";
import ItemsPage from "./features/Items/ItemsPage";
import OneItemPage from "./features/Items/OneItemPage";

function App() {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <Routes>
                <Route path="/" element={<ItemsPage/>}/>
                <Route path="/category/:id" element={<ItemsPage/>}/>
                <Route path="items/:id" element={<OneItemPage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/newItem" element={<ItemForm/>}/>
            </Routes>
        </>)
}

export default App;

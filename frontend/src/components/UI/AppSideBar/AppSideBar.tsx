import React from 'react';
import {Category} from "../../../types";
import {CircularProgress, List, MenuItem} from "@mui/material";
import {useAppSelector} from "../../../app/hooks";
import { selectStatusOfCategories} from "../../../features/categories/categoriesSlice";
import {useNavigate} from "react-router-dom";

interface props{
    categories: Category[]
}

const AppSideBar:React.FC<props> = ({categories}) => {
    const loading = useAppSelector(selectStatusOfCategories);
    const navigate = useNavigate();

    const onAction = (id: string) => {
    navigate('/category/' + id);
    }

    return (
        <List>
        <MenuItem  onClick={() => navigate('/')}>All Categories</MenuItem>
            {loading? <CircularProgress/> : (categories.map(el => <MenuItem key={Math.random()} onClick={() => onAction(el._id)}>{el.name}</MenuItem>))}
        </List>
    );
};

export default AppSideBar;
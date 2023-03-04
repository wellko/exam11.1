import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Box, Container, MenuItem, TextField} from "@mui/material";
import FileInput from "../../components/UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router-dom";
import {ItemData} from "../../types";
import {selectStatusOfPostingItems} from "./ItemsSlice";
import {newItem} from "./ItemsThunks";
import {selectStateOfCategories} from "../categories/categoriesSlice";
import {getCategories} from "../categories/categoriesThunks";


const ItemForm = () => {
    const dispatch = useAppDispatch();
    const posting = useAppSelector(selectStatusOfPostingItems);
    const navigate = useNavigate();
    const categories = useAppSelector(selectStateOfCategories);

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const initialState: ItemData = {
        title: '',
        image: null,
        description: '',
        price: 0,
        category: ''
    }
    const [post, setPost] = useState<ItemData>(initialState);

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setPost(prev => ({
                ...prev, [name]: files[0]
            }));
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPost(prev => ({...prev, [name]: value}));
    };

    const postData = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(newItem(post)).unwrap();
            setPost(initialState);
            navigate('/');
        } catch {
            throw new Error
        }
    }

    const disabled = !Boolean(post.description && post.title && post.image && post.category);

    return (
        <Container>
            <Box border={2} borderRadius={2} borderColor='secondary.main' sx={{bgcolor: '#FFF'}} marginBottom={3}>
                <form onSubmit={postData}>
                    <TextField name='title' required fullWidth label="Title: " id="fullWidth" onChange={onChange}
                               value={post.title}
                               margin='normal'/>
                    <TextField name='description' required fullWidth label="Message: " id="fullWidth"
                               onChange={onChange}
                               value={post.description}
                               margin='normal'/>
                    <TextField name='price' required fullWidth label="Price (only numbers) " id="fullWidth"
                               inputProps={{pattern: "[0-9]{1,10}"}}
                               onChange={onChange}
                               value={post.price}
                               margin='normal'/>
                    <TextField
                        select
                        name="category"
                        id="category"
                        value={post.category}
                        onChange={onChange}
                    >
                        categories &&{categories.map(el => <MenuItem key={Math.random()}
                                                                     value={el._id}>{el.name}</MenuItem>)}
                    </TextField>
                    <FileInput
                        label="Image required"
                        name="image"
                        onChange={fileInputChangeHandler}
                    />
                    <Box textAlign='center'>
                        <LoadingButton sx={{padding: '10px 40px'}} disabled={disabled} loading={posting} type='submit'
                                       variant='contained'>Post</LoadingButton>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default ItemForm;
import React, {useCallback, useEffect} from 'react';
import {AppBar, CircularProgress, Container, Grid, Paper, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectStateOfItems, selectStatusOfItems} from "./ItemsSlice";
import {getItemByCategory, getItems} from "./ItemsThunks";
import ItemCard from "../../components/ItemCard";
import AppSideBar from "../../components/UI/AppSideBar/AppSideBar";
import {selectStateOfCategories} from "../categories/categoriesSlice";
import {getCategories} from "../categories/categoriesThunks";
import {useParams} from "react-router-dom";

const PostPage = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectStateOfItems);
    const loading = useAppSelector(selectStatusOfItems);
    const categories = useAppSelector(selectStateOfCategories);

    const callBack = useCallback(async () => {
        if (id?.length) {
            await dispatch(getItemByCategory(id));
        } else {
            await dispatch(getItems());
        }

        await dispatch(getCategories());
    }, [dispatch, id])

    useEffect(() => {
        void callBack();
    }, [callBack])

    return (
        <Container fixed>
            <Grid container gap={1}>
                <Grid item xs={3}>
                    <AppBar position='sticky'>
                        <Paper elevation={12}>
                            <AppSideBar categories={categories}/>
                        </Paper>
                    </AppBar>
                </Grid>
                <Grid item xs={8}>
                    <Typography textAlign='center' variant='h3'>Lots:</Typography>
                    <Grid container gap={2}>
                        {loading ? <CircularProgress/> :
                            !items.length ? <Typography variant='h2'>There is no Items yet</Typography> :
                                (items.map(el => <ItemCard key={Math.random()} item={el}/>))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PostPage;
import React, {useEffect, useState} from 'react';
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {apiUrl} from "../../constants";
import {selectUser} from "../Users/UsersSlice";
import {selectStateOfOneItem, selectStatusOfDeleting, selectStatusOfItems} from "./ItemsSlice";
import {deleteItem, getOneItem} from "./ItemsThunks";
import {LoadingButton} from "@mui/lab";

const OneItemPage = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const items = useAppSelector(selectStateOfOneItem);
    const loading = useAppSelector(selectStatusOfItems);
    const deleting = useAppSelector(selectStatusOfDeleting);
    const item = items[0];

    const [permission, setPermission] = useState(true);

    useEffect(() => {
        if (user) {
            if(item){
                if (user._id.toString() === item.user._id.toString()){
                    setPermission(false);
                }else {
                    setPermission(true);
                }
            }
        }

    },[user, item])

    useEffect(() => {
        dispatch(getOneItem(id!));
    }, [dispatch, id])

    const oneDeleting = async () => {
        await dispatch(deleteItem(id!));
        navigate('/')
    }


    return (
        <Container fixed>
            {loading && <CircularProgress/>}
            {item && <Container fixed>
                <Typography textAlign='center' variant='h3'>Lot:</Typography>
                <Grid container gap={2}>
                    <Grid item xs={10}>
                        <Grid container>
                            <Grid item xs={12}>
                                <img
                                    height="200"
                                    src={apiUrl + item.image}
                                    alt="post"
                                /></Grid>
                            <Grid item xs={8}>
                                <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.black">
                                    {item.description}
                                </Typography>
                                <Typography variant="body2" color="text.black">
                                    {item.price} soms
                                </Typography>
                                <Typography variant="body2" color="text.secondary" marginLeft='auto'>
                                  seller : {item.user.displayName}  phone : {item.user.phoneNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>}
            {user && <LoadingButton variant='outlined' loading={deleting} disabled={permission} onClick={oneDeleting}>Delete Item</LoadingButton>}
        </Container>
    )};

export default OneItemPage;
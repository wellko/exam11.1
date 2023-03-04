import React from 'react';
import {Item} from "../types";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../constants";
import {useNavigate} from "react-router-dom";

interface state {
    item: Item,
}

const ItemCard: React.FC<state> = ({item}) => {
    let ImgUrl = apiUrl + item.image;

    const navigate = useNavigate();
    const onClickNavigate = () => {
        navigate('/items/' + item._id)
    };

    return (
        <Card sx={{maxWidth: 345}}>
            <CardActionArea onClick={onClickNavigate}>
                <CardMedia
                    component="img"
                    height="200"
                    image={ImgUrl}
                    alt="photo of item"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" marginLeft='auto'>
                        {item.price}  som
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ItemCard;
import React, {useState} from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {RegisterMutation} from '../../types';
import {Avatar, Box, Button, CircularProgress, Container, Grid, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectRegisterError, selectRegisterLoading} from './UsersSlice';
import {register} from './UsersThunks';

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const navigate = useNavigate();
    const loading = useAppSelector(selectRegisterLoading);

    const [state, setState] = useState<RegisterMutation>({
        username: '',
        password: '',
        phoneNumber: '',
        displayName: ''
    });

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(register(state)).unwrap();
            navigate('/');
        } catch (e) {
        }
    };

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                style={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registration
                </Typography>

                <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                name="username"
                                autoComplete="new-username"
                                value={state.username}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('username'))}
                                helperText={getFieldError('username')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={state.password}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('password'))}
                                helperText={getFieldError('password')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="displayName"
                                label="display name"
                                type="displayName"
                                value={state.displayName}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('displayName'))}
                                helperText={getFieldError('displayName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{pattern : "[0-9]{6, 12}"}}
                                name="phoneNumber"
                                label="phone number (only numbers at least 6)"
                                type="phoneNumber"
                                value={state.phoneNumber}
                                onChange={inputChangeHandler}
                                error={Boolean(getFieldError('phoneNumber'))}
                                helperText={getFieldError('phoneNumber')}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        {loading ? <CircularProgress/> : 'Sign Up'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
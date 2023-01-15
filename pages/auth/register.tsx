import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Grid, TextField, Typography, Button, Link, Chip } from '@mui/material';
import { ErrorOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import AuthLayout from '../../components/layouts/AuthLayout';
import { isEmail } from '../../utils/validations';
import { tesloApi } from '../../api';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth/AuthContext';

type FormData = {
    name: string,
    email: string,
    password: string,
  };

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)
    const router = useRouter();
    const { registerUser } = useContext(AuthContext)

    const onRegisterUser = async ({ name, email, password }: FormData) => {
        setShowError(false)
        const resp = await registerUser(name, email, password);
        if (resp.hasError) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        router.replace('/');
    }

    return (
    <AuthLayout title='Sign up'>
        <form onSubmit={handleSubmit(onRegisterUser)}>
            <Box sx={{ width: 350, padding: '10 20 px' }}>
                <Grid container>
                    <Grid item xs={12} mb={3}>
                        <Typography variant='h1' component='h1'>Sign up</Typography>
                        <Chip 
                            label='Something went wrong.'
                            color='error'
                            icon={<ErrorOutlined />}
                            className='fadeIn'
                            sx={{
                                display: showError ? 'flex' : 'none'
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} my={2}>
                        <TextField 
                            label='Fullname'
                            variant='filled'
                            fullWidth
                            { ...register('name', {
                                required: 'this field is required.'
                            }) }
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>

                    <Grid item xs={12} my={2}>
                        <TextField 
                            label='Email'
                            type='email'
                            variant='filled'
                            fullWidth
                            { ...register('email', {
                                required: 'this field is required.',
                                validate: (val) => isEmail(val)
                            }) }
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>

                    <Grid item xs={12} my={2}>
                        <TextField 
                            label='Password'
                            type='password'
                            variant='filled'
                            fullWidth
                            { ...register('password', {
                                required: 'this field is required.',
                                minLength: { value: 6, message: 'the password must contain at least 6 chars.' }
                            }) }
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>

                    <Grid item xs={12} my={2}>
                        <Button
                            color='secondary'
                            className='circular-btn'
                            fullWidth
                            type='submit'
                        >
                            Sign up
                        </Button>
                    </Grid>

                    <Grid item xs={12} my={2} textAlign='end'>
                        <NextLink href='/auth/login' passHref>
                            <Link>
                                Login
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
    )
}

export default RegisterPage;
import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { Box, Grid, TextField, Typography, Button, Link, Chip } from '@mui/material';
import { useForm } from 'react-hook-form';
import AuthLayout from '../../components/layouts/AuthLayout';
import { isEmail } from '../../utils/validations';
import { tesloApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '../../context/auth/AuthContext';
import { useRouter } from 'next/router';

type FormData = {
    email: string,
    password: string,
  };

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const router = useRouter();
    const destination = router.query.p?.toString() || '/';

    const { loginUser } = useContext(AuthContext)
    
    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false);

        const isValidLogin = await loginUser(email, password);

        if (!isValidLogin) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        router.replace(destination)
    }

    return (
    <AuthLayout title='Login'>
        <form onSubmit={handleSubmit(onLoginUser)}>
            <Box sx={{ width: 350, padding: '10 20 px' }}>
                <Grid container>
                    <Grid item xs={12} mb={3}>
                        <Typography variant='h1' component='h1'>Login</Typography>
                        <Chip 
                            label={`We don\'t know this user`}
                            color='error'
                            icon={<ErrorOutline />}
                            className='fadeIn'
                            sx={{
                                display: showError ? 'flex' : 'none'
                            }}
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
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        />
                    </Grid>

                    <Grid item xs={12} my={2}>
                        <TextField 
                            label='Password'
                            type='password'
                            variant='filled'
                            fullWidth
                            { ...register('password',{
                                required: 'this field is required.',
                                minLength: { value: 6, message: 'password must containt at least 6 chars.' }
                            }) }
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                        />
                    </Grid>

                    <Grid item xs={12} my={2}>
                        <Button
                            type='submit'
                            color='secondary'
                            className='circular-btn'
                            fullWidth
                        >
                            Login
                        </Button>
                    </Grid>

                    <Grid item xs={12} my={2} textAlign='end'>
                        <NextLink href={`/auth/register/` + (destination ? `?p=${destination}` : '')} passHref>
                            <Link>
                                Sign up
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
    )
}

export default LoginPage;
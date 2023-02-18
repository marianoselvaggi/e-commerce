import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils";
import { useForm } from 'react-hook-form';
import Cookie from 'js-cookie';
import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { useRouter } from 'next/router';

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string; 
    phone: string;
}

const AddressPage = () => {
    const { updateAddress } = useContext(CartContext);
    const router = useRouter();

    const getDefaultValues = (): FormData => {
        return {
            firstName: Cookie.get('firstName') || '',
            lastName: Cookie.get('lastName') || '',
            address: Cookie.get('address') || '',
            address2: Cookie.get('address2') || '',
            zip: Cookie.get('zip') || '',
            city: Cookie.get('city') || '',
            country: Cookie.get('country') || '',
            phone: Cookie.get('phone') || '',
        }
    }

    const {register, handleSubmit, formState: { errors }} = useForm<FormData>({
        defaultValues: getDefaultValues(),
    });
    
    const onSubmitAddress = async (data: FormData) => {
        updateAddress(data);
        router.push('/checkout/summary');
    };

    return (
    <ShopLayout title="Dirección" pageDescription="Confirmar dirección del destino">
        <form onSubmit={handleSubmit(onSubmitAddress)}>
            <Typography variant="h1" component='h1'>Dirección</Typography>

            <Grid container spacing={ 2 } sx={{ mt: 2 }}>
                <Grid item xs={12} sm={ 6 }>
                    <TextField
                        label='Firstname'
                        variant="filled"
                        fullWidth 
                        error={ !!errors.firstName }
                        {...register('firstName', {
                            required: 'This field is required.'
                        })} 
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Lastname' 
                        variant="filled" 
                        fullWidth 
                        error={ !!errors.lastName }
                        {...register('lastName', {
                            required: 'This field is required.'
                        })}
                    />
                </Grid>

                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Address' 
                        variant="filled" 
                        fullWidth 
                        error={ !!errors.address }
                        {...register('address', {
                            required: 'This field is required.'
                        })}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Dirección 2 (opcional)' 
                        variant="filled" 
                        fullWidth
                        {...register('address2')}
                    />
                </Grid>

                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Zipcode' 
                        variant="filled" 
                        fullWidth 
                        error={ !!errors.zip }
                        {...register('zip', {
                            required: 'This field is required.'
                        })}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Ciudad' 
                        variant="filled"
                        fullWidth
                        error={ !!errors.city }
                        {...register('city', {
                            required: 'This field is required.'
                        })}                        
                    />
                </Grid>
                
                <Grid item xs={12} sm={ 6 }>
                    <FormControl fullWidth>
                        <TextField
                            select
                            defaultValue={countries[0].code}
                            variant="filled"
                            label="Country"
                            error={ !!errors.country }
                            {...register('country', {
                                required: 'This field is required.'
                            })}
                        >
                            {
                                countries.map((countryItem: any) => (
                                    <MenuItem key={countryItem.code} value={countryItem.code}>{countryItem.name}</MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Phone' 
                        variant="filled"
                        fullWidth
                        error={ !!errors.phone }
                        {...register('phone', {
                            required: 'This field is required.'
                        })}                
                    />
                </Grid>

            </Grid>


            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <Button type="submit" color="secondary" className="circular-btn" size="large">
                    Revisar pedido
                </Button>
            </Box>
        </form>
    </ShopLayout>
    )
}

export default AddressPage
import { useContext } from 'react'
import { Grid, Typography } from "@mui/material"
import { CartContext } from '../../context/cart/';
import { formatNumber } from '../../utils';

export const OrderSummary = () => {
    const { subTotal, total, tax, numberOfItems  } = useContext(CartContext)
    
    return (
    <Grid container>
        <Grid item xs={6} mt={3}>
            <Typography>Order number</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end' mt={3}>
            <Typography>{numberOfItems}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Sub total</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ `${formatNumber(subTotal)}` }</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Taxes (${process.env.NEXT_PUBLIC_TAX_RATE || 0 * 100})</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ `${formatNumber(tax)}` }</Typography>
        </Grid>
        <Grid item xs={6} mt={3}>
            <Typography variant='subtitle1'>Total:</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end' mt={3}>
            <Typography variant='subtitle1'>{ `${formatNumber(total)}` }</Typography>
        </Grid>
    </Grid>
    )
}

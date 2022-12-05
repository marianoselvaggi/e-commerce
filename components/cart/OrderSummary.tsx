import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6} mt={3}>
            <Typography>Order number</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end' mt={3}>
            <Typography>3</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Sub total</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ `$${123.12}` }</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Taxes (15%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ `$${13.12}` }</Typography>
        </Grid>
        <Grid item xs={6} mt={3}>
            <Typography variant='subtitle1'>Total:</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end' mt={3}>
            <Typography variant='subtitle1'>{ `$${113.12}` }</Typography>
        </Grid>
    </Grid>
  )
}

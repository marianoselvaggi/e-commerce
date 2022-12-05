import NextLink from 'next/link';
import { Link, Grid, Typography, Chip } from '@mui/material';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Fullname', width: 300 },
    {
        field: 'paid',
        headerName: 'Payment',
        description: 'shows if the order was paid or not',
        width: 200,
        renderCell: (params: any) => {
            return (
                params.row.paid
                ? <Chip color='success' label='Paid' variant='outlined' />
                : <Chip color='error' label='Not paid' variant='outlined' />
            )
        }
    },
    { 
        field: 'order',
        headerName: 'Order link', 
        width: 300,
        sortable: false,
        renderCell: (params: any) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Go to order
                    </Link>
                </NextLink>
            )
        }
    }
];

const rows = [
    { id: 1, paid: false, fullName: 'Mariano Selvaggi' },
    { id: 2, paid: true, fullName: 'Pepe Selvaggi' },
    { id: 3, paid: true, fullName: 'Hernan Selvaggi' },
    { id: 4, paid: false, fullName: 'Jose Selvaggi' },
    { id: 5, paid: true, fullName: 'Beni Selvaggi' },
    { id: 6, paid: false, fullName: 'Indiana Selvaggi' },
];

const HistoryPage = () => {
  return (
    <ShopLayout title='History order' pageDescription='History of the orders'>
        <Typography variant='h1' component='h1'>Order history</Typography>

        <Grid container>
            <Grid item xs={12} sx={{ height: 650, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={ [10] }
                />
            </Grid>

        </Grid>

    </ShopLayout>
  )
}

export default HistoryPage;
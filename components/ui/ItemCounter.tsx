import { FC } from 'react';

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

interface Props {

}

export const ItemCounter: FC<Props> = () => {
  return (
    <Box display={'flex'} alignContent='center' flexDirection='row'>
        <RemoveCircleOutline />
        <Typography sx={{
            width: 40,
            textAlign: 'center',
        }}>1</Typography>
        <AddCircleOutline />
    </Box>
  )
}

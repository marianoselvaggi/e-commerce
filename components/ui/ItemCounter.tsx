import { FC, useState } from 'react';

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

interface Props {
  currentValue: number;
  maxValue: number;
  onValueUpdated: (value: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, onValueUpdated }) => {
  const [value, setValue] = useState(currentValue);

  const updateValue = (type: 'rest' | 'add') => {
    if (type == 'rest') {
      if (value == 1) return;
      setValue(value - 1);
      onValueUpdated(value - 1);
    } else {
      if (value < maxValue) {
        setValue(value + 1);
        onValueUpdated(value + 1);
      } else {
        return;
      }
    }
    return;
  }

  return (
    <Box display={'flex'} alignContent='center' flexDirection='row'>
        <RemoveCircleOutline
          onClick={() => updateValue('rest')}
        />
        <Typography sx={{
            width: 40,
            textAlign: 'center',
        }}>{value}</Typography>
        <AddCircleOutline 
          onClick={() => updateValue('add')}
        />
    </Box>
  )
}

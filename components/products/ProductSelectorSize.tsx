import { FC } from "react";
import { Box, Button } from "@mui/material";
import { ISizes } from "../../interfaces"

interface Props {
    selectedSize?: ISizes,
    sizes: ISizes[];
}

export const ProductSelectorSize: FC<Props> = ({ sizes, selectedSize }) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button 
                    key={size}
                    size='small'
                    color={size == selectedSize ? 'secondary' : 'info'}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}

import { FC } from "react";
import { Box, Button } from "@mui/material";
import { ISizes } from "../../interfaces"

interface Props {
    selectedSize?: ISizes;
    sizes: ISizes[];

    // method
    onSelectedSize: (size: ISizes) => void;
}

export const ProductSelectorSize: FC<Props> = ({ sizes, selectedSize, onSelectedSize }) => {
  return (
    <Box>
        {
            sizes.map(size => (
                <Button 
                    key={size}
                    size='small'
                    color={size == selectedSize ? 'secondary' : 'info'}
                    onClick={() => onSelectedSize(size)}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}

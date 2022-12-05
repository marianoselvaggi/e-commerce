import { Box, CircularProgress, Typography } from "@mui/material"

export const Loading = () => {
  return (
    <Box 
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
        flexDirection='column'
    >
        <Typography mb={2} variant='h2' fontSize={20} color='blue'>Loading</Typography>
        <CircularProgress />
    </Box>
  )
}

export default Loading
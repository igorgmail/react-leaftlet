import { Grid, Stack } from "@mui/material"

const UserLgBlock = () => {
  return (
    <Grid container
      rowSpacing={1}
      sx={{
        marginTop: '0.8rem',
        backgroundColor: '#078c75',
        color: 'white',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        paddingLeft: '.8rem'
      }}>

      <Grid item xs={6} sx={{ borderTopLeftRadius: '8px' }}>
        <Stack >Email</Stack>
      </Grid>
      <Grid item xs={6}>
        <Stack display={'flex'} alignItems={'center'}>Полномочия</Stack>
      </Grid>
    </Grid>
  )
}
export default UserLgBlock
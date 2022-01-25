import React from 'react'
import {} from './LoginPage.styles'
import {
  Grid,
  TextField,
  Paper,
  Avatar,
  Button,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material'
import {useTheme} from '@mui/material/styles'

const paperStyle = {
  padding: 20,
  // height: '70vh',
  minWidth: 280,
  maxWidth: 600,
  margin: '20px auto',
}
const avatarStyle = { backgroundColor: '#1bbd7e' }
const btnstyle = { margin: '8px 0' }

type LoginFormData = {
  username: string
  password: string
  retype_password: string
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    retype_password: '',
  })

  const theme = useTheme();

  const handleChange = (e: any) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setFormData((prev) => {
      let temp = prev
      Object.keys(temp).forEach((param: string) => {
        temp = { ...temp, [param]: '' }
      })

      return temp
    })
  }

  return (
    <Grid container padding="20px">
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid item style={{ display: 'grid', placeItems: 'center' }}>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h2">Sign Up</Typography>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="username"
                placeholder="Enter username"
                type="text"
                name="username"
                fullWidth
                required
                onChange={handleChange}
                value={formData.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="password"
                placeholder="Enter password"
                type="password"
                name="password"
                fullWidth
                required
                onChange={handleChange}
                value={formData.password}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="retype password"
                placeholder="Retype password"
                type="password"
                name="retype_password"
                fullWidth
                required
                onChange={handleChange}
                value={formData.retype_password}
              />
            </Grid>
          </Grid>

          {/*<FormControlLabel*/}
          {/*  control={<Checkbox name="checkedB" color="primary" />}*/}
          {/*  label="Remember me"*/}
          {/*/>*/}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
        </form>
        {/*<Typography>*/}
        {/*  <Link href="#">Forgot password ?</Link>*/}
        {/*</Typography>*/}
        <Typography>
          {' '}
          Do you haven't an account ?<NavLink style={{color: theme.palette.mode === 'dark' ?  'lightblue': 'darkblue'}} to="/signup">Sign up</NavLink>
        </Typography>
      </Paper>
    </Grid>
  )
}
export default LoginPage

import React from 'react'
import {} from './SignUpPage.styles'
import {
  Grid,
  TextField,
  Paper,
  Avatar,
  Button,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from '@mui/material'
import { useState } from 'react'
import { NavLink} from 'react-router-dom'
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material'
import {useTheme} from '@mui/material/styles'

const paperStyle = {
  padding: 20,
  // height: '70vh',
  minWidth: 280,
  maxWidth: 1000,
  margin: '20px auto',
}
const avatarStyle = { backgroundColor: '#1bbd7e' }
const btnstyle = { margin: '8px 0' }

type SignUpFormData = {
  first_name: string
  last_name: string
  username: string
  email: string
  birthday: string
  gender: string
  password: string
  retype_password: string
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    birthday: '',
    gender: '',
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First name"
                placeholder="Enter first name"
                type="text"
                name="first_name"
                fullWidth
                required
                onChange={handleChange}
                value={formData.first_name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last name"
                placeholder="Enter last name"
                type="text"
                name="last_name"
                fullWidth
                required
                onChange={handleChange}
                value={formData.last_name}
              />
            </Grid>

            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <TextField
                label="email"
                placeholder="Enter email"
                type="email"
                name="email"
                fullWidth
                required
                onChange={handleChange}
                value={formData.email}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Birthday"
                type="date"
                name="birthday"
                fullWidth
                required
                onChange={handleChange}
                value={formData.birthday}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormLabel id="gender">Gender *</FormLabel>
              <RadioGroup
                row
                aria-labelledby="gender"
                name="gender"
                onChange={handleChange}
                value={formData.gender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio required={true} />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio required={true} />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio required={true} />}
                  label="Other"
                />
              </RadioGroup>
            </Grid>

            <Grid item xs={12} md={6}>
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

            <Grid item xs={12} md={6}>
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
            Sign up
          </Button>
        </form>
        {/*<Typography>*/}
        {/*  <Link href="#">Forgot password ?</Link>*/}
        {/*</Typography>*/}
        <Typography>
          {' '}
          Do you have an account ?<NavLink style={{color: theme.palette.mode === 'dark' ?  'lightblue': 'darkblue'}} to="/login">Sign in</NavLink>
        </Typography>
      </Paper>
    </Grid>
  )
}
export default SignUpPage

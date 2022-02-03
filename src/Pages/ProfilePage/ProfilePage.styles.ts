import { styled} from "@mui/material/styles";
import {Paper, Switch} from "@mui/material";

export const Wrapper = styled(Paper)(({theme})=> ({
    height: '100vh',
}))

export const Input = styled('input')({
    display: 'none',
  });



  export const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 56,
    height: 32,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 30,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(18px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 4,
      '&.Mui-checked': {
        transform: 'translateX(24px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 24,
      height: 24,
      borderRadius: 12,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 32 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));
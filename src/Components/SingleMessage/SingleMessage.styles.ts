import {styled} from '@mui/material/styles'
import {Paper} from '@mui/material'

export const Wrapper = styled('div')(({theme})=> ({
width: '100%',
  padding: '0 15px',
  boxSizing: 'border-box'
}))

export const MessageContainer = styled(Paper)(({theme,id})=>{
  const me = id === 'me'
  return({
    zIndex: 10,
    margin: '20px 0',
  display: 'flex',
    flexDirection: 'column',
    padding: '7.5px 10px',
  width: '70%',
  marginLeft: me ? '30%': '',
  justifyContent: me ? 'flex-end' : '',
  backgroundColor: me ? theme.palette.primary.main : theme.palette.error.light,
    position: 'relative',
    borderRadius: '20px',
      color: theme.palette.primary.contrastText,
    lineBreak: 'anywhere',

    '& .timestamp':{
      margin: 0,
      textAlign: me ? 'right' : 'left'
    },
    '& .status':{
      display: 'flex',
      justifyContent: 'space-between'
    },

    '::after': me ? {
      content: '""',
      position: 'absolute',
      bottom: '-1.55rem',
      right: '1.25rem',
      width: 25,
      height: 25,
      backgroundColor: theme.palette.primary.main,
      clipPath: 'polygon(0 0, 100% 100%, 100% 0)'

    } : {
      content: '""',
      position: 'absolute',
      bottom: '-1.55rem',
      backgroundColor: theme.palette.error.light,
      left: '1.25rem',
      width: 25,
      height: 25,
      clipPath: 'polygon(0 0, 0 100%, 100% 0)'
    }
})})
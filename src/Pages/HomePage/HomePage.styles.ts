import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material'

export const Wrapper = styled(Paper)(({theme})=>({
  // maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  height: '93vh',
  borderRadius: 0,
  width: '100%',
  display: 'flex',
  overflow: 'hidden'
}))

export const TabsContainer = styled(Paper)(({theme}) => ({
  position: 'absolute',
  maxHeight: '80%',
  zIndex: '500',
  minWidth: 300,
  maxWidth: 600,
  // overflowY: 'scroll',
  // overflowX: 'hidden',

  margin: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

}))
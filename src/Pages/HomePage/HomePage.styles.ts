import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material'

export const Wrapper = styled('div')(({theme})=>({
  // maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
  height: '90vh',
  width: '100%',
  display: 'flex',
}))

export const TabsContainer = styled(Paper)(({theme}) => ({
  position: 'absolute',
  zIndex: '500',
  padding: 20,
  minWidth: 200,
  maxWidth: 600,
  margin: '20px auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

}))
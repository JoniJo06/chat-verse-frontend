import { styled } from '@mui/material/styles';
// import { Paper } from '@mui/material'

export const Wrapper = styled('div')(({theme})=>({
  maxHeight: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  width: '100%',
  display: 'flex',
}))

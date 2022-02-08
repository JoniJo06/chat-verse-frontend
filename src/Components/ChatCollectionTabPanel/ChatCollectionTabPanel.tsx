import { Box, Typography } from '@mui/material';
import React from 'react';
import { Wrapper, StyledBox } from './ChatCollectionTabPanel.styles'

interface MainProps {
    children?: React.ReactNode
    index: number
    value: number 
}


const ChatCollectionTabPanel: React.FC<MainProps> = ({children, index, value, ...other }) => {
  return <Wrapper 
  role="tabpanel"
  hidden={value !== index}
  id={`simple-tabpanel-${index}`}
  aria-labelledby={`simple-tab-${index}`}
  {...other}
  >
      {value === index && (
          <StyledBox>
                  {children}
          </StyledBox>
      )}
  </Wrapper>;
};

export default ChatCollectionTabPanel;

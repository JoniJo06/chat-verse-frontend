import { Box } from '@mui/material';
import React from 'react';
import { Wrapper } from './ProfilePageTabPanel.styles'

interface MainProps {
    children?: React.ReactNode
    index: number
    value: number 
}


const ProfilePageTabPanel: React.FC<MainProps> = ({children, index, value, ...other }) => {
  return <Wrapper 
  role="tabpanel"
  hidden={value !== index}
  id={`simple-tabpanel-${index}`}
  aria-labelledby={`simple-tab-${index}`}
  {...other}
  >
      {value === index && (
          <Box>
              <div>
                  {children}
              </div>
          </Box>
      )}
  </Wrapper>;
};

export default ProfilePageTabPanel;

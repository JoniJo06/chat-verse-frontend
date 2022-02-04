//Styles
import React, { useEffect, useState } from 'react';
import { TabsContainer, Wrapper } from './HomePage.styles';
import {
  ChatCollection,
  TopicCollection,
  Chat,
  ChatCollectionTabPanel,
} from '../../Components';
// import { RootState } from '../../Redux/Reducers';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChatType } from '../../Types';
import { ApplicationState } from '../../Redux';
import { connect } from 'react-redux';
import { Socket, User } from '../../Redux/Types';
import { Box, Tab, Tabs } from '@mui/material';

interface PropsFromState {
  user: User;
  userToken: string;
  socket: Socket;
}

// interface PropsFromDispatch {
//   setUserToken: (token: string) => void;
//   setUserStatus: (status: string) => void;
// }

type AllProps = PropsFromState;

const HomePage: React.FC<AllProps> = ({
  user /*, socket*/ /*, userToken*/,
}) => {
  const [tabPage, setTabPage] = useState<number>(0);
  const [currentChat, setCurrentChat] = useState<ChatType>({
    chat_id: '',
    icon: '',
    name: '',
    chat_partner: '',
  });
  const navigate = useNavigate();
  // console.log(socket)
  // console.log(userToken)


  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabPage(newValue);
  };

  return (
        <Wrapper>
          <TopicCollection />
          <Chat chat={currentChat} />
          <ChatCollection
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
          />
          {true && (
            <TabsContainer elevation={10}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabPage}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab label='Item One' {...a11yProps(0)} />
                  <Tab label='Item Two' {...a11yProps(1)} />
                </Tabs>
              </Box>
              <ChatCollectionTabPanel value={tabPage} index={0}>
                Item One
              </ChatCollectionTabPanel>
              <ChatCollectionTabPanel value={tabPage} index={1}>
                Item Two
              </ChatCollectionTabPanel>
            </TabsContainer>
          )}
        </Wrapper>
  );
};
const mapStateToProps = ({ user, userToken, socket }: ApplicationState) => ({
  user: user.data,
  userToken: userToken.data.userToken,
  socket: socket.data,
});

const mapDispatchProps = () => ({});
export default connect(mapStateToProps, mapDispatchProps)(HomePage);

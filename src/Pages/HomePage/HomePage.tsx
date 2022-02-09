//Styles
import React, { useEffect, useRef, useState } from 'react';
import { TabsContainer, Wrapper } from './HomePage.styles';
import { Chat, ChatCollection, ChatCollectionTabPanel } from '../../Components';
// import { RootState } from '../../Redux/Reducers';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChatType } from '../../Types';
import { ApplicationState } from '../../Redux';
import { connect } from 'react-redux';
import { Socket, User } from '../../Redux/Types';
import { Avatar, Box, Button, Paper, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import stringAvatar from '../../stringToAvatar';
import { toast } from 'react-toastify';
import { createChat } from '../../Socket';

type FriendType = {
  _id: string
  profile_pic: string
  username: string
}

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
                                        user, socket, userToken,
                                      }) => {
  const [ tabPage, setTabPage ] = useState<number>(0);
  const [ friendsListOpen, setFriendsListOpen ] = useState<boolean>(false);
  const [ friends, setFriends ] = useState<FriendType[]>();
  const [ currentChat, setCurrentChat ] = useState<ChatType>({
                                                               chat_id: '',
                                                               icon: '',
                                                               name: '',
                                                               chat_partner: '',
                                                             });
  const friendsListRef = useRef(null);
  const navigate = useNavigate();

  const closeOnOutsideClick = (ref: any) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      const handleClickOutside = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setFriendsListOpen(false);
        }
      };

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ ref ]);
  };

  useEffect(() => {
    const fetchData = async () => {

      if (friendsListOpen) {
        await axios(process.env.REACT_APP_BACKEND_URL + '/users/friends/info/chat-list', {
          headers: { JWT_TOKEN: userToken },
        })
          .then(({ data }) => setFriends(data))
          .catch(err => console.log(err));
      }
    createChat(socket, currentChat.chat_id, user.user_id);
    };
    void fetchData();
  }, [ friendsListOpen ]);

  closeOnOutsideClick(friendsListRef);
  // useEffect(() => {
  //   if(friendsListOpen){
  //     //@ts-ignore
  //     friendsListRef.current.focus()
  //   }
  // }, [ friendsListOpen ]);

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabPage(newValue);
  };

  const handleCreateChat = async (user_id: string) => {
    await axios(process.env.REACT_APP_BACKEND_URL + '/chats/' + user_id + '/create', {
      headers: { JWT_TOKEN: userToken },
    })
      .then(({ data }) => {
        toast.success('successful');
        setCurrentChat((prev: ChatType): ChatType => {
          return data.chat;
        });
      })
      .catch(err => {
        if (err.response.data.status === 'exist')
          toast.error('chat already exist');
        console.error({ err });
      });

    createChat(socket, currentChat.chat_id, user_id);
  };

  return (
    <Wrapper>
      {/*<TopicCollection />*/}
      <Chat chat={currentChat} />
      <ChatCollection
        currentChat={currentChat} setCurrentChat={setCurrentChat} setFriendsListOpen={setFriendsListOpen}
      />
      {friendsListOpen && (
        <TabsContainer ref={friendsListRef} elevation={10}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabPage} onChange={handleChange} aria-label='basic tabs example'
            >
              <Tab label='friends' {...a11yProps(0)} />
              <Tab label='create Group' disabled {...a11yProps(1)} />
            </Tabs>
          </Box>

          <ChatCollectionTabPanel value={tabPage} index={0}>

            {friends?.map((el: FriendType) => {
              return (

                <Paper
                  key={el._id} sx={(theme) => ({
                  borderBottom: theme.palette.mode === 'dark'
                                ? '1px solid white'
                                : '1px solid black',
                  borderRadius: 0,
                  padding: '5px 5px',
                  display: 'flex',
                  alignItems: 'center',
                })}
                >
                  <Button
                    sx={{display: 'flex', justifyContent: 'flex-start'}}
                    fullWidth onClick={() => {
                    void handleCreateChat(el._id);
                    setFriendsListOpen(false);
                  }}
                  >
                    {el.profile_pic ? <Avatar
                      alt={el.username} src={el.profile_pic} sx={{ width: 30, height: 30 }}
                    /> : <Avatar {...stringAvatar(el.username, 30)} />}
                    <Typography variant='h5'>{el.username}</Typography>

                  </Button>
                </Paper>
              );
            })}

          </ChatCollectionTabPanel>
          {/*<ChatCollectionTabPanel value={tabPage} index={1}>*/}
          {/*  Item Two*/}
          {/*</ChatCollectionTabPanel>*/}
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

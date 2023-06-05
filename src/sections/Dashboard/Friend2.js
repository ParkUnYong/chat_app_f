import { Dialog, Stack, Tabs, Tab, DialogContent } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FetchFriendRequests, FetchFriends, FetchUsers } from '../../redux/slices/app';
import { FriendComponent, FriendRequestsComponent, UserComponent } from '../../components/Friends';


const UserList2 = () =>{

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(FetchUsers());
    },[]);

    const {users} = useSelector((state=> state.app));

    return (
        <>
            {users.map((el,idx)=>{
                //TODO => render User UserComponent
                return <UserComponent key={el._id} {...el}/>
            })}    
        </>
    )
}

const FriendsRequestList2 = () =>{

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(FetchFriendRequests());
    },[]);

    const {friendRequests} = useSelector((state=> state.app));

    return (
        <>
            {friendRequests.map((el,idx)=>{
                // el => 요청객체 {_id,sender(_id,firstName, lastName, img online )}
                //TODO => render User Friend Requests Component
                return <FriendRequestsComponent key={el._id} {...el.sender} id={el._id}/>
            })}    
        </>
    )
}

const FriendsList2 = () =>{

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(FetchFriends());
    },[]);

    const {friends} = useSelector((state=> state.app));

    return (
        <>
            {friends.map((el,idx)=>{
                // el => 요청객체 {_id,sender(_id,firstName, lastName, img online )}
                //TODO => render User FriendComponent
                return <FriendComponent  key={el._id} {...el.sender} />
            })}    
        </>
    )
}



const Friend2 = ({ open, handleClose }) => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog fullWidth maxWidth="xs" open={open} keepMounted onClose={handleClose} sx={{ p: 4 }}>
            <Stack p={2} sx={{ width: "100%" }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Explore" />
                    <Tab label="Friends" />
                    <Tab label="Requests" />
                </Tabs>
            </Stack>
            {/* Dialog Content */}
            <DialogContent>
                <Stack sx = {{height : "100%"}}>
                    <Stack spacing={2.5}>
                        {(()=>{
                            switch (value) {
                                case 0:  // display all users
                                    return <UserList2/>
                                case 1:  // display all friends
                                    return <FriendsList2/>

                                case 2: // display all fruend requests 
                                    return <FriendsRequestList2/>
                                default:
                                    break;
                            }
                        })()}
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default Friend2
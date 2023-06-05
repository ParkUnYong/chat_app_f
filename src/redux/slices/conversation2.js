
import { faker } from "@faker-js/faker";
import {createSlice} from "@reduxjs/toolkit"

const user_id = window.localStorage.getItem("user_id")

const initialState = {
    direct_chat :{
        conversations : [],
        // 대화목록 저장 빈배열
        current_conversations : null,
        // 현재 대화목록 저장 객체임.
        current_messages : [],
        // 현재 메세지들.
    },
    group_chat : {},
};

const slice = createSlice({
    name : "conversation",
    initialState,
    reducers : {
        fetchDirectConversations(state, action){
            const list = action.payload.conversations.map((el)=>{
                const this_user = el.participants.find(
                    (elm) => elm._id.toString() !== user_id
                ) // 참가자 목록에서 해당 사람 여기로 가져옴
             return {
                id : el.id, // 사용자 아이디
                user_id : this_user._id, // 아마 대화하는 상대 아이디 
                name : `${this_user.firstName} ${this_user.lastName}`,
                online : this_user.status === "Online", // 온라인인지 아닌지
                img: faker.image.avatar(),
                msg : faker.music.songName(),
                time : "9:36", // 메세지 보낸시간..?
                pinned : false,
             }
            })
            state.direct_chat.conversations = list;
        },

        updateDirectConversation(state, action){
            // data = {}
            // list = list.map((el)=> el.id === data._id ?  data : el); 기본적으로 업데이트 해야할 목록 일단 그 목록을 가져와야함. 
            const this_conversation = action.payload.conversations;
            state.direct_chat.conversations = state.direct_chat.conversations.map((el)=>{
             if(el.id !== this_conversation._id){
                // 이 조건문이 맞지 않으면 대화 id와 요소가 다르다는걸 의미
                return el;
             }else{
                const user = this_conversation.participants.find((elm) => elm._id.toString() !== user_id)
                // 대충 참여자를 뺴내는거
                // user_id 현재 로그인중인 유저 아이디 
                // user은 우리와 통신하고 있는 다른 사용자
                return {
                    id : this_conversation._id,
                    user_id : user._id,
                    name : `${user.firstName} ${user.lastName}`,
                    online : user.status === "Online", // 온라인인지 아닌지
                    img: faker.image.avatar(),
                    msg : faker.music.songName(),
                    time : "9:36", // 메세지 보낸시간..?
                    pinned : false,

                }
             }     
            })
        },

        addDirectConversation(state, action){
            // list.push(data)
            const this_conversation = action.payload.conversations;
            const user = this_conversation.participants.find(
                (elm) => elm._id.toString() !== user_id
            );
            state.direct_chat.conversations.push({
                id : this_conversation._id,
                user_id : user._id,
                name : `${user.firstName} ${user.lastName}`,
                online : user.status === "Online", // 온라인인지 아닌지
                img: faker.image.avatar(),
                msg : faker.music.songName(),
                time : "9:36", // 메세지 보낸시간..?
                pinned : false,
            })
            
        }

    }
})

export default slice.reducer;

export const FetchDirectConversations = ({conversations}) =>{
    return async (dispatch,getState) =>{
        dispatch(slice.actions.fetchDirectConversations({conversations}));
    }
}

export const AddDirectConversation = ({conversations}) =>{
    return async (dispatch,getState) =>{
        dispatch(slice.actions.addDirectConversation({conversations}));
    }
}

export const UpdateDirectConversations = ({conversations}) =>{
    return async (dispatch,getState) =>{
        dispatch(slice.actions.updateDirectConversation({conversations}));
    }
}
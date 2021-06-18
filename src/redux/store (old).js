import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

const _ava = 'https://steamuserimages-a.akamaihd.net/ugc/250339495850728821/5F2735053134AC2FE8429D935FC70E7D7037F2C8/';

let storeOld = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12, dislikesCount: 2},
                {id: 2, message: 'Lazanya', likesCount: 34, dislikesCount: 0},
                {id: 3, message: 'It\'s my first post', likesCount: 5, dislikesCount: 0},
            ],
            newPostText: 'hello',
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dima', avatar: _ava},
                {id: 2, name: 'Andrey', avatar: _ava},
                {id: 3, name: 'Ilya', avatar: _ava},
                {id: 4, name: 'Pavel', avatar: _ava},
                {id: 5, name: 'Viktor', avatar: _ava},
                {id: 6, name: 'Timur', avatar: _ava},
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How are you'},
                {id: 3, message: 'Ky'},
                {id: 4, message: 'Ky'},
                {id: 5, message: 'Ky'},
                {id: 6, message: 'Ky'},
            ],
            newMessageBody: '',
        },
        sidebar: {
            friends: [
                {id: 1, name: 'Nastya', avatar: _ava},
                {id: 2, name: 'Tommi', avatar: _ava},
                {id: 3, name: 'John', avatar: _ava},
                {id: 4, name: 'James', avatar: _ava},
            ],
        },
    },
    _callSubscriber() {
        console.log('State was changed')
    },

    getState() {
        return this._state;
    },
    subscribe(observer){
        this._callSubscriber = observer;
    },

    dispatch(action){   //  { type: 'ADD-POST' }

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    },
}
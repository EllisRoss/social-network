import usersReducer, {InitialStateType, usersActions} from "../usersReducer";

let state: InitialStateType = {
    users: [
        {
            id: 0, name: "Albert 0", followed: false,
            status: "status 0", photos: {small: null, large: null}
        },
        {
            id: 1, name: "Albert 1", followed: false,
            status: "status 1", photos: {small: null, large: null}
        },
        {
            id: 2, name: "Albert 2", followed: true,
            status: "status 2", photos: {small: null, large: null}
        },
        {
            id: 3, name: "Albert 3", followed: true,
            status: "status 3", photos: {small: null, large: null}
        },
    ],
    friends: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
        friend: null,
        term: '',
    }
}

beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: "Albert 0", followed: false,
                status: "status 0", photos: {small: null, large: null}
            },
            {
                id: 1, name: "Albert 1", followed: false,
                status: "status 1", photos: {small: null, large: null}
            },
            {
                id: 2, name: "Albert 2", followed: true,
                status: "status 2", photos: {small: null, large: null}
            },
            {
                id: 3, name: "Albert 3", followed: true,
                status: "status 3", photos: {small: null, large: null}
            },
        ],
        friends: [],
        pageSize: 20,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            friend: null,
            term: '',
        }
    }
})

test("follow success", () => {
    const newState = usersReducer(state, usersActions.follow(1))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {
    const newState = usersReducer(state, usersActions.unfollow(3))

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});

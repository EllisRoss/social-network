import {followThunkCreator, getFriendsThunkCreator, unfollowThunkCreator, usersActions} from "../usersReducer";
import {usersAPI} from "../../api/usersAPI";
import {ApiResponseType, ResultCodes} from "../../api/api";

jest.mock("../api/usersAPI");
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: ApiResponseType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {},
}

const dispatchMock = jest.fn();
const getStateMock = jest.fn();
beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
})

test("follow thunk success",  async() => {
    userAPIMock.follow.mockResolvedValue(result);
    const thunk = followThunkCreator(1);

    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleIsFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.follow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleIsFollowingProgress(false, 1));
    //expect(dispatchMock).toHaveBeenNthCalledWith(4, getFriendsThunkCreator(100));
});

test("unfollow thunk success",  async() => {
    userAPIMock.unfollow.mockResolvedValue(result);
    const thunk = unfollowThunkCreator(1);

    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleIsFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unfollow(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleIsFollowingProgress(false, 1));
    //expect(dispatchMock).toHaveBeenNthCalledWith(4, getFriendsThunkCreator(100));
});

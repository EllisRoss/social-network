import React, {useEffect} from "react"
import styles from './Users.module.css';
import Paginator from "../common/Paginator/Paginator"
import User from "./User"
import Preloader from "../common/Preloader/Preloader";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, followThunkCreator, getUsersThunkCreator, unfollowThunkCreator} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/usersSelectors";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";
import preloader100px from "../../assets/images/preloader100px.svg";

type PropsType = {}

type QueryParamsType = { term?: string; page?: string; friend?: string };
const Users: React.FC<PropsType> = React.memo((props) => {
    console.log("Render Users");
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const isFetching = useSelector(getIsFetching);
    const filter = useSelector(getFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;

        let actualPage = currentPage;
        let actualFilter = filter;

        if (!!parsed.page) actualPage = Number(parsed.page);
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        // if (!!parsed.friend) actualFilter = {
        //     ...actualFilter,
        //     friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false
        // }

        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter));
    }, []);

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term;
        if (filter.friend !== null) query.friend = String(filter.friend);
        if (currentPage !== 1) query.page = String(currentPage);


        history.push({
            pathname: "/users",
            search: queryString.stringify(query)
        });
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number): void => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType): void => {
        dispatch(getUsersThunkCreator(1, pageSize, filter));
    }
    const follow = (userId: number): void => {
        dispatch(followThunkCreator(userId));
    }
    const unfollow = (userId: number): void => {
        dispatch(unfollowThunkCreator(userId));
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged} portionSize={15}/>
            {isFetching ? <Preloader src={preloader100px}/> : null}
            <div className={styles.usersList}>
                {
                    users.map(u => <User key={u.id}
                                         user={u}
                                         follow={follow}
                                         unfollow={unfollow}
                                         followingInProgress={followingInProgress}/>
                    )
                }
            </div>
        </div>
    )
})

export default compose<React.ComponentType>(
    WithAuthRedirect,
)(Users);

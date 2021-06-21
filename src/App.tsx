import React from 'react';
import './App.css';
import {Layout, Menu, Breadcrumb} from 'antd';
import {
    TeamOutlined,
    ContainerOutlined,
    SettingOutlined,
    CustomerServiceOutlined,
    MessageOutlined,
    UserOutlined,
    WechatOutlined,
} from '@ant-design/icons';
import store, {AppStateType} from "./redux/reduxStore";
import {setInitializedThunkCreator} from "./redux/appReducer";
import {connect, Provider} from "react-redux";
import {BrowserRouter, NavLink, Redirect, Route, Switch} from "react-router-dom";
import {withSuspense} from "./hoc/withSuspence";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

import {LoginPage} from "./components/Login/LoginPage";
import Preloader from './components/common/Preloader/Preloader';
import News from './components/News/News';
import Music from './components/Music/Music';
import {AppHeader} from "./components/Header/Header";
import preloader800px from "./assets/images/preloader800px.svg";
const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

type PropsType = {
    initialized: boolean,
    initialize: () => void,
}

const Profile = React.lazy(() => import('./components/Profile/ProfileContainer'));
const Users = React.lazy(() => import('./components/Users/Users'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));
const Chat = React.lazy(() => import('./pages/Chat/ChatPage'));


const UsersWithSuspense = withSuspense(Users);
const ProfileWithSuspense = withSuspense(Profile);
const SettingsWithSuspense = withSuspense(Settings);
const ChatWithSuspence = withSuspense(Chat);

class App extends React.Component<PropsType> {
    catchAllUnhandledErrors = (event: PromiseRejectionEvent) => {
        alert(event.reason);
    }

    componentDidMount() {
        this.props.initialize();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    state = {
        collapsed: false,
    };
    onCollapse = (collapsed: boolean) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        if (!this.props.initialized) {
            return <Preloader src={preloader800px}/>
        }
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to='/profile'>
                                Profile
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<MessageOutlined />}>
                            <NavLink to='/dialogs'>
                                Messages
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ContainerOutlined />}>
                            <NavLink to='/news'>
                                News
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<CustomerServiceOutlined />}>
                            <NavLink to='/music'>
                                Music
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<TeamOutlined />}>
                            <NavLink to='/users'>
                                Users
                            </NavLink>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<SettingOutlined />} title="Settings">
                            <Menu.Item key="6">
                                <NavLink to='/settings'>
                                    General
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="7">Profile</Menu.Item>
                        </SubMenu>

                        <Menu.Item key="8" icon={<WechatOutlined />}>
                            <NavLink to='/chat'>
                                Chat
                            </NavLink>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <AppHeader />
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Switch>
                                <Route exact path='/' render={() => <Redirect to='/news'/>}/>
                                <Route path='/profile/:userId?' render={() => <ProfileWithSuspense/>}/>
                                <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                                <Route path='/news' render={() => <News/>}/>
                                <Route path='/music' render={() => <Music/>}/>
                                <Route path='/settings' render={() => <SettingsWithSuspense/>}/>
                                <Route path='/users' render={() => <UsersWithSuspense/>}/>
                                <Route path='/login' render={() => <LoginPage/>}/>
                                <Route path='/chat' render={() => <ChatWithSuspence/>}/>
                                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Social Network</Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
})

let mapDispatchToProps = {
    initialize: setInitializedThunkCreator,
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export const SocialNetworkApp: React.FC = () => {
    return (
        // <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <AppContainer/>
                </Provider>
            </BrowserRouter>
        // </React.StrictMode>
    );
}

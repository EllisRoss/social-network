import React, {useState} from "react";
import {NavLink} from "react-router-dom";


import {
    ContainerOutlined,
    CustomerServiceOutlined,
    MessageOutlined, SettingOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";

import SubMenu from "antd/lib/menu/SubMenu";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";

export const Navbar: React.FC = () => {

    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed: boolean) => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
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
                {/*///////////////////// test*/}
                <Menu.Item key="8" icon={<CustomerServiceOutlined />}>
                    <NavLink to='/chat'>
                        Chat
                    </NavLink>
                </Menu.Item>
                {/*///////////////////// test*/}
            </Menu>
        </Sider>
    );
}

//export default Navbar;

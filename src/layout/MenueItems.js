import React from 'react';
import { Menu } from 'antd';
import { DumbbellIcon, GoalIcon, HeartPulseIcon, Users2Icon, Utensils } from 'lucide-react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import { NavTitle } from './style';
import { decryptData } from '../utils/helper-functions';

const { SubMenu } = Menu;

// eslint-disable-next-line react/prop-types
const DietitcianMenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item key="diticain-per-users" icon={<FeatherIcon icon="bar-chart" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/my-users`}>
          Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item key="progress" icon={<GoalIcon style={{ color: '#b6bcd6' }} size={20} />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/progress`}>
          Progress
        </NavLink>
      </Menu.Item>

      <SubMenu key="meals" icon={!topMenu && <Utensils style={{ color: '#b6bcd6' }} />} title="Meals">
        <Menu.Item key="user-meals">
          <NavLink onClick={toggleCollapsed} to={`${path}/users-meals`}>
            Assign Meals
          </NavLink>
        </Menu.Item>

        <Menu.Item key="meals-log">
          <NavLink onClick={toggleCollapsed} to={`${path}/meals-log`}>
            Meals Log
          </NavLink>
        </Menu.Item>
        <Menu.Item key="create-meal">
          <NavLink onClick={toggleCollapsed} to={`${path}/create-meal`}>
            Create Meal
          </NavLink>
        </Menu.Item>
        <Menu.Item key="dishes">
          <NavLink onClick={toggleCollapsed} to={`${path}/dishes`}>
            Dishes
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="workouts" icon={!topMenu && <DumbbellIcon style={{ color: '#b6bcd6' }} />} title="Workouts">
        <Menu.Item key="users-workouts">
          <NavLink onClick={toggleCollapsed} to={`${path}/users-workouts`}>
            Assign Workouts
          </NavLink>
        </Menu.Item>
        <Menu.Item key="workout-log">
          <NavLink onClick={toggleCollapsed} to={`${path}/workout-log`}>
            Workout Logs
          </NavLink>
        </Menu.Item>
        <Menu.Item key="create-workout">
          <NavLink onClick={toggleCollapsed} to={`${path}/create-workout`}>
            Create Workout
          </NavLink>
        </Menu.Item>
        <Menu.Item key="create-exercise">
          <NavLink onClick={toggleCollapsed} to={`${path}/create-workout/exercise`}>
            Create Exercise
          </NavLink>
        </Menu.Item>
        <Menu.Item key="all-workouts">
          <NavLink onClick={toggleCollapsed} to={`${path}/workouts`}>
            Workouts
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/my-chats`}>
              <FeatherIcon icon="message-square" />
            </NavLink>
          )
        }
        key="chat"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/my-chats`}>
          Chat
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/app/calendar/month`}>
              <FeatherIcon icon="calendar" />
            </NavLink>
          )
        }
        key="main-calendar"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/app/calendar/month`}>
          Calendar
        </NavLink>
      </Menu.Item>
      <SubMenu key="email" icon={!topMenu && <FeatherIcon icon="mail" />} title="Email">
        <Menu.Item key="inbox">
          <NavLink onClick={toggleCollapsed} to={`${path}/email/inbox`}>
            Inbox
          </NavLink>
        </Menu.Item>
        <Menu.Item key="single">
          <NavLink onClick={toggleCollapsed} to={`${path}/email/single/1585118055048`}>
            Read Email
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="contact" icon={!topMenu && <FeatherIcon icon="user-plus" />} title="Contact">
        <Menu.Item key="contact-grid">
          <NavLink onClick={toggleCollapsed} to={`${path}/contact/grid`}>
            Contact Grid
          </NavLink>
        </Menu.Item>
        <Menu.Item key="contact-list">
          <NavLink onClick={toggleCollapsed} to={`${path}/contact/list`}>
            Contact List
          </NavLink>
        </Menu.Item>
        <Menu.Item key="addNew">
          <NavLink onClick={toggleCollapsed} to={`${path}/contact/addNew`}>
            Contact Create
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/app/note/all`}>
              <FeatherIcon icon="file-text" />
            </NavLink>
          )
        }
        key="note"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/app/note/all`}>
          Note
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/app/to-do`}>
              <FeatherIcon icon="check-square" />
            </NavLink>
          )
        }
        key="to-do"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/app/to-do`}>
          To Do
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <ReactSVG className="sDash_menu-item-icon" src={require('../static/img/icon/columns.svg').default} />
          )
        }
        key="kanban"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/app/kanban`}>
          Kanban Board
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<FeatherIcon icon="file" />} key="task">
        <NavLink onClick={toggleCollapsed} to={`${path}/app/task/all`}>
          Task
          <span className="badge badge-success">New</span>
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

function MenuItems({ darkMode, toggleCollapsed, topMenu }) {
  const { role } = useSelector((state) => {
    return {
      role: state.auth.role,
    };
  });
  const userRole = decryptData({ ciphertext: role, key: process.env.REACT_APP_COOKIE_SECRET });
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };
  if (userRole === 'admin') {
    return (
      <Menu
        onOpenChange={onOpenChange}
        onClick={onClick}
        mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
        theme={darkMode && 'dark'}
        // // eslint-disable-next-line no-nested-ternary
        defaultSelectedKeys={
          !topMenu
            ? [
                `${
                  mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
                }`,
              ]
            : []
        }
        defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
        overflowedIndicator={<FeatherIcon icon="more-vertical" />}
        openKeys={openKeys}
      >
        <Menu.Item key="sales" icon={<FeatherIcon icon="bar-chart" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/sales`}>
            Dashboard
          </NavLink>
        </Menu.Item>
        <Menu.Item key="progress" icon={<GoalIcon style={{ color: '#b6bcd6' }} size={20} />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/progress`}>
            Progress
          </NavLink>
        </Menu.Item>
        <Menu.Item key="users-info" icon={<Users2Icon style={{ color: '#b6bcd6' }} size={20} />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/all-users`}>
            Users
          </NavLink>
        </Menu.Item>

        {/* <SubMenu key="profile" icon={!topMenu && <FeatherIcon icon="aperture" />} title="Users">
        <Menu.Item key="myProfile">
          <NavLink onClick={toggleCollapsed} to={`${path}/profile/myProfile/overview`}>
            My Profile
          </NavLink>
        </Menu.Item>
        <Menu.Item key="profileTimeline">
          <NavLink onClick={toggleCollapsed} to={`${path}/profile/myProfile/timeline`}>
            Timeline
          </NavLink>
        </Menu.Item>
        <Menu.Item key="profileActivity">
          <NavLink onClick={toggleCollapsed} to={`${path}/profile/myProfile/activity`}>
            Activity
          </NavLink>
        </Menu.Item>
      </SubMenu> */}
        <SubMenu key="meals" icon={!topMenu && <Utensils style={{ color: '#b6bcd6' }} />} title="Meals">
          <Menu.Item key="user-meals">
            <NavLink onClick={toggleCollapsed} to={`${path}/users-meals`}>
              Assign Meals
            </NavLink>
          </Menu.Item>

          <Menu.Item key="meals-log">
            <NavLink onClick={toggleCollapsed} to={`${path}/meals-log`}>
              Meals Log
            </NavLink>
          </Menu.Item>
          <Menu.Item key="create-meal">
            <NavLink onClick={toggleCollapsed} to={`${path}/create-meal`}>
              Create Meal
            </NavLink>
          </Menu.Item>
          <Menu.Item key="dishes">
            <NavLink onClick={toggleCollapsed} to={`${path}/dishes`}>
              Dishes
            </NavLink>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="workouts" icon={!topMenu && <DumbbellIcon style={{ color: '#b6bcd6' }} />} title="Workouts">
          <Menu.Item key="users-workouts">
            <NavLink onClick={toggleCollapsed} to={`${path}/users-workouts`}>
              Assign Workouts
            </NavLink>
          </Menu.Item>
          <Menu.Item key="workout-log">
            <NavLink onClick={toggleCollapsed} to={`${path}/workout-log`}>
              Workout Logs
            </NavLink>
          </Menu.Item>
          <Menu.Item key="create-workout">
            <NavLink onClick={toggleCollapsed} to={`${path}/create-workout`}>
              Create Workout
            </NavLink>
          </Menu.Item>
          <Menu.Item key="create-exercise">
            <NavLink onClick={toggleCollapsed} to={`${path}/create-workout/exercise`}>
              Create Exercise
            </NavLink>
          </Menu.Item>
          <Menu.Item key="all-workouts">
            <NavLink onClick={toggleCollapsed} to={`${path}/workouts`}>
              Workouts
            </NavLink>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="dietitian" icon={!topMenu && <HeartPulseIcon style={{ color: '#b6bcd6' }} />} title="Dietitian">
          <Menu.Item key="add-dietitian">
            <NavLink onClick={toggleCollapsed} to={`${path}/add-dietitian/`}>
              Add Dietician
            </NavLink>
          </Menu.Item>
          <Menu.Item key="dietitian-table">
            <NavLink onClick={toggleCollapsed} to={`${path}/dietitians`}>
              All Dieticians
            </NavLink>
          </Menu.Item>
          <Menu.Item key="dietitian-logs">
            <NavLink onClick={toggleCollapsed} to={`${path}/dietitian-logs`}>
              Dietician Logs
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/my-chats`}>
                <FeatherIcon icon="message-square" />
              </NavLink>
            )
          }
          key="chat"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/my-chats`}>
            Chat
          </NavLink>
        </Menu.Item>
        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/app/calendar/month`}>
                <FeatherIcon icon="calendar" />
              </NavLink>
            )
          }
          key="main-calendar"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/app/calendar/month`}>
            Calendar
          </NavLink>
        </Menu.Item>
        <SubMenu key="email" icon={!topMenu && <FeatherIcon icon="mail" />} title="Email">
          <Menu.Item key="inbox">
            <NavLink onClick={toggleCollapsed} to={`${path}/email/inbox`}>
              Inbox
            </NavLink>
          </Menu.Item>
          <Menu.Item key="single">
            <NavLink onClick={toggleCollapsed} to={`${path}/email/single/1585118055048`}>
              Read Email
            </NavLink>
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/pricing`}>
                <FeatherIcon icon="dollar-sign" />
              </NavLink>
            )
          }
          key="pricing"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/pricing`}>
            Pricing
          </NavLink>
        </Menu.Item>
        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/app-banners`}>
                <FeatherIcon icon="cast" />
              </NavLink>
            )
          }
          key="banners"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/app-banners`}>
            Banners
          </NavLink>
        </Menu.Item>
        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/testimonials`}>
                <FeatherIcon icon="book-open" />
              </NavLink>
            )
          }
          key="testimonials"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/testimonials`}>
            Testimonials
          </NavLink>
        </Menu.Item>
        {/* <SubMenu key="users" icon={!topMenu && <FeatherIcon icon="users" />} title="Users">
          <Menu.Item key="team">
            <NavLink onClick={toggleCollapsed} to={`${path}/users/team`}>
              Team
            </NavLink>
          </Menu.Item>
          <Menu.Item key="user-grid">
            <NavLink onClick={toggleCollapsed} to={`${path}/users/grid`}>
              Users Grid
            </NavLink>
          </Menu.Item>
          <Menu.Item key="user-list">
            <NavLink onClick={toggleCollapsed} to={`${path}/users/list`}>
              Users List
            </NavLink>
          </Menu.Item>
          <Menu.Item key="grid-style">
            <NavLink onClick={toggleCollapsed} to={`${path}/users/grid-style`}>
              Users Grid Style
            </NavLink>
          </Menu.Item>
          <Menu.Item key="grid-group">
            <NavLink onClick={toggleCollapsed} to={`${path}/users/grid-group`}>
              Users Group
            </NavLink>
          </Menu.Item>
          <Menu.Item key="addUser">
            <NavLink onClick={toggleCollapsed} to={`${path}/users/add-user/info`}>
              Add User
            </NavLink>
          </Menu.Item>
          <Menu.Item key="users-table">
            <NavLink onClick={toggleCollapsed} to={`${path}/users/dataTable`}>
              Users Table
            </NavLink>
          </Menu.Item>
        </SubMenu> */}

        <SubMenu key="contact" icon={!topMenu && <FeatherIcon icon="user-plus" />} title="Contact">
          <Menu.Item key="contact-grid">
            <NavLink onClick={toggleCollapsed} to={`${path}/contact/grid`}>
              Contact Grid
            </NavLink>
          </Menu.Item>
          <Menu.Item key="contact-list">
            <NavLink onClick={toggleCollapsed} to={`${path}/contact/list`}>
              Contact List
            </NavLink>
          </Menu.Item>
          <Menu.Item key="addNew">
            <NavLink onClick={toggleCollapsed} to={`${path}/contact/addNew`}>
              Contact Create
            </NavLink>
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/app/note/all`}>
                <FeatherIcon icon="file-text" />
              </NavLink>
            )
          }
          key="note"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/app/note/all`}>
            Note
          </NavLink>
        </Menu.Item>

        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/app/to-do`}>
                <FeatherIcon icon="check-square" />
              </NavLink>
            )
          }
          key="to-do"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/app/to-do`}>
            To Do
          </NavLink>
        </Menu.Item>
        <Menu.Item
          icon={
            !topMenu && (
              <ReactSVG className="sDash_menu-item-icon" src={require('../static/img/icon/columns.svg').default} />
            )
          }
          key="kanban"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/app/kanban`}>
            Kanban Board
          </NavLink>
        </Menu.Item>
        {/* <SubMenu
        key="importExport"
        icon={
          !topMenu && (
            <ReactSVG className="sDash_menu-item-icon" src={require('../static/img/icon/repeat.svg').default} />
          )
        }
        title={<span className="pl-0">Import Export</span>}
      >
        <Menu.Item key="import">
          <NavLink onClick={toggleCollapsed} to={`${path}/importExport/import`}>
            Import
          </NavLink>
        </Menu.Item>
        <Menu.Item key="export">
          <NavLink onClick={toggleCollapsed} to={`${path}/importExport/export`}>
            Export
          </NavLink>
        </Menu.Item>
      </SubMenu> */}
        <Menu.Item icon={!topMenu && <FeatherIcon icon="file" />} key="task">
          <NavLink onClick={toggleCollapsed} to={`${path}/app/task/all`}>
            Task
            <span className="badge badge-success">New</span>
          </NavLink>
        </Menu.Item>

        {!topMenu && <NavTitle className="sidebar-nav-title">Features</NavTitle>}

        {/* <SubMenu key="components" icon={!topMenu && <FeatherIcon icon="layers" />} title="UI Elements">
        <Menu.Item key="alerts">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/alerts`}>
            Alerts
          </NavLink>
        </Menu.Item>
        <Menu.Item key="auto-complete">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/auto-complete`}>
            AutoComplete
          </NavLink>
        </Menu.Item>
        <Menu.Item key="avatar">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/avatar`}>
            Avatar
          </NavLink>
        </Menu.Item>
        <Menu.Item key="badge">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/badge`}>
            Badge
          </NavLink>
        </Menu.Item>
        <Menu.Item key="breadcrumb">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/breadcrumb`}>
            Breadcrumb
          </NavLink>
        </Menu.Item>
        <Menu.Item key="button">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/button`}>
            Button
          </NavLink>
        </Menu.Item>
        <Menu.Item key="calendar">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/calendar`}>
            Calendar
          </NavLink>
        </Menu.Item>
        <Menu.Item key="cards">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/cards`}>
            Cards
          </NavLink>
        </Menu.Item>
        <Menu.Item key="carousel">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/carousel`}>
            Carousel
          </NavLink>
        </Menu.Item>
        <Menu.Item key="cascader">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/cascader`}>
            Cascader
          </NavLink>
        </Menu.Item>
        <Menu.Item key="checkbox">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/checkbox`}>
            Checkbox
          </NavLink>
        </Menu.Item>
        <Menu.Item key="collapse">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/collapse`}>
            Collapse
          </NavLink>
        </Menu.Item>
        <Menu.Item key="comments">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/comments`}>
            Comments
          </NavLink>
        </Menu.Item>
        <Menu.Item key="base">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/base`}>
            Dashboard Base
          </NavLink>
        </Menu.Item>
        <Menu.Item key="date-picker">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/date-picker`}>
            DatePicker
          </NavLink>
        </Menu.Item>
        <Menu.Item key="drag">
          <NavLink to="/admin/components/drag">Drag & Drop</NavLink>
        </Menu.Item>
        <Menu.Item key="drawer">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/drawer`}>
            Drawer
          </NavLink>
        </Menu.Item>
        <Menu.Item key="dropdown">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/dropdown`}>
            Dropdown
          </NavLink>
        </Menu.Item>
        <Menu.Item key="empty">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/empty`}>
            Empty
          </NavLink>
        </Menu.Item>
        <Menu.Item key="component-grid">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/grid`}>
            Grid
          </NavLink>
        </Menu.Item>
        <Menu.Item key="input">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/input`}>
            Input
          </NavLink>
        </Menu.Item>
        <Menu.Item key="component-list">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/list`}>
            List
          </NavLink>
        </Menu.Item>
        <Menu.Item key="menu">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/menu`}>
            Menu
          </NavLink>
        </Menu.Item>
        <Menu.Item key="message">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/message`}>
            Message
          </NavLink>
        </Menu.Item>
        <Menu.Item key="modals">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/modals`}>
            Modals
          </NavLink>
        </Menu.Item>
        <Menu.Item key="notification">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/notification`}>
            Notification
          </NavLink>
        </Menu.Item>
        <Menu.Item key="page-headers">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/page-headers`}>
            Page Headers
          </NavLink>
        </Menu.Item>
        <Menu.Item key="pagination">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/pagination`}>
            Paginations
          </NavLink>
        </Menu.Item>
        <Menu.Item key="confirme">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/confirm`}>
            Popconfirme
          </NavLink>
        </Menu.Item>
        <Menu.Item key="popover">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/popover`}>
            Popover
          </NavLink>
        </Menu.Item>
        <Menu.Item key="progress">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/progress`}>
            Progress
          </NavLink>
        </Menu.Item>
        <Menu.Item key="radio">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/radio`}>
            Radio
          </NavLink>
        </Menu.Item>
        <Menu.Item key="rate">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/rate`}>
            Rate
          </NavLink>
        </Menu.Item>
        <Menu.Item key="result">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/result`}>
            Result
          </NavLink>
        </Menu.Item>
        <Menu.Item key="select">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/select`}>
            Select
          </NavLink>
        </Menu.Item>
        <Menu.Item key="skeleton">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/skeleton`}>
            Skeleton
          </NavLink>
        </Menu.Item>
        <Menu.Item key="slider">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/slider`}>
            Slider
          </NavLink>
        </Menu.Item>
        <Menu.Item key="spiner">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/spiner`}>
            Spiner
          </NavLink>
        </Menu.Item>
        <Menu.Item key="statistic">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/statistic`}>
            Statistic
          </NavLink>
        </Menu.Item>
        <Menu.Item key="steps">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/steps`}>
            Steps
          </NavLink>
        </Menu.Item>
        <Menu.Item key="switch">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/switch`}>
            Switch
          </NavLink>
        </Menu.Item>
        <Menu.Item key="tabs">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/tabs`}>
            Tabs
          </NavLink>
        </Menu.Item>
        <Menu.Item key="tags">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/tags`}>
            Tags
          </NavLink>
        </Menu.Item>
        <Menu.Item key="timeline">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/timeline`}>
            Timeline
          </NavLink>
        </Menu.Item>
        <Menu.Item key="timepicker">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/timepicker`}>
            Timepicker
          </NavLink>
        </Menu.Item>
        <Menu.Item key="tree-select">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/tree-select`}>
            TreeSelect
          </NavLink>
        </Menu.Item>
        <Menu.Item key="upload">
          <NavLink onClick={toggleCollapsed} to={`${path}/components/upload`}>
            Upload
          </NavLink>
        </Menu.Item>
      </SubMenu> */}
        <SubMenu key="charts" icon={!topMenu && <FeatherIcon icon="bar-chart-2" />} title="Charts">
          <Menu.Item key="chartjs">
            <NavLink onClick={toggleCollapsed} to={`${path}/charts/chartjs`}>
              Chart Js
            </NavLink>
          </Menu.Item>
          <Menu.Item key="google-chart">
            <NavLink onClick={toggleCollapsed} to={`${path}/charts/google-chart`}>
              Google Charts
            </NavLink>
          </Menu.Item>

          <SubMenu key="recharts" icon={!topMenu && <FeatherIcon icon="bar-chart" />} title="Recharts">
            <Menu.Item key="bar">
              <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/bar`}>
                Bar Charts
              </NavLink>
            </Menu.Item>
            <Menu.Item key="area">
              <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/area`}>
                Area Charts
              </NavLink>
            </Menu.Item>
            <Menu.Item key="composed">
              <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/composed`}>
                Composed Charts
              </NavLink>
            </Menu.Item>
            <Menu.Item key="line">
              <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/line`}>
                Line Charts
              </NavLink>
            </Menu.Item>
            <Menu.Item key="pie">
              <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/pie`}>
                Pie Charts
              </NavLink>
            </Menu.Item>
            <Menu.Item key="radar">
              <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/radar`}>
                Radar Charts
              </NavLink>
            </Menu.Item>
            <Menu.Item key="radial">
              <NavLink onClick={toggleCollapsed} to={`${path}/charts/recharts/radial`}>
                Radial Charts
              </NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="peity">
            <NavLink onClick={toggleCollapsed} to={`${path}/charts/peity`}>
              Peity Charts
            </NavLink>
          </Menu.Item>
        </SubMenu>
        {/* <SubMenu
        key="forms"
        icon={!topMenu && <FeatherIcon icon="disc" />}
        title={
          <span className="pl-0">
            Forms<span className="badge badge-success">New</span>
          </span>
        }
      >
        <Menu.Item key="form-layout">
          <NavLink onClick={toggleCollapsed} to={`${path}/form-layout`}>
            Form Layouts
          </NavLink>
        </Menu.Item>
        <Menu.Item key="form-elements">
          <NavLink onClick={toggleCollapsed} to={`${path}/form-elements`}>
            Form Elements
          </NavLink>
        </Menu.Item>
        <Menu.Item key="form-components">
          <NavLink onClick={toggleCollapsed} to={`${path}/form-components`}>
            Form Components
          </NavLink>
        </Menu.Item>
        <Menu.Item key="form-validation">
          <NavLink onClick={toggleCollapsed} to={`${path}/form-validation`}>
            Form Validation
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="tables" icon={!topMenu && <FeatherIcon icon="cpu" />} title="Table">
        <Menu.Item key="basic">
          <NavLink onClick={toggleCollapsed} to={`${path}/tables/basic`}>
            Basic Table
          </NavLink>
        </Menu.Item>
        <Menu.Item key="dataTable">
          <NavLink onClick={toggleCollapsed} to={`${path}/tables/dataTable`}>
            Data Table
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="widgets" icon={!topMenu && <FeatherIcon icon="server" />} title="Widgets">
        <Menu.Item key="chart">
          <NavLink onClick={toggleCollapsed} to={`${path}/widgets/chart`}>
            Chart
          </NavLink>
        </Menu.Item>
        <Menu.Item key="card">
          <NavLink onClick={toggleCollapsed} to={`${path}/widgets/card`}>
            Card
          </NavLink>
        </Menu.Item>
        <Menu.Item key="mixed">
          <NavLink onClick={toggleCollapsed} to={`${path}/widgets/mixed`}>
            Mixed
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="wizards" icon={!topMenu && <FeatherIcon icon="square" />} title="Wizards">
        <Menu.Item key="wizard-one">
          <NavLink onClick={toggleCollapsed} to={`${path}/wizards/one`}>
            Wizard 1
          </NavLink>
        </Menu.Item>
        <Menu.Item key="wizard-two">
          <NavLink onClick={toggleCollapsed} to={`${path}/wizards/two`}>
            Wizard 2
          </NavLink>
        </Menu.Item>
        <Menu.Item key="wizard-three">
          <NavLink onClick={toggleCollapsed} to={`${path}/wizards/three`}>
            Wizard 3
          </NavLink>
        </Menu.Item>
        <Menu.Item key="wizard-four">
          <NavLink onClick={toggleCollapsed} to={`${path}/wizards/four`}>
            Wizard 4
          </NavLink>
        </Menu.Item>
        <Menu.Item key="wizard-five">
          <NavLink onClick={toggleCollapsed} to={`${path}/wizards/five`}>
            Wizard 5
          </NavLink>
        </Menu.Item>
        <Menu.Item key="wizard-six">
          <NavLink onClick={toggleCollapsed} to={`${path}/wizards/six`}>
            Wizard 6
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <SubMenu key="icons" icon={!topMenu && <FeatherIcon icon="grid" />} title="Icons">
        <Menu.Item key="feathers">
          <NavLink onClick={toggleCollapsed} to={`${path}/icons/feathers`}>
            Feather icons (svg)
          </NavLink>
        </Menu.Item>
        <Menu.Item key="font-awesome">
          <NavLink onClick={toggleCollapsed} to={`${path}/icons/font-awesome`}>
            Font Awesome
          </NavLink>
        </Menu.Item>
        <Menu.Item key="antd">
          <NavLink onClick={toggleCollapsed} to={`${path}/icons/antd`}>
            Ant Design icons
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/editor`}>
              <FeatherIcon icon="edit" />
            </NavLink>
          )
        }
        key="editor"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/editor`}>
          Editor
        </NavLink>
      </Menu.Item>

      <SubMenu key="maps" icon={!topMenu && <FeatherIcon icon="map" />} title="Maps">
        <Menu.Item key="google">
          <NavLink onClick={toggleCollapsed} to={`${path}/maps/google`}>
            Google Maps
          </NavLink>
        </Menu.Item>
        <Menu.Item key="leaflet">
          <NavLink onClick={toggleCollapsed} to={`${path}/maps/leaflet`}>
            Leaflet Maps
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Vector">
          <NavLink onClick={toggleCollapsed} to={`${path}/maps/Vector`}>
            Simple Map
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {!topMenu && <NavTitle className="sidebar-nav-title">Pages</NavTitle>}

      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/settings`}>
              <FeatherIcon icon="settings" />
            </NavLink>
          )
        }
        key="settings"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
          Settings
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          !topMenu && (
            <ReactSVG className="sDash_menu-item-icon" src={require('../static/img/icon/headphone.svg').default} />
          )
        }
        key="support"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/support`}>
          Support Center
        </NavLink>
      </Menu.Item> */}
      </Menu>
    );
  }
  return DietitcianMenuItems({ darkMode, toggleCollapsed, topMenu });
}

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;

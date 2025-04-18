import React, { useEffect, useState } from 'react';
import { LogOutIcon } from 'lucide-react';
import { Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import Message from './message';
import Notification from './notification';
import Settings from './settings';
import Support from './support';
import { Popover } from '../../popup/popup';
import { Dropdown } from '../../dropdown/dropdown';
import { logOut } from '../../../redux/authentication/actionCreator';
import { fbAuthLogout } from '../../../redux/firebase/auth/actionCreator';
import Heading from '../../heading/heading';
import { useUserInfo } from '../../../zustand/users-store';
import { capitalise, decryptData } from '../../../utils/helper-functions';

function AuthInfo() {
  const dispatch = useDispatch();
  const { isAuthenticate, name, logo, role } = useSelector((state) => {
    return {
      isAuthenticate: state.fb.auth.uid,
      name: state.auth.name,
      logo: state.auth.logo,
      role: state.auth.role,
      company: state.auth.company,
      email: state.auth.email,
    };
  });
  const userRole = decryptData({ ciphertext: role, key: process.env.REACT_APP_COOKIE_SECRET });

  const [state, setState] = useState({
    flag: 'english',
  });
  const { flag } = state;

  const SignOut = (e) => {
    e.preventDefault();
    if (isAuthenticate) {
      dispatch(fbAuthLogout(dispatch(logOut())));
    } else {
      dispatch(logOut());
    }
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <img src={logo} alt="" style={{ maxWidth: '44px', maxHeight: '44px', borderRadius: '999px' }} />
          <figcaption>
            <Heading as="h5">{name}</Heading>
            <p>{capitalise(userRole)}</p>
          </figcaption>
        </figure>
        <Link to="/admin/my-profile">Profile</Link>
        {/* <ul className="user-dropdwon__links">
          <li>
            <Link to="#">
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="settings" /> Settings
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="dollar-sign" /> Billing
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="users" /> Activity
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="bell" /> Help
            </Link>
          </li>
        </ul> */}
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  const onFlagChangeHandle = (value) => {
    setState({
      ...state,
      flag: value,
    });
  };

  const country = (
    <NavAuth>
      <Link onClick={() => onFlagChangeHandle('english')} to="#">
        <img src={require('../../../static/img/flag/english.png')} alt="" />
        <span>English</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('germany')} to="#">
        <img src={require('../../../static/img/flag/germany.png')} alt="" />
        <span>Germany</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('spain')} to="#">
        <img src={require('../../../static/img/flag/spain.png')} alt="" />
        <span>Spain</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('turky')} to="#">
        <img src={require('../../../static/img/flag/turky.png')} alt="" />
        <span>Turky</span>
      </Link>
    </NavAuth>
  );

  return (
    <InfoWraper>
      {/* <Message />
      <Notification />

      <Settings />
      <Support /> */}
      {/* <div className="nav-author">
        <Dropdown placement="bottomRight" content={country} trigger="click">
          <Link to="#" className="head-example">
            <img src={require(`../../../static/img/flag/${flag}.png`)} alt="" />
          </Link>
        </Dropdown>
      </div> */}

      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
}

export default AuthInfo;

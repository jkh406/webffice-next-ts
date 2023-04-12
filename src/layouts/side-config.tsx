import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: '일정관리',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <CalendarMonthIcon />
      </SvgIcon>
    )
  },
  {
    title: '공지사항',
    path: '/notice',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Companies',
    path: '/companies',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Setting',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Login 화면',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Register',
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize="small">
        <UserPlusIcon />
      </SvgIcon>
    )
  },
  {
    title: '관리자 설정',
    path: '/admin/userManagement',
    icon: (
      <SvgIcon fontSize="small">
        <AdminPanelSettingsIcon />
      </SvgIcon>
    )
  }
];

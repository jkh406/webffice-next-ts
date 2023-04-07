import PropTypes from 'prop-types';
import { Box, Stack, Divider, useMediaQuery, Drawer } from '@mui/material';
import { usePathname } from 'next/navigation';
import { items } from 'layouts/admin-config';
import { AdminNavItem } from 'layouts/admin-nav-item';


export const AdminNav = (props : any) => {
    const { open, onClose } = props;
    const pathname = usePathname();
    const lgUp = useMediaQuery((theme : any) => theme.breakpoints.up('lg'));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          component="nav"
          sx={{
            px: 30,
            py: 3
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 4, md: 1 }}
            alignItems="left"
          >
            {items.map((item : any) => {
            const active = item.path ? (pathname === item.path) : false;

            return (
              <AdminNavItem
                active={active}
                disabled={item.disabled}
                external={item.external}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            );
          })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Box>
    </>
  );
};

AdminNav.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};

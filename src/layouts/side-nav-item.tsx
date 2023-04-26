import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import router from 'next/router';
import styled from 'styled-components';
import InboxIcon from '@mui/icons-material/Inbox';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

export const SideNavItem = (props : any) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListItemButtonClick(event : any) {
    const primaryValue = event.currentTarget.querySelector('span').textContent;

    if (primaryValue === '사용자관리') {
      router.push('/admin/userManagement');
    } else if (primaryValue === '부서조직관리') {
      router.push('/admin/deptOrgManagement');
    } else if (primaryValue === '직급체계관리') {
      router.push('/admin/rankSystemManagement');
    }
  }

  const { active = false, disabled, external, icon, path, title } = props;
  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  return (
    <li>
        {title === '관리자 설정' ? (
          <List>
            <ButtonBase
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
          onClick={handleClick}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main',
                })
              }}
            >
              {icon}
            </Box>
          )}
          <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
          </Box>
          {open ? <ExpandLess sx={{
                  ...(active && {
                    color: 'common.white'
                  }),
                }}/> : <ExpandMore sx={{
                  ...(active && {
                    color: 'common.white'
                  }),
                }}/>}
      </ButtonBase>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" >
                    <ListItemButton onClick={handleListItemButtonClick} sx={{ pl: 4 }}>
                    <ListItemIcon sx={{
                      color: 'neutral.400',
                      pl: '20px',
                      ...(active && {
                        color: 'primary.main'
                      }),
                    }}>
                    <HorizontalRuleIcon />
                    </ListItemIcon>
                      <ListItemText sx={{
                      color: 'neutral.400',
                      ...(active && {
                        color: 'common.white'
                      }),
                    }} primary="사용자관리" />
                    </ListItemButton>

                    <ListItemButton onClick={handleListItemButtonClick} sx={{ pl: 4 }}>
                    <ListItemIcon sx={{
                      color: 'neutral.400',
                      pl: '20px',
                      ...(active && {
                        color: 'primary.main'
                      }),
                    }}>
                    <HorizontalRuleIcon />
                    </ListItemIcon>
                      <ListItemText sx={{
                      color: 'neutral.400',
                      ...(active && {
                        color: 'common.white'
                      }),
                    }}  primary="부서조직관리" />
                    </ListItemButton>

                    <ListItemButton onClick={handleListItemButtonClick} sx={{ pl: 4 }}>
                    <ListItemIcon sx={{
                      color: 'neutral.400',
                      pl: '20px',
                      ...(active && {
                        color: 'primary.main'
                      }),
                    }}>
                    <HorizontalRuleIcon />
                    </ListItemIcon>
                      <ListItemText sx={{
                      color: 'neutral.400',
                      ...(active && {
                        color: 'common.white'
                      }),
                    }}  primary="직급체계관리" />
                    </ListItemButton>
                  </List>
                </Collapse>
          </List>
          ) :         
          <ButtonBase
          sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
          {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: 'center',
                color: 'neutral.400',
                display: 'inline-flex',
                justifyContent: 'center',
                mr: 2,
                ...(active && {
                  color: 'primary.main',
                })
              }}
            >
              {icon}
            </Box>
          )}
          <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
          </Box>
      </ButtonBase>}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};

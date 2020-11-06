import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import clsx from 'clsx';
import UserInfo from '../../../../shared/components/UserInfo';
import Navigation from '../../Navigation/VerticleNav';
import {toggleNavCollapsed} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import useStyles from './AppSidebar.style';
import Scrollbar from '../../Scrollbar';

const AppSidebar = (props) => {
  const dispatch = useDispatch();
  const navCollapsed = useSelector(({settings}) => settings.navCollapsed);

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };

  const classes = useStyles(props);
  return (
    <Hidden lgUp>
      <Drawer
        anchor={props.position}
        open={navCollapsed}
        onClose={(ev) => handleToggleDrawer()}
        classes={{
          root: clsx(classes.sidebarWrapper, props.variant),
          paper: clsx(
            classes.sidebar,
            props.variant,
            props.position === 'left'
              ? classes.leftSidebar
              : classes.rightSidebar,
          ),
        }}
        BackdropProps={{
          classes: {
            root: classes.backdrop,
          },
        }}
        style={{position: 'absolute'}}>
        <Box height='100%' className={classes.drawerContainer}>
          <Box
            height='100%'
            width='100%'
            color='primary.contrastText'
            className={classes.sidebarBg}>
            <UserInfo />
            <Scrollbar className={classes.drawerScrollAppSidebar}>
              <Navigation />
            </Scrollbar>
          </Box>
        </Box>
      </Drawer>
    </Hidden>
  );
};

export default AppSidebar;

AppSidebar.defaultProps = {
  variant: '',
  position: 'left',
};

AppSidebar.propTypes = {
  position: PropTypes.string,
  variant: PropTypes.string,
};
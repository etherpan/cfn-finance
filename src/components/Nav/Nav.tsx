
   
import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';

import ListItemLink from '../ListItemLink';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    color: '#FFF',
    'background-color': '#5f4aff22',
    // borderBottom: `1px solid ${theme.palette.divider}`,
    'backdrop-filter': "blur(2px)",
    padding: '0 10px',
    marginBottom: '3rem',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    'background-color': '#5f4aff',
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '"Gilroy"',
    fontSize: '30px',
    flexGrow: 1,
  },
  link: {
    textTransform: 'uppercase',
    color: 'var(--white)',
    fontSize: '14px',
    margin: theme.spacing(1, 2),
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: 'var(--white)',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:900px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


	return (
		<AppBar position="static" elevation={0} className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				{matches ? (
					<>
						<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
							{/* <a className={ classes.brandLink } href="/">grave Finance</a> */}
							<Link to="/" color="inherit" className={classes.brandLink}>
								grave
							</Link>
						</Typography>
						<Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
							<a className={classes.link} target="_blank" href="https://github.com/grave/audit/blob/main/grave_Audit_Jan2022.pdf">Audited by</a>
							<img width="125px" height="30px" src="https://spadetech.io/wp-content/uploads/elementor/thumbs/logo-2-p6mxojhv426tba93lpzfx3ft1m3dvq0k2hu2abrgi4.png"></img>
						</Typography>
						<Box mr={5}>
							<Link color="textPrimary" to="/" className={classes.link}>
								Home
							</Link>
							<Link color="textPrimary" to="/farms" className={classes.link}>
								2Farms
							</Link>
							<Link color="textPrimary" to="/boardroom" className={classes.link}>
								Boardroom
							</Link>
							<Link color="textPrimary" to="/bonds" className={classes.link}>
								Bonds
							</Link>
							{/* <Link color="textPrimary" to="/dividends" className={classes.link}>
                Dividends
              </Link> */}
              {/* <Link color="textPrimary" to="/sbs" className={classes.link}>
                SBS
              </Link>
              <Link color="textPrimary" to="/liquidity" className={classes.link}>
                Liquidity
              </Link>
              <Link color="textPrimary" to="/regulations" className={classes.link}>
                Regulations
              </Link> */}
							<a target="_blank" href="https://3omb.finance/rebates" className={classes.link}>
								3DAO
							</a>
							<a target="_blank" href="https://www.devilfinance.io" className={classes.link}>
								Vaults
							</a>
							{/* <a target="_blank" href="https://snapshot.org/#/forgiving.forg.eth" className={classes.link}>
								Governance
							</a> */}
							{/* <a target="_blank" href="https://docs.grave.finance/contracts/tokens" className={classes.link}>
                Contracts
              </a> */}
              <a target="_blank" rel="noopener noreferrer" href="https://docs.grave.finance" className={classes.link}>
                Docs
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://3omb.finance/" className={classes.link}>
                3omb
              </a>
            </Box>
            <AccountButton text="Connect" />
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              grave
            </Typography>

            <Drawer
              className={classes.drawer}
              onEscapeKeyDown={handleDrawerClose}
              onBackdropClick={handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemLink primary="HOME" to="/" />
                <ListItemLink primary="2FARMS" to="/farms" />
                <ListItemLink primary="BOARDROOM" to="/boardroom" />
                <ListItemLink primary="BONDS" to="/bonds" />
                {/* <ListItemLink primary="DIVIDENDS" to="/dividends" /> */}
                {/* <ListItemLink primary="SBS" to="/sbs" />
                <ListItemLink primary="Liquidity" to="/liquidity" />
                <ListItemLink primary="Regulations" to="/regulations" /> */}
                <ListItem button component="a" href="https://3omb.finance/rebates">
                  <ListItemText>3DAO</ListItemText>
                </ListItem>
                <ListItem button component="a" href="https://www.devilfinance.io">
                  <ListItemText>VAULTS</ListItemText>
                </ListItem>
                {/* <ListItem button component="a" href="https://snapshot.org/#/forgiving.forg.eth">
                  <ListItemText>GOVERNANCE</ListItemText>
                </ListItem> */}
                <ListItem button component="a" href="https://docs.grave.finance">
                  <ListItemText>DOCS</ListItemText>
                </ListItem>
                <ListItem button component="a" href="https://3omb.finance/">
                  <ListItemText>3OMB</ListItemText>
                </ListItem>
                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="Connect" onOpen={handleDrawerClose} />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
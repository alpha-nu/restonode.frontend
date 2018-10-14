import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountBox';
import Shopping from '@material-ui/icons/ShoppingCart';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Logins, { ILoginsProps } from '../logins';
import { Drawer, LinearProgress, Grid, Button } from '@material-ui/core';
import Order, { IOrderProps } from '../order';
import { Link } from 'react-router-dom';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const styles = (theme: Theme) => ({
    root: {
        width: '100%'
    },
    grow: {
        flexGrow: 1
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    appBar: {
        padding: '15px'
    }
});

export interface INotification {
    isFetching: boolean;
    hasError: boolean;
}

class Navigation extends React.Component<
    ILoginsProps
    & IOrderProps
    & INotification
    & WithStyles<typeof styles>> {
    state = {
        anchorEl: undefined,
        shoppingCartOpen: false
    };

    shoppingCartBadge = () => {
        const { orders } = this.props.loggedInUser;
        if (orders) {
            const mealsCount = orders.reduce((acc, _) => acc + _.quantity, 0);
            return (
                <Badge badgeContent={mealsCount} color='secondary'>
                    <Shopping />
                </Badge>
            );
        }

        return (<Shopping />);
    }

    handleProfileMenuOpen = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: undefined });
    };

    toggleShoppingCart = () => {
        this.setState((s: any) => ({ ...s, shoppingCartOpen: !s.shoppingCartOpen }));
    }

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <CssBaseLine />
                <AppBar position='static'>
                    <Toolbar className={classes.appBar}>
                        <Typography className={classes.title} variant='h6' color='inherit' noWrap>
                            R.e.s.t.o.n.o.d.e
                        </Typography>
                        <div className={classes.grow} />
                        <Link style={{ textDecoration: 'none' }} to='/restaurants'>
                            <Button variant='extendedFab' color='primary'>
                                view restaurants
                                <RestaurantIcon />
                            </Button>
                        </Link>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton onClick={this.toggleShoppingCart} color='inherit'>
                                {this.shoppingCartBadge()}
                            </IconButton>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup='true'
                                onClick={this.handleProfileMenuOpen}
                                color='inherit'
                            >
                                <AccountCircle />
                                <Typography variant='body2' color='inherit'>
                                    &nbsp;{this.props.user.current.userName}
                                </Typography>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {this.props.isFetching && <LinearProgress color='secondary' />}
                {this.props.hasError && (
                    <Grid item lg={12} >
                        <Typography align='center' variant='h6' color='error'>
                            Oops! something went wrong...
                        </Typography>
                        <Typography align='center' variant='caption' color='error'>
                            If it's any consolation, you look lovely today!
                        </Typography>
                    </Grid>
                )}
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={isMenuOpen}
                    onClose={this.handleMenuClose}
                >
                    <Logins user={this.props.user} switchLogin={(userName) => {
                        this.handleMenuClose();
                        this.props.switchLogin(userName);
                    }} />

                </Menu>
                <Drawer anchor='right' open={this.state.shoppingCartOpen} onClose={this.toggleShoppingCart}>
                    <Order loggedInUser={this.props.user.current} checkout={(user) => {
                        this.toggleShoppingCart();
                        this.props.checkout(user);
                    }} />
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(Navigation);

import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Shopping from '@material-ui/icons/ShoppingCartRounded';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Logins, { ILoginsProps } from '../logins';
import { Drawer } from '@material-ui/core';
import Order, { IOrderProps } from '../order';

const styles = (theme: Theme) => ({
    root: {
        width: '100%'
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
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
    }
});

class Navigation extends React.Component<ILoginsProps & IOrderProps & WithStyles<typeof styles>> {
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
                    <Toolbar>
                        <Typography className={classes.title} variant='title' color='inherit' noWrap>
                            Restonode
                        </Typography>
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
                                <Typography variant='body1' color='inherit'>
                                    &nbsp;{this.props.user.current.userName}
                                </Typography>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
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

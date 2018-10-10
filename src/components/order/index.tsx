import * as React from 'react';
import { ILogin, IOrder } from '../../store';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Theme,
    WithStyles,
    withStyles,
    Button
} from '@material-ui/core';
import CheckoutIcon from '@material-ui/icons/PaymentTwoTone';
import { Link } from 'react-router-dom';

export interface IOrderProps {
    loggedInUser: ILogin;
    checkout: (user: ILogin) => void;
}

const styles = (theme: Theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(350 + theme.spacing.unit * 3 * 2)]: {
            width: 350,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 4}px`
    },
    card: {
        height: '100%'
    },
    cardContent: {
        width: '100%'
    }
});

class Order extends React.Component<WithStyles<typeof styles> & IOrderProps> {

    public render() {
        const { loggedInUser, classes } = this.props;

        if (loggedInUser.orders.length === 0) {
            return (<h2>No Orders.</h2>);
        }
        else {
            return (
                <div className={`${classes.layout} ${classes.cardGrid}`}>
                    <Grid container direction='column' spacing={16}>
                        <Grid container
                            direction='row'
                            justify='center'
                            alignItems='center'>
                            <Link onClick={() => this.props.checkout(this.props.loggedInUser)}
                                to='/order-confirmation' style={{ textDecoration: 'none' }}>
                                <Button size='medium' variant='contained' color='primary'>
                                    Checkout
                                    <CheckoutIcon />
                                </Button>
                            </Link>

                        </Grid>
                        {loggedInUser.orders.map(({ meal, quantity, total }: IOrder) => (
                            <Grid item key={meal.id} sm={2} md={2} lg={12}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Grid container
                                            direction='row'
                                            justify='flex-end'
                                            alignItems='flex-end'>
                                            <Typography gutterBottom color='textSecondary' variant='h5'>
                                                ${total}
                                            </Typography>
                                        </Grid>
                                        <Typography gutterBottom color='textPrimary' variant='h5'>
                                            {meal.name}
                                        </Typography>
                                        <Grid container
                                            direction='row'
                                            justify='flex-end'
                                            alignItems='flex-end'>
                                            <Typography gutterBottom variant='caption'>
                                                quantity:{quantity}
                                            </Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            );
        }
    }
}

export default withStyles(styles)(Order);

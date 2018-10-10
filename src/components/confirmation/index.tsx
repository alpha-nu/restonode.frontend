import * as React from 'react';
import { IOrderConfirmation, IDelivery } from 'src/store';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Theme,
    WithStyles,
    withStyles,
    Button
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HourGlassEmptyIcon from '@material-ui/icons/HourglassEmptyRounded';

import { Link } from 'react-router-dom';

export interface IConfirmationProps {
    order: IOrderConfirmation;
}

const styles = (theme: Theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
            width: 500,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 4}px`
    },
    card: {
        height: '100%'
    },
    cardContent: {
        width: '100%'
    },
    confirmation: {
        color: '#49bd10'
    }
});

class Confirmation extends React.Component<WithStyles<typeof styles> & IConfirmationProps> {

    state = {
        emailDialogOpen: false
    };

    deliveryFragment = (delivery: IDelivery, deliveryIndex: number) => (
        <Grid item key={deliveryIndex} lg={12}>
            <Card key={deliveryIndex} className={this.props.classes.card}>
                <CardContent className={this.props.classes.cardContent}>
                    <Typography gutterBottom variant='display1' >
                        {delivery.restaurant.name}
                        <RestaurantIcon color='primary' />
                    </Typography>
                    {delivery.meals.map(({ name, quantity }, index) => (
                        <Typography key={index} gutterBottom variant='headline'>
                            {name} (x{quantity})
                        </Typography>
                    ))}
                    <Grid container
                        direction='column'
                        justify='flex-end'
                        alignItems='flex-end'>
                        <Typography gutterBottom variant='display1'>
                            ${delivery.subTotal}
                        </Typography>
                        <Button color='primary' variant='contained'>
                            ETA: {delivery.eta}
                            <HourGlassEmptyIcon />
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );

    public render() {
        const { classes, order } = this.props;

        if (this.props.order === undefined) {
            return (<div></div>);
        }

        return order && (
            <div>
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography variant='display3' align='center' color='textPrimary' gutterBottom>
                            Confirmation
                            <CheckIcon fontSize='large' className={classes.confirmation} />
                        </Typography>
                        <Typography variant='title' align='center' color='textSecondary' paragraph>
                            Sit tight! You'll enjoy:
                        </Typography>
                    </div>
                </div>
                <div className={`${classes.layout} ${classes.cardGrid}`}>
                    <Grid container spacing={8} direction='column'>
                        <Grid item lg={12}>
                            <Grid container
                                direction='row'
                                justify='flex-end'
                                alignItems='flex-end'>
                                <Typography gutterBottom variant='display1'>
                                    total: ${order.grandTotal}
                                </Typography>
                            </Grid>

                        </Grid>
                        {order.deliveries.map(this.deliveryFragment)}
                        <Grid container
                            direction='row'
                            justify='center'
                            alignItems='center'>
                            <Link style={{ textDecoration: 'none' }} to='/restaurants'>
                                <Button variant='contained' color='primary'>
                                    view restaurants
                                <RestaurantIcon />
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Confirmation);

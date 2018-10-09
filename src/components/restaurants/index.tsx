import * as React from 'react';
import { IRestaurants } from '../../store';
import { Link } from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent, Typography, CardActions, Button, Theme, Badge
} from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import StarRateIcon from '@material-ui/icons/StarRate';
import MenuIcon from '@material-ui/icons/RestaurantMenu';

export interface IRestaurantsProps {
    restaurants: IRestaurants;
    fetchRestaurants: () => void;
    selectRestaurant: (id: number) => void;
}

const styles = (theme: Theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`
    },
    card: {
        height: '100%'
    },
    cardContent: {
        width: '100%'
    },
    rating: {
        margin: theme.spacing.unit * 2
    },
    star: {
        color: '#e2a616'
    }
});

export class Restaurants extends React.Component<WithStyles<typeof styles> & IRestaurantsProps> {

    componentDidMount() {
        this.props.fetchRestaurants();
    }

    public render() {
        const { classes } = this.props;
        return (<div className={`${classes.layout} ${classes.cardGrid}`}>
            <Grid container spacing={40}>
                {this.props.restaurants.all.map(restaurant => (
                    <Grid item key={restaurant.id} sm={6} md={6} lg={4}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Grid container
                                    direction='row'
                                    justify='flex-end'
                                    alignItems='flex-end'>
                                    <Badge className={classes.rating} badgeContent={restaurant.rating} color='primary'>
                                        <StarRateIcon className={classes.star} />
                                    </Badge>
                                </Grid>
                                <Typography gutterBottom variant='h4' component='h2'>
                                    {restaurant.name}
                                </Typography>
                                <Typography component='p'>
                                    {restaurant.address}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link onClick={() => this.props.selectRestaurant(restaurant.id)}
                                    className='restaurant-name'
                                    to={`/restaurants/${restaurant.id}`} style={{ textDecoration: 'none' }}>
                                    <Button
                                        size='small' variant='contained' color='primary'>
                                        Menu
                                    <MenuIcon />
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>);
    }
}

export default withStyles(styles)(Restaurants);

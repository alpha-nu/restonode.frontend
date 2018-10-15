import * as React from 'react';
import { IRestaurant, IMeal, IPrivilege } from '../../store';
import {
    WithStyles,
    withStyles,
    Grid, Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Theme,
    Badge,
    Snackbar
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import StarRateIcon from '@material-ui/icons/StarRate';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

export interface IMenuProps {
    addMeal: (meal: IMeal) => void;
    selectRestaurant: (id: number) => void;
    selectedRestaurant: IRestaurant;
}

interface ISelectedRestaurantParam {
    id: string;
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
    heroUnit: {
        backgroundColor: theme.palette.background.paper
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
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
    },
    newMealGrid: {
        padding: `${theme.spacing.unit * 3}px`
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit * 2
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    }
});

class Menu extends React.Component<WithStyles<typeof styles>
    & IMenuProps
    & RouteComponentProps<ISelectedRestaurantParam>
    & IPrivilege> {

    state = {
        snackBarOpen: false,
        meal: ''
    };

    componentDidMount() {
        this.props.selectRestaurant(parseInt(this.props.match.params.id, 10));
    }

    renderMeals = () => {
        const { classes, selectedRestaurant } = this.props;
        if (selectedRestaurant!.meals === undefined || selectedRestaurant!.meals!.length === 0) {
            return (
                <Typography variant='h6' align='center' color='textSecondary' paragraph>
                    this restaurant has not added any meals
                </Typography>
            );
        }
        return (<Grid container spacing={40}>
            {selectedRestaurant!.meals!.map(meal => (
                <Grid item key={meal.id} sm={6} md={6} lg={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Grid container
                                direction='row'
                                justify='flex-end'
                                alignItems='flex-end'>
                                <Typography gutterBottom variant='h5' component='h2'>
                                    ${meal.price}
                                </Typography>
                            </Grid>
                            <Typography gutterBottom variant='h4' component='h2'>
                                {meal.name}
                            </Typography>
                            <Typography component='p'>
                                {meal.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className='add-meal' onClick={
                                () => {
                                    this.setState({ meal: meal.name });
                                    this.setState({ snackBarOpen: true });
                                    this.props.addMeal(meal);
                                }
                            }
                                size='small' variant='contained' color='primary'>
                                <AddIcon />
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>);
    }

    public render() {
        const { classes, selectedRestaurant } = this.props;

        if (selectedRestaurant === undefined) { return (<div />); }

        return (
            <div>
                <Snackbar open={this.state.snackBarOpen}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    autoHideDuration={1500}
                    onClose={() => this.setState({ snackBarOpen: false })}
                    message={
                        <span className={`${classes.message}`}>
                            <RestaurantMenuIcon className={classes.icon} />
                            {`${this.state.meal} added to cart`}
                        </span>
                    }>
                </Snackbar>

                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography variant='h2' align='center' color='textPrimary' gutterBottom>
                            {selectedRestaurant.name}
                            <Badge className={classes.rating} badgeContent={selectedRestaurant.rating} color='primary'>
                                <StarRateIcon className={classes.star} />
                            </Badge>
                        </Typography>
                        <Typography variant='h6' align='center' color='textSecondary' paragraph>
                            online menu
                        </Typography>
                    </div>
                </div>
                <div className={`${classes.layout} ${classes.cardGrid}`}>
                    {this.props.canCreateRestaurant &&
                        <Grid container className={classes.newMealGrid} spacing={40}>
                            <Link style={{ textDecoration: 'none' }}
                                to={`/restaurants/${selectedRestaurant.id}/meals/new`}>
                                <Button className='new-meal-button' variant='extendedFab' >
                                    <AddIcon /> New Meal
                                </Button>
                            </Link>
                        </Grid>}
                    {this.renderMeals()}
                </div>
            </div >
        );
    }
}

export default withStyles(styles)(Menu);

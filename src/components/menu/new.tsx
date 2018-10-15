import * as React from 'react';
import { IRestaurant, ICreatedMeal } from '../../store';
import { ICreateMealAttributes } from '../../actions/meal';
import {
    Theme,
    withStyles,
    WithStyles,
    Paper,
    Typography,
    Grid,
    Button,
    TextField
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
        padding: `${theme.spacing.unit * 4}px`,
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: `${theme.spacing.unit * 12}px`
    },
    inputGrid: {
        marginTop: `${theme.spacing.unit * 3}px`
    },
    confirmation: {
        color: '#49bd10'
    }
});

export interface INewMealProps {
    selectedRestaurant: IRestaurant;
    createdMeal?: ICreatedMeal;
    newMeal: (restaurantId: number, mealAttributes: ICreateMealAttributes) => void;
}

interface INewMealState {
    name: string;
    description: string;
    price: string;
}

class NewMeal extends React.Component<INewMealProps & WithStyles<typeof styles>, INewMealState> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: ''
        };
    }

    hasError = (key: string) => {
        const { createdMeal } = this.props;
        return createdMeal
            && createdMeal.validationErrors
            && createdMeal.validationErrors[key] !== undefined;
    }

    helperText = (key: string, defaultHelperText: string) => {
        if (!this.hasError(key)) { return defaultHelperText; }
        return this.props.createdMeal!.validationErrors![key];
    }

    public render() {
        const { createdMeal, classes } = this.props;
        const restaurantId = this.props.selectedRestaurant.id;
        if (createdMeal && createdMeal.name) {
            return (
                <Paper className={classes.root}>
                    <Typography variant='h2'>
                        Success
                    <CheckIcon fontSize='large' className={classes.confirmation} />
                    </Typography>
                    <Typography variant='h6'>
                        {createdMeal.name} ({createdMeal.description})
                        was created successfully. Now go and add some more meals!
                    </Typography>
                    <Grid item className={classes.inputGrid}>
                        <Link style={{ textDecoration: 'none' }} to={`/restaurants/${restaurantId}/meals/new`}>
                            <Button variant='contained' color='primary'>
                                <AddIcon /> New Meal
                            </Button>
                        </Link>
                    </Grid>
                </Paper>);
        }

        return (
            <Paper className={classes.root}>
                <Typography variant='h3'>
                    New Meal
                </Typography>
                <Grid item className={classes.inputGrid}>
                    <TextField
                        autoFocus
                        margin='normal'
                        id='name'
                        label='Name'
                        required={true}
                        fullWidth
                        error={this.hasError('name')}
                        helperText={this.helperText('name', '')}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                </Grid>
                <Grid item className={classes.inputGrid}>
                    <TextField
                        margin='normal'
                        id='description'
                        label='Description'
                        fullWidth
                        required={true}
                        multiline={true}
                        error={this.hasError('description')}
                        helperText={this.helperText('description', '')}
                        onChange={(e) => this.setState({ description: e.target.value })}
                    />
                </Grid>
                <Grid item className={classes.inputGrid}>
                    <TextField
                        margin='normal'
                        id='price'
                        label='Price'
                        type='number'
                        fullWidth
                        required={true}
                        error={this.hasError('price')}
                        helperText={this.helperText('price', 'ex. 120')}
                        onChange={(e) => this.setState({ price: e.target.value })}
                    />
                </Grid>
                <Grid container justify='flex-start' className={classes.inputGrid}>
                    <Button
                        onClick={() => this.props.newMeal(restaurantId, {
                            name: this.state.name,
                            description: this.state.description,
                            price: parseInt(this.state.price, 10)
                        })}
                        size='large' color='primary' variant='contained'>
                        Create
                    </Button>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(NewMeal);

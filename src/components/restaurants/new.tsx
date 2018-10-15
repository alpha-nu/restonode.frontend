import * as React from 'react';
import {
    Paper,
    Grid,
    Theme,
    WithStyles,
    withStyles,
    TextField,
    Typography,
    Button
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import { ICreatedRestaurant } from '../../store';
import { ICreateRestaurantAttributes } from '../../actions/restaurant';

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

export interface INewRestaurantProps {
    owner: string;
    createdRestaurant?: ICreatedRestaurant;
    newRestaurant: (restaurantAttributes: ICreateRestaurantAttributes) => void;
}

interface INewRestaurantState {
    address: string;
    email: string;
    name: string;
}

class NewRestaurant extends React.Component<INewRestaurantProps & WithStyles<typeof styles>,
    INewRestaurantState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            email: '',
            address: ''
        };
    }

    hasError = (key: string) => {
        const { createdRestaurant } = this.props;
        return createdRestaurant
            && createdRestaurant.validationErrors
            && createdRestaurant.validationErrors[key] !== undefined;
    }

    helperText = (key: string, defaultHelperText: string) => {
        if (!this.hasError(key)) { return defaultHelperText; }
        return this.props.createdRestaurant!.validationErrors![key];
    }

    public render() {
        const { classes, createdRestaurant } = this.props;

        if (createdRestaurant && createdRestaurant.name) {
            return (
                <Paper className={classes.root}>
                    <Typography variant='h2'>
                        Success
                    <CheckIcon fontSize='large' className={classes.confirmation} />
                    </Typography>
                    <Typography variant='h6'>
                        {createdRestaurant.name} was created successfully. Now go and add some meals!
                    </Typography>
                    <Grid item className={classes.inputGrid}>
                        <Button href='/restaurants/new' variant='contained' color='primary'>
                            <AddIcon /> New Restaurant
                        </Button>
                    </Grid>
                </Paper>);
        }

        return (
            <Paper className={classes.root}>
                <Typography variant='h3'>
                    New Restaurant
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
                        id='address'
                        label='Address'
                        type='address'
                        fullWidth
                        required={true}
                        error={this.hasError('address')}
                        helperText={this.helperText('address', 'ex: Tucumán 3424, CABA')}
                        onChange={(e) => this.setState({ address: e.target.value })}
                    />
                </Grid>
                <Grid item className={classes.inputGrid}>
                    <TextField
                        margin='normal'
                        id='email'
                        label='Email'
                        type='email'
                        fullWidth
                        required={true}
                        error={this.hasError('email')}
                        helperText={this.helperText('email', '')}
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                </Grid>
                <Grid container justify='flex-start' className={classes.inputGrid}>
                    <Button
                        onClick={() => this.props.newRestaurant({
                            owner: this.props.owner,
                            address: this.state.address,
                            email: this.state.email,
                            name: this.state.name
                        })}
                        size='large' color='primary' variant='contained'>
                        Create
                    </Button>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(NewRestaurant);

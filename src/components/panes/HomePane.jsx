import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import Call from '@material-ui/icons/Call';
import Web from '@material-ui/icons/Web';
import Face from '@material-ui/icons/Face';
import Home from '@material-ui/icons/Home';
import LocationOn from '@material-ui/icons/LocationOn';
import { connect } from 'react-redux';

import { fetchGarage } from 'util/Api';
import store from 'datastore/store';
import firebase from 'datastore/database';
import { secondary } from 'util/colors';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  gridContainer: {
    marginTop: 5,
  }
});

function mapStateToProps(state, props) { 
  return {
    authedUser: state.authedUser || {},
    name: state.garage.name || "",
    email: state.garage.email || "",
    contactNumber: state.garage.contactNumber || "",
    website: state.garage.website || "",
    facebook: state.garage.facebook || "",
    address: state.garage.address || "",
    neighborhood: state.garage.neighborhood || "",
    emirate: isNaN(state.garage.emirate) ? 1 : state.garage.emirate,
  };
}

class HomePane extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      contactNumber: '',
      website: '',
      facebook: '',
      address: '',
      neighborhood: '',
      emirate: 3,
      isLoading: false,
      value: 0,
    };
  }

  componentDidMount() {
    const { authedUser } = this.props;
    firebase.database().ref('garages/' + authedUser.uid)
    .on('value', snapshot => {
      if (snapshot.exists()) {
        this.populateState(snapshot.val());
      }
    });
  }

  populateState(garage) {
    this.setState({
      name: garage.name,
      email: garage.email,
      contactNumber: garage.contactNumber,
      website: garage.website,
      facebook: garage.facebook,
      address: garage.address,
      neighborhood: garage.neighborhood,
      emirate: garage.emirate,
    });
  }

  componentWillUpdate() {
    const { authedUser } = this.props;
    if (authedUser) {
      fetchGarage(authedUser.uid)
      .then(garage => {
        store.dispatch({ type: "ADD_GARAGE_SUCCESS", garage });
      });
    }
  }

  handleChange = (event, value) => this.setState({ value });;

  handleChangeEmirate = (event) => {
    this.updateData("emirate", event.target.value);
  }

  updateData = (propId, val) => {
    const { authedUser } = this.props;
    const newState = {};

    newState[propId] = val;
    this.setState(newState, () => {
      firebase.database().ref('garages/' + authedUser.uid).update(newState);
    });
  }

  renderTextField(text, value, propName, icon) {
    const { classes } = this.props;

    return (
      <Grid item md={4} style={{ padding: 20 }}>
        <TextField
          className={classes.textField}
          style={{ width: "100%", marginRight: 90 }}
          label={text}
          onChange={(event, value) => this.updateData(propName, event.target.value)}
          value={value}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {icon}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    );
  }

  renderHome() {
    const {
      isLoading,
      name,
      email,
      contactNumber,
      website,
      facebook,
      address,
      neighborhood,
      emirate,
    } = this.state;
    const { classes } = this.props;

    return (
      <div style={{ height: "100%", width: "100%", padding: 42 }}>
        <Grid container spacing={24} className={classes.gridContainer}>
          {this.renderTextField("Garage Name", name, "name", <AccountCircle style={{ color: secondary[500] }}/>)}
          {this.renderTextField("Email", email, "email", <Email style={{ color: secondary[500] }}/>)}
        </Grid>
        <Grid container spacing={24} className={classes.gridContainer}>
          {this.renderTextField("Contact Number", contactNumber, "contactNumber", <Call style={{ color: secondary[500] }}/>)}
          {this.renderTextField("Website", website, "website", <Web style={{ color: secondary[500] }}/>)}
        </Grid>
        <Grid container spacing={24} className={classes.gridContainer}>
          {this.renderTextField("Facebook", facebook, "facebook", <Face style={{ color: secondary[500] }}/>)}
          {this.renderTextField("Address", address, "address", <Home style={{ color: secondary[500] }}/>)}
        </Grid>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item sm={4} style={{ display: "flex", padding: 20 }}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor="emirate">Emirate</InputLabel>
              <Select
                value={emirate}
                onChange={this.handleChangeEmirate}
                inputProps={{
                  name: 'emirate',
                  id: 'emirate',
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <LocationOn style={{ color: secondary[500] }}/>
                  </InputAdornment>
                }
              >
                <MenuItem value={1}>Abu Dhabi</MenuItem>
                <MenuItem value={2}>Ajman</MenuItem>
                <MenuItem value={3}>Dubai</MenuItem>
                <MenuItem value={4}>Fujairah</MenuItem>
                <MenuItem value={5}>Ras Al Khaimah</MenuItem>
                <MenuItem value={6}>Sharjah</MenuItem>
                <MenuItem value={7}>Umm Al Quwain</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item sm={8} style={{ padding: 20 }}>
            <Button
              style={{ marginTop: 40, color: "white" }}
              color="secondary"
              variant="raised"
              onClick={this.onSubmit}
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <CircularProgress style={{ color: "white" }}size={20} /> : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
  
  render() {
    const { value } = this.state;
    const { authedUser } = this.props;

    return (
      <Paper style={{ height: "inherit", width: "inherit" }}>
        <Tabs
          value={this.state.value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={this.handleChange}
        >
          <Tab label="Garage Info" />
          <Tab label="Images" />
          <Tab label="Services" />
        </Tabs>
        {value === 0 && this.renderHome()}
        {value === 1 && <h1>Item Two</h1>}
        {value === 2 && <h1>Item Three</h1>}
      </Paper>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(HomePane));
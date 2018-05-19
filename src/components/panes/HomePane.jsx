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
import { connect } from 'react-redux';

import { fetchGarage } from 'util/Api';
import store from 'datastore/store';
import firebase from 'datastore/database';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textField: {
  },
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
    emirate: state.garage.emirate || 1,
  };
}

class HomePane extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
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

  renderTextField(text, value, propName) {
    const { classes } = this.props;

    return <TextField
      className={classes.textField}
      style={{ width: "100%" }}
      label={text}
      onChange={(event, value) => this.updateData(propName, event.target.value)}
      value={value}
    />;
  }

  renderHome() {
    const { 
      classes,
      name,
      email,
      contactNumber,
      website,
      facebook,
      address,
      neighborhood,
      emirate,
    } = this.props;
    const { isLoading } = this.state;

    return (
      <div style={{ height: "100%", width: "100%", padding: 42 }}>
      <Grid container spacing={24}>
        <Grid item lg={3}>{this.renderTextField("Garage Name", name, "name")}</Grid>
        <Grid item lg={3}>{this.renderTextField("Email", email, "email")}</Grid>
        <Grid item lg={3}>{this.renderTextField("Contact Number", contactNumber, "contactNumber")}</Grid>
        <Grid item lg={3}>{this.renderTextField("Website", website, "website")}</Grid>
        <Grid item lg={3}>{this.renderTextField("Facebook", facebook, "facebook")}</Grid>
        <Grid item lg={3}>{this.renderTextField("Address", address, "address")}</Grid>
        <Grid item lg={3} style={{ display: "flex" }}>
          <InputLabel htmlFor="age-simple" style={{ flexGrow: 1 }}>Emirate</InputLabel>
          <Select
            value={emirate}
            onChange={this.handleChangeEmirate}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Abu Dhabi</MenuItem>
            <MenuItem value={2}>Ajman</MenuItem>
            <MenuItem value={3}>Dubai</MenuItem>
            <MenuItem value={4}>Fujairah</MenuItem>
            <MenuItem value={5}>Ras Al Khaimah</MenuItem>
            <MenuItem value={6}>Sharjah</MenuItem>
            <MenuItem value={7}>Umm Al Quwain</MenuItem>
          </Select>
        </Grid>
        <Grid item lg={10}>
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
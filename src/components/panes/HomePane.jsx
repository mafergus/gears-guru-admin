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

class HomePane extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      isLoading: false,
      name: '',
      email: '',
      contactNumber: '',
      website: '',
      facebook: '',
      address: '',
      neighborhood: '',
      emirate: '',
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderHome() {
    const { classes } = this.props;
    const { 
      isLoading,
      name,
      email,
      contactNumber,
      website,
      facebook,
      address,
      neighborhood,
      emirate 
    } = this.state;

    return (
      <div style={{ height: "100%", width: "100%", padding: 42 }}>
      <Grid container spacing={24}>
        <Grid item lg={5}>
          <TextField
            className={classes.textField}
            style={{ width: 250 }}
            placeholder="Garage Name"
            label="Garage Name"
            onChange={(event, value) => this.setState({ name: event.target.value }) }
            value={name}
          />
        </Grid>
        <Grid item lg={5}>
          <TextField
            className={classes.textField}
            style={{ width: 250 }}
            placeholder="Email"
            label="Email"
            onChange={(event, value) => this.setState({ email: event.target.value }) }
            value={email}
          />
        </Grid>
        <Grid item lg={5}>
          <TextField
            className={classes.textField}
            style={{ width: 250 }}
            placeholder="Contact Number"
            label="Contact Number"
            onChange={(event, value) => this.setState({ contactNumber: event.target.value }) }
            value={contactNumber}
          />
        </Grid>
        <Grid item lg={5}>
          <TextField
            className={classes.textField}
            style={{ width: 250 }}
            placeholder="Website"
            label="Website"
            onChange={(event, value) => this.setState({ website: event.target.value }) }
            value={website}
          />
        </Grid>
        <Grid item lg={5}>
          <TextField
            className={classes.textField}
            style={{ width: 250 }}
            placeholder="Facebook"
            label="Facebook"
            onChange={(event, value) => this.setState({ facebook: event.target.value }) }
            value={facebook}
          />
        </Grid>
        <Grid item lg={5}>
          <TextField
            className={classes.textField}
            style={{ width: 250 }}
            placeholder="Address"
            label="Address"
            onChange={(event, value) => this.setState({ address: event.target.value }) }
            value={address}
          />
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

export default withStyles(styles)(HomePane);

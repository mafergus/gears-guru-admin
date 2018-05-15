import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class HomePane extends React.Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Paper>
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
          >
            <Tab label="Active" />
            <Tab label="Disabled" disabled />
            <Tab label="Active" />
          </Tabs>
        </Paper>
      </div>
    );
  }
}
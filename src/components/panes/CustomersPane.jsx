import React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';

import { signOut, fetchCustomers, fetchGarage } from 'util/Api';
import EnhancedTable from 'components/table/EnhancedTable';
import CustomerRow from 'components/table/CustomerRow';
import store from 'datastore/store';
import SimpleSnackbar from 'components/ui/SimpleSnackbar';
import { primary } from 'util/colors';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'number', numeric: false, disablePadding: false, label: 'Phone Number' },
  { id: 'carMake', numeric: false, disablePadding: false, label: 'Make' },
  { id: 'carModel', numeric: false, disablePadding: false, label: 'Model' },
  { id: 'carYear', numeric: false, disablePadding: false, label: 'Year' },
];

function mapStateToProps(state, props) {
  return {
    garageId: state.authedUser.uid,
    customers: Object.values(state.customers) || {},
  };
}

class CustomersPane extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      isLoading: false,
      message: "",
      snackbarMessage: "",
    };
  }

  componentDidMount() {
    const { garageId } = this.props;
    fetchGarage(garageId)
    .then(garage => {
      store.dispatch({ type: "ADD_GARAGE_SUCCESS", garage });
    })
    .catch(error => {
      console.log(error);
    });
    fetchCustomers(garageId);
  }

  handleClickOpen = (event, selected) => {
      this.setState({ open: true, selected });
  };

  handleClose = () => {
    this.setState({ open: false, selected: [] });
  };

  signOut = () => {
    signOut();
  };

  sendMessage = () => {
    const { selected, message } = this.state;
    const data = "to=" + JSON.stringify(selected) + "&message=" + message;
    const url = 'https://us-central1-gearfour-815e9.cloudfunctions.net/api/sendMessage?' + data;
    console.log("Url: ", url);

    this.setState({ isLoading: true });
    fetch(url, {
      method: 'POST',
      mode: 'cors',
    })
    .then(response => response.json())
    .then(json => {
      this.handleClose();
      if (json.status === 'success') {
        this.setState({ snackbarText: "Message Sent", snackbarOpen: true });
      } else {
        this.setState({ snackbarText: "Error Sending Message", snackbarOpen: true });
      }
      setInterval(() => { this.setState({ snackbarOpen: false })}, 6000);
      this.setState({ isLoading: false });
    });
  };

  updateMessage = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  onDrop(acceptedFiles, rejectedFiles) {
    // do stuff with files...
    console.log("Accepted: ", acceptedFiles, " rejected: ", rejectedFiles);
    debugger;
    // Parse local CSV file
    Papa.parse(acceptedFiles[0], {
      complete: function(results) {
        console.log("Finished:", results.data);
        debugger;
      }
    });
  }

  renderDialog() {
    const { fullScreen } = this.props;
    const { isLoading } = this.state;

    return (
      <Dialog
        fullScreen={fullScreen}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {isLoading ? 
          <div style={{ padding: 50 }}>
            <CircularProgress size={50} />
          </div> :
          <div>
            <DialogTitle id="responsive-dialog-title">{"Send Message"}</DialogTitle>
            <DialogContent>
              <TextField
                style={{ width: 250 }}
                placeholder="Message"
                label="Message"
                onChange={this.updateMessage}
                value={this.state.message}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.sendMessage} color="primary" autoFocus>
                Send
              </Button>
            </DialogActions>
          </div>}
      </Dialog>
    );
  }

  render() {
    const { customers } = this.props;
    // const customers = [];
    const { snackbarText, snackbarOpen } = this.state;

    return (
      <div style={{ 
          height: "100%",
          width: "100%",
          backgroundColor: grey[100],
          padding: 30,
        }}
      >
        {
          customers.length === 0 ?
          <div style={{ height: "100%", width: "100%" }} className="centered-container">
            <Paper style={{ width: "85%", height: "75%" }}>
              <Dropzone
                style={{ width: "95%", height: "95%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                accept="text/csv"
                onDrop={this.onDrop}
              >
                <p>Drag and drop a CSV file to get started or</p>
                <Button label="Upload" variant="raised" style={{ marginTop: 50, color: "white", backgroundColor: primary[500] }}>
                  Upload
                </Button>
              </Dropzone>
            </Paper>
          </div>
           :
          <EnhancedTable
            columnData={columnData}
            data={customers}
            onSendMessageClick={this.handleClickOpen}
            row={CustomerRow}
          />
        }
        <SimpleSnackbar
          text={snackbarText}
          open={snackbarOpen}
        />
        {this.renderDialog()}
      </div>
    );
  }
}

export default connect(mapStateToProps)(CustomersPane);

import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

export default class LoadingPage extends React.Component { 

  render() {
    return <div style={{ 
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <CircularProgress size={50} />
    </div>;
  }
}
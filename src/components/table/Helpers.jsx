import React from 'react';

export function withRow(WrappedComponent, selectData) {
  
  return class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
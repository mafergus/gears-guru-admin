import React from 'react';
import { connect } from 'react-redux';

import EnhancedTable from 'components/campaigns/table/EnhancedTable';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'message', numeric: false, disablePadding: false, label: 'Message' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'time', numeric: false, disablePadding: false, label: 'Scheduled Time' },
];

function mapStateToProps(state, props) {
  const campaigns = state.garage.campaigns ? Object.entries(state.garage.campaigns).map(entry => {
    return { uid: entry[0], ...entry[1] }
  }) : [];
  return {
    campaigns,
  };
}

class CampaignsPane extends React.Component {

  render() {
    const { campaigns } = this.props;
    
    return (
      <div style={{ width: "100%", height: "100%", backgroundColor: "green" }}>
        <h1>Campaigns Pane</h1>
        <EnhancedTable data={campaigns}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CampaignsPane);
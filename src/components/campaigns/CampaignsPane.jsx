import React from 'react';

import EnhancedTable from 'components/campaigns/table/EnhancedTable';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'message', numeric: false, disablePadding: false, label: 'Message' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'time', numeric: false, disablePadding: false, label: 'Scheduled Time' },
];

export default class CampaignsPane extends React.Component {
  
  render() {
    return (
      <div style={{ width: "100%", height: "100%", backgroundColor: "green" }}>
        <h1>Campaigns Pane</h1>
        <EnhancedTable />
      </div>
    );
  }
}
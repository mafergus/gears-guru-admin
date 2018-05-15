import React from 'react';
import PropTypes from 'prop-types';
import SendIcon from '@material-ui/icons/Send';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/Group';
import MessageIcon from '@material-ui/icons/Sms';
import { withRouter } from 'react-router-dom';

import MenuItem from 'components/sidebar/MenuItem';

class Menu extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    children: null,
    style: {},
  };

  constructor() {
    super();
    this.state = {
      selectedItem: -1,
    };
  }

  onClick = (index) => {
    this.setState({ selectedItem: index });
  }

  render() {
    const { children, history, style } = this.props;
    const { selectedItem } = this.state;

    return (
      <div style={{ height: "100%", width: "100%", ...style }}>
        <MenuItem
          icon={<HomeIcon />}
          text="Home"
          isSelected={selectedItem === 0}
          index={0}
          tabIndex={selectedItem === 0 ? -1 : 0}
          onClick={() => { 
            this.onClick(0);
            history.push('/');
          }}
        />
        <MenuItem
          icon={<PeopleIcon />}
          text="Customers"
          isSelected={selectedItem === 1}
          index={1}
          tabIndex={selectedItem === 1 ? -1 : 0}
          onClick={() => { 
            this.onClick(1);
            history.push('/customers');
          }}
        />
        <MenuItem
          icon={<MessageIcon />}
          text="Campaign"
          isSelected={selectedItem === 2}
          index={2}
          tabIndex={selectedItem === 2 ? -1 : 0}
          onClick={() => { 
            this.onClick(2);
            history.push('/campaigns');
          }}
        />
      </div>
    );
  }
}

export default withRouter(Menu);
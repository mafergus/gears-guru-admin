import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

export default class CampaignRow extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onCheckboxClick: PropTypes.func,
    isSelected: PropTypes.bool,
  };

  static defaultProps = {
    onClick: () => {},
    onCheckboxClick: () => {},
    isSelected: false,
  };
  
  render() {
    const { data, isSelected, onClick, onCheckboxClick } = this.props;

    return (
      <TableRow
        hover
        onClick={event => onClick(event, data.uid)}
        aria-checked={isSelected}
        tabIndex={-1}
        key={data.uid}
        selected={isSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox checked={isSelected} onClick={onCheckboxClick} />
        </TableCell>
        <TableCell padding="none">{data.name}</TableCell>
        <TableCell>{data.message}</TableCell>
        <TableCell>{data.status}</TableCell>
      </TableRow>
    );
  }
}
import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

export default class Row extends React.Component {

  static propTypes = {
    customer: PropTypes.object.isRequired,
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
    const { customer, isSelected, onClick, onCheckboxClick } = this.props;

    return (
      <TableRow
        hover
        onClick={event => onClick(event, customer.uid)}
        aria-checked={isSelected}
        tabIndex={-1}
        key={customer.id}
        selected={isSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox checked={isSelected} onClick={onCheckboxClick} />
        </TableCell>
        <TableCell padding="none">{customer.name}</TableCell>
        <TableCell>{customer.phoneNumber}</TableCell>
        <TableCell>{customer.car}</TableCell>
      </TableRow>
    );
  }
}
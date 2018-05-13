import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import Header from 'components/table/Header';
import TableToolbar from 'components/table/TableToolbar';
import Row from 'components/table/Row';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    customers: PropTypes.array.isRequired,
    onSendMessageClick: PropTypes.func,
  };

  static defaultProps = {
    onSendMessageClick: () => {},
  };

// data: [].sort((a, b) => (a.name < b.name ? -1 : 1)),
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    // const data =
    //   order === 'desc'
    //     ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    //     : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    // this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    const { customers } = this.props;

    if (checked) {
      this.setState({ selected: customers.map(n => n.uid) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, onSendMessageClick } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const { customers } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);

    return (
      <Paper className={classes.root} style={{ width: 1200 }}>
        <TableToolbar
          onSendMessageClick={event => onSendMessageClick(event, selected)}
          numSelected={selected.length}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <Header
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={customers.length}
            />
            <TableBody>
              {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.uid);
                return <Row
                  key={n.uid}
                  isSelected={isSelected}
                  customer={n}
                  onClick={this.handleClick}
                />;
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(EnhancedTable);

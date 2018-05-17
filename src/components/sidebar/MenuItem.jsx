import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { primary } from 'util/colors';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      outline: 0,
      backgroundColor: primary[700],
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
    '&:hover': {
      textDecoration: "none",
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
    backgroundColor: "transparent",
  },
  primary: {
    color: primary[50],
  },
  icon: {
    color: primary[50],
  },
  text: {
    color: primary[50],
    fontWeight: 400,
  }
});

class MenuItem extends React.Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    icon: PropTypes.node.isRequired,
    tabIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  getStyles = (isSelected, isHovered) => {
    let backgroundColor = "transparent";
    if (isSelected) {
      backgroundColor = primary[700];
    } else {
      backgroundColor = isHovered ? "rgba(0, 0, 0, 0.08)" : "transparent";
    }

    return {
      color: isSelected ? "white" : primary[50],
      backgroundColor,
    };
  }

  constructor() {
    super();
    this.state = {
      isHovered: false,
    };
  }
  
  render() {
    const { classes, onClick, icon, text, index, tabIndex, isSelected } = this.props;
    const { isHovered } = this.state;
    const style = this.getStyles(isSelected, isHovered);
    const theIcon = !React.isValidElement(icon) ? null : React.cloneElement(icon, { style: { color:  isSelected ? "white" : primary[50] }});

    return (
      <li
        style={{ 
          width: "100%",
          height: 48,
          display: "flex",
          alignItems: "center",
          color: style.color,
          backgroundColor: style.backgroundColor
        }}
        className={classes.menuItem}
        tabIndex={tabIndex}
        onClick={onClick}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <Button style={{ width: "100%", height: "100%", textTransform: 'none', justifyContent: "flex-start", fontSize: "1rem" }} color="primary">
          {theIcon}
          <span style={{ marginLeft: 30, color: isSelected ? "white" : primary[50], fontWeight: 400 }}>{text}</span>
        </Button>
      </li>
    );
  }
}

export default withStyles(styles)(MenuItem);
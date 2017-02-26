import React from "react";

import TouchEvent from "../TouchEvent";
import classNames from "classnames";

export default class SearchAndSort extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(dest) {
    this.setState({
      activeFilter: dest
    });
  }

  render() {
    return <div className="list-search-and-sort" />;
  }
}

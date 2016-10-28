import React            from 'react';

export default class List extends React.Component {

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, index) {
    const {
      data,
      children,
      ...props
    } = this.props;

    props.data = item;
    props.key = index;
    const clonedChildren = children && React.cloneElement(children, props);

    return clonedChildren;
  }

  render() {
    const {
      data,
      user,
      emptyListString
    } = this.props;

    return (
      (data && data.length) ?

        <div className="list">
          {data.map((item, index) => {
            return this.renderItem(item, index);
          })}
        </div>
      :
        emptyListString ?
          <div className="list-empty">
            <p><i className="icon icon-sad"/>{emptyListString}</p>
          </div>
        : <div></div>
    );
  }
}

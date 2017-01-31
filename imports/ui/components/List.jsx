import React from 'react';
import Loader from '../components/Loader';

export default class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoaded: false, isLoadable: false };
    this.renderItem = this.renderItem.bind(this);
    this.isLoaded = this.isLoaded.bind(this);
  }

  isLoaded() {
    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 850);
  }

  componentDidMount() {
    if (!this.props.isLoadable || (this.props.isLoadable && this.props.isLoadable == true)) this.setState({ isLoadable: true });
    this.isLoaded();
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
         emptyListString,
      } = this.props;

    return (
         !this.state.isLoaded && this.state.isLoadable ?
           <Loader />
            :
            (data && data.length) ?
              <div className="list">{data.map((item, index) => (this.renderItem(item, index)))}</div>
               :
               emptyListString ?
                 <div className="list-empty">
                   <p><i className="icon icon-sad" />{emptyListString}</p>
                 </div>
                  :
                 <div />
    );
  }
}

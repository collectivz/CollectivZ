import React from 'react';

import Toastr from './Toastr';

export default class ToastrStack extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      toasts: [],
    };

    this.addToast = this.addToast.bind(this);
  }

  componentDidMount() {
    document.addEventListener('new-toast', this.addToast);
  }

  componentWillUnmount() {
    document.removeEventListener('new-toast', this.addToast);
  }

  addToast({ detail }) {
    const {
      toasts,
    } = this.state;
    const index = toasts.length ? toasts.length : 0;

    toasts.push({
      content: detail.content,
      color: detail.color,
      index,
    });

    this.setState({
      toasts,
    }, () => {
      setTimeout(() => {
        const toastIndex = toasts.findIndex((toast) => {
          if (toast.index === index) { return true; }
          return false;
        });
        toasts.splice(toastIndex, 1);
        this.setState({
          toasts,
        });
      }, 5000);
    });
  }

  render() {
    const {
      toasts,
    } = this.state;

    return (
      <div>
        {toasts.map((toast, index) => <Toastr content={toast.content} color={toast.color} key={index} displayCall />)}
      </div>
    );
  }
}

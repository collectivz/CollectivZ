import React from 'react';

import Modal from '../components/Modal';

export default class ModalContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      component: null,
      title: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    document.addEventListener('open-modal', this.openModal);
    document.addEventListener('close-modal', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('open-modal', this.openModal);
    document.removeEventListener('close-modal', this.closeModal);
  }

  openModal({ detail }) {
    this.setState({
      component: detail.component,
      title: detail.title,
      isOpen: true
    });
  }

  closeModal() {
    this.setState({
      component: null,
      title: '',
      isOpen: false
    });
  }

  render() {
    const {
      isOpen,
      component,
      title
    } = this.state;


    return (
      isOpen ?
        <Modal title={title} displayCall={true} closeModal={this.closeModal}>
          {component}
        </Modal>
      : null
    );
  }
}

import React, { Component, PropTypes }    from 'react';
import { Meteor }                         from 'meteor/meteor';

import moment                             from 'moment';

import DropDownBottom from '../DropDownBottom';
import { Toast }         from '../../helpers/Toast';


export default class MessageItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };

    this.isMine = this.isMine.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.chatWithAuthor = this.chatWithAuthor.bind(this);
    this.inviteToContacts = this.inviteToContacts.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }

  editMessage(e) {
    e.preventDefault()
    const {
      message
    } = this.props;

    const newText = this.refs.textInput.value;

    Meteor.call('messages.edit', newText, message._id, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      }
    });
    this.setState({
      editing: false
    });
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  deleteMessage() {
    Meteor.call('messages.delete', this.props.message._id, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      }
    });
  }

  isMine () {
    const {
      message
    } = this.props;

    if (Meteor.userId() === message.author) {
      return 'chat-bubble chat-bubble-mine';
    } else {
      return 'chat-bubble chat-bubble-other';
    }
  }

  userAvatar(userId) {
    let user;
    if (userId === Meteor.userId) {
      user = Meteor.user();
    } else {
      user = Meteor.users.findOne(userId);
    }
    if (user && user.profile && user.profile.avatar)
      return user.profile.avatar;
    else {
      return '/img/no-user.png'
    }

  }

  inviteToContacts() {
    const {
      message
    } = this.props;

    Meteor.call('repertory.sendInvite', message.authorName, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      }
    });
  }

  chatWithAuthor() {
    const {
      message
    } = this.props;

    Meteor.call('channels.conversationCreate', [message.author], (err, res) => {
      if (!err) {
        this.context.router.push(`/conversation/${res}`);
      } else {
        Toast(err.reason, "danger");
      }
    });
  }

  goToProfile() {
    const {
      message
    } = this.props;

    this.context.router.push(`/profile/${message.author}`)
  }

  render() {
    const { message, user } = this.props;

    const { editing } = this.state;

    let time = moment(message.createdAt).fromNow();

    return (
      <div className={this.isMine()} >

          <img src={this.userAvatar(message.author)} />

          <div className="bubble-content">

              <div className="bubble-content-header">

                <span className="bubble-content-name">
                  {message.authorName}
                </span>

                <span className="bubble-content-date">{time}</span>

                <DropDownBottom>
                  {
                    (message.author === user._id || user.isAdmin) ?
                      <ul>
                        <li><a className="drop-down-menu-link" onClick={this.toggleEdit}> Editer le message </a></li>
                        <li><a className="drop-down-menu-link" onClick={this.deleteMessage}> Supprimer le message </a></li>
                      </ul>
                    : ''
                  }
                  {
                    (message.author !== user._id) ?
                      <ul>
                        <li><a className="drop-down-menu-link" onClick={this.inviteToContacts}> Ajouter l'auteur à mes contacts </a></li>
                        <li><a className="drop-down-menu-link" onClick={this.chatWithAuthor}> Lancer une conversation avec l'auteur </a></li>
                        <li><a className="drop-down-menu-link" onClick={this.goToProfile}> Voir le profil </a></li>
                      </ul>
                    : ''
                  }
                </DropDownBottom>

              </div>

              {
                editing ?
                  <div>
                    <form className="merged" >
                      <textarea className="small" type="text" name="name" ref="textInput" defaultValue={message.text} />
                      <button className="small primary button" type="button" name="button" onClick={this.editMessage}>
                        <i className="icon icon-pencil" aria-hidden="true"></i>
                      </button>
                    </form>
                  </div>
                :
                  <p dangerouslySetInnerHTML={{__html: message.text}}></p>
              }

          </div>

      </div>
    );
  }
}

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
}

MessageItem.contextTypes = {
  router: PropTypes.object
};

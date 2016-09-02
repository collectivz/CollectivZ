import React from 'react'

import HistoryItem from '../components/HistoryItem.jsx';
import AppNav from '../components/AppNav.jsx';
import TopNav from '../components/TopNav.jsx';

export default class HistoryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      loading,
      feedbacks,
      history,
      user,
    } = this.props;
    let sortedHistory = [];
    if (!loading){
      if (history.actionHistory.length > 1) {
        sortedHistory = history.actionHistory.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
      } else {
        sortedHistory = history.actionHistory;
      }
    }
    return (
      <div>
        <TopNav text={'Historique Utilisateur'} />
        <div className="view-container">
          <div className="page-wrapper">
            <div className="scroll-content has-top-nav has-tabs-nav">
              <div className="disable-user-behavior">
                <div className="list">
                  {sortedHistory.map(function(historyItem) {
                     return <HistoryItem key={historyItem.channelId} historyItem={historyItem} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppNav user={user}/>
      </div>
    );
  }
}

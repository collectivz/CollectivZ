import React from 'react';

import List from '../components/List.jsx';
import HistoryItem from '../components/HistoryItem.jsx';

export default class UserHistory extends React.Component {
  render() {
    const {
      actionHistory
    } = this.props;

    return (
      <List
        data={actionHistory}
        type="history"
        emptyListString="Aucune évaluation."
      >
        <HistoryItem />
      </List>
    );
  }
}

import React from 'react';

import List from '../components/List.jsx';
import Breadcrumb from './Breadcrumb';
import HistoryItem from '../components/HistoryItem.jsx';

export default class UserHistory extends React.Component {
  render() {
    const {
      actionHistory
    } = this.props;

    return (
      <div className="sub-container">
        <Breadcrumb title="Mes accomplissements" hasBack={true} />
        <List
          data={actionHistory}
          type="history"
          emptyListString="Aucune évaluation."
        >
          <HistoryItem />
        </List>
      </div>
    );
  }
}

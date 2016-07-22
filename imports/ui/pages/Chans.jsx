import React from 'react'
import ChansList from '../modules/chansList/ChansList.jsx';
import TopNav from '../modules/topNav/TopNav.jsx';

export default React.createClass({


  render() {
    return (
      <div>
        <TopNav/>
        <ChansList/>
      </div>
    );
  }
})

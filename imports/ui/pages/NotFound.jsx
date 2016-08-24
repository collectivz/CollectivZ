import React from 'react'
import './NotFound.css';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="view-container has-tabs-nav">
        <div className="center-wrapper">
          <div className="hit-the-floor">
            <h1 className="shadow-layers">Not Found</h1>
            <p className="shadow-layers">Erreur 404</p>
          </div>
        </div>
      </div>
    );
  }
}

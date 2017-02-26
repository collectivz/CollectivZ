import React from "react";

import { Toast } from "../../helpers/Toast";
import { closeModal } from "../../helpers/Modal";

export default class BeerEdit extends React.Component {
  constructor(props) {
    super(props);

    this.editBeer = this.editBeer.bind(this);
  }

  editBeer(e) {
    e.preventDefault();

    const {
      beer
    } = this.props;

    const newBeer = {
      _id: beer._id,
      occasion: this.refs.occasion.value,
      date: this.refs.date.value,
      place: this.refs.place.value
    };

    Meteor.call("beers.edit", newBeer, (err, res) => {
      if (err) {
        Toast(err.reason, "danger");
      } else {
        closeModal();
        Toast("Modifications prises en compte.", "success");
      }
    });
  }

  render() {
    const {
      beer
    } = this.props;

    return (
      <div>
        <form id="box" onSubmit={this.editBeer}>

          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="occasion"
              defaultValue={beer.occasion}
            />
          </fieldset>
          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="place"
              defaultValue={beer.place}
            />
          </fieldset>
          <fieldset className="large">
            <input
              className="large"
              type="text"
              ref="date"
              defaultValue={beer.date}
            />
          </fieldset>
          <fieldset className="large">
            <input
              type="submit"
              value="Modifier"
              className="large success button"
            />
          </fieldset>

        </form>

      </div>
    );
  }
}

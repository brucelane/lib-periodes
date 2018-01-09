import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';

// const bootstrap = require('bootstrap');

window.jQuery = $;
window.$ = $;
global.jQuery = $;
// console.log(bootstrap)

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'red',
      context: props.context,
      body: props.body,
      startDate: moment(),
    };

    // Subscribe to color events.
    this.state.context.subscribe(this, this.onColor);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onColor(color) {
    // Update the state value for color.
    // console.log('color:' + color);
    this.setState({ color });
  }
  onClick() {
    // Get reference to a JQuery object in parent app.
    console.log('onClick');
    console.log($);
    const box = this.state.body.find('#box');
    // Change the color of the box.
    box.css('background-color', (box.css('background-color') === 'rgb(0, 0, 255)' ? 'black' : 'blue'));
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }
  render() {
    return (
      <div className="alert alert-warning" role="alert">
        <h3>Periode</h3>
        <span className={`badge ${this.state.color === 'red' ? 'badge-danger' : 'badge-success'} p-3`}>
          { this.state.color }
        </span>
        <button type="button" className="btn btn-default" onClick={this.onClick}>Click Me</button>
        <DatePicker
          selected={this.state.startDate}
          selectsStart
          showYearDropdown
          locale="fr-fr"
          monthsShown={2}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
        />

        <DatePicker
          selected={this.state.endDate}
          selectsEnd
          showYearDropdown
          locale="fr-fr"
          monthsShown={2}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
        />
      </div>
    );
  }
}
App.propTypes = {
  context: PropTypes.object,
  body: PropTypes.string,
};
App.defaultProps = {
  context: {
    subscribers: [],
    subscribe(parent, callback) {
      this.subscribers.push({ parent, callback });
    },
    color(name) {
      // Notify subscribers of event.
      this.subscribers.forEach((subscriber) => {
        subscriber.callback(name, subscriber.parent);
      });
    },
  },
  body: $('body'),
};
export default App;

import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import $ from 'jquery';
import { Button } from 'react-bootstrap';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

class App extends React.Component {
  constructor(props) {
    super(props);
    moment.locale('fr');
    this.state = {
      color: 'red',
      context: props.context,
      body: props.body,
      periodes: props.periodes,
      // debutPeriode: 1,
      // finPeriode: 'month',
      startDate: moment().subtract(1, 'month'),
      endDate: moment(),
    };

    // Subscribe to color events.
    this.state.context.subscribe(this, this.onColor);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    $('.App-header').addClass('border: 1px solid #333');
  }
  onColor(color) {
    // Update the state value for color.
    // console.log('color:' + color);
    this.setState({ color });
  }
  onClick() {
    // Get reference to a JQuery object in parent app.
    const box = this.state.body.find('#box');
    // Change the color of the box.
    box.css('background-color', (box.css('background-color') === 'rgb(0, 0, 255)' ? 'black' : 'blue'));
    $('.App-header').addClass('border: 1px solid #333');
    this.state.body.find('#titre').css('background-color', 'orange');
    this.state.body.find('#titre').html('Titre');
    this.state.body.find('#titrePeriode').text(`Du ${moment(this.state.startDate).format('dddd DD/MM/YYYY')} au ${moment(this.state.endDate).format('dddd DD/MM/YYYY')}`);
  }
  onSampleClick() {
    this.setState({
      periodes: [],
    });
    $.ajax({
      method: 'get',
      url: 'assets/json/periodes.json',
      data: 'passing data if any',
      success(data) {
        console.log(data);
        /* this.setState({
          periodes: data,
        }); */
      },
      error(err) {
        console.log(err);
      },
    });
  }
  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }
  handleChangeEnd(date) {
    this.setState({
      endDate: date,
    });
  }
  render() {
    return (
      <div className="alert alert-warning" role="alert">
        <h3 className="App-header">{this.state.periodes}</h3>
        <span className={`badge ${this.state.color === 'red' ? 'badge-danger' : 'badge-success'} p-3`}>
          { this.state.color }
        </span>
        <Button bsStyle="primary" bsSize="large" active onClick={this.onSampleClick}>onClick</Button>
        <Button bsStyle="success" onClick={this.onClick}>Click Me</Button>
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
  body: PropTypes.object,
  periodes: PropTypes.array,
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
  periodes: [],
};
export default App;

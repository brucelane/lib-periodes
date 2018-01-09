console.log('toto');
/*var PubSubManager = {
  subscribers: [],

  subscribe: function(parent, callback) {
    this.subscribers.push({ parent: parent, callback: callback });
  },

  color: function(name) {
    // Notify subscribers of event.
    this.subscribers.forEach(function(subscriber) {
      subscriber.callback(name, subscriber.parent);
    });
  }
};
*/
$(function() {
   /*setTimeout(function() {
    console.log('timeout')
    ReactDOM.render(React.createElement(Periode, { context: PubSubManager, body: $('body')}), document.getElementById('root'));
  }, 0); */

  // Change the box color every few seconds.
  setInterval(function() {
    var box = $('#box');
    var color = box.css('background-color') === 'rgb(255, 0, 0)' ? 'orange' : 'red';

    // Change box color.
    box.css('background-color', color);

    // Notify subscribers.
    //PubSubManager.color(color);
  }, 3000)
});
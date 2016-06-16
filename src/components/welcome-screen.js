const React = require('react')

module.exports = React.createClass({
  name: 'WelcomeScreen',

  propTypes: {
    onNewApplicant: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      email: ''
    }
  },

  onSubmit: function (event) {
    event.preventDefault()
    this.props.onNewApplicant({
      email: this.state.email
    })
  },

  updateEmail: function (event) {
    this.setState({
      email: event.target.value
    })
  },

  render: function () {
    return (
    <div>
      <h1>Welcome</h1>
      <form onSubmit={this.onSubmit}>
        <input type="text" onChange={this.updateEmail} value={this.state.email} />
        <button>Go</button>
      </form>
    </div>
    )
  }
})

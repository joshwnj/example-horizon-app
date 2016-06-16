const React = require('react')

module.exports = React.createClass({
  name: 'SubmitSolutionScreen',

  propTypes: {
    onSolution: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      token: '',
      solution: ''
    }
  },

  onSubmit: function (event) {
    event.preventDefault()
    this.props.onSolution({
      token: this.state.token,
      solution: this.state.solution
    })
  },

  updateField: function (field, event) {
    const newState = {}
    newState[field] = event.target.value

    this.setState(newState)
  },

  formFieldProps: function (field) {
    return {
      value: this.state[field],
      onChange: this.updateField.bind(this, field)
    }
  },

  render: function () {
    return (
      <div>
        <h1>Submit Your Solution</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <input placeholder="token" {...this.formFieldProps('token')} />
          </div>
          <textarea {...this.formFieldProps('solution')}></textarea>
          <div>
            <button>Go</button>
          </div>
        </form>
      </div>
    )
  }
})

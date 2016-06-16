const React = require('react')
const WelcomeScreen = require('./welcome-screen')
const SubmitSolutionScreen = require('./submit-solution-screen')
const ApplicantList = require('./applicant-list')

module.exports = React.createClass({
  name: 'App',

  getInitialState: function () {
    return {
      isHorizonReady: false,
      applicants: []
    }
  },

  componentWillMount: function () {
    // setup horizon
    const self = this
    this.horizon = Horizon();
    this.horizon.onReady(function () {
      console.log('horizon ready')
      self.setState({
        isHorizonReady: true
      })

      // watch the applicants collection
      self.horizon('applicants')
             .watch()
             .subscribe(function (docs) {
               self.setState({
                 applicants: docs
               })
             }, function onError (err) {
               console.error(err)
             })
    });
    this.horizon.connect();
  },

  onNewApplicant: function (data) {
    // store the new applicant
    this.horizon('applicants')
        .store(data)
        .subscribe(function (result) {
          console.log('saved', result)
        }, function onError (err) {
          console.error(err)
        })
  },

  onSolution: function (data) {
    const collection = this.horizon('applicants')
    collection
        .find(data.token)
        .fetch()
        .subscribe(function (rec) {
          rec.hasPassed = true
          collection.replace(rec)
           .subscribe(function (res) {
             console.log('saved')
           }, function onError (err) {
             console.error(err)
           })
        }, function onError (err) {
          console.error(err)
        })
  },

  render: function () {
    if (!this.state.isHorizonReady) {
      return <div>loading...</div>
    }

    return (
      <div>
        <WelcomeScreen onNewApplicant={this.onNewApplicant}/>
        <SubmitSolutionScreen onSolution={this.onSolution} />
        <ApplicantList applicants={this.state.applicants} />
      </div>
    )
  }
})

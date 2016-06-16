const React = require('react')

function renderApplicant (data) {
  const color = data.hasPassed ? 'green' : 'black'
  return (
    <li key={data.id} style={{color: color}}>
      {data.email}
      -
      {data.id}
    </li>
  )
}

function ApplicantList (props) {
  return (
    <div>
      <h1>Applicants</h1>
      <ul>
        {props.applicants.map(renderApplicant)}
      </ul>
    </div>
  )
}

ApplicantList.propTypes = {
  applicants: React.PropTypes.array
}

ApplicantList.defaultProps = {
  applicants: []
}

module.exports = ApplicantList

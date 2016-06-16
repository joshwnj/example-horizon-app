const React = require('react')

function renderApplicant (data) {
  const color = data.hasPassed ? 'green' : 'black'
  return (
    <tr key={data.id} style={{color: color}}>
      <td>{data.id}</td>
      <td>{data.email}</td>
    </tr>
  )
}

function ApplicantList (props) {
  return (
    <div>
      <h1>Applicants</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
        {props.applicants.map(renderApplicant)}
        </tbody>
      </table>
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

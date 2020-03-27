import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import 'summit-schedule-app/dist/main.js'
import 'summit-schedule-app/dist/main.css'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1>Show Schedule</h1>
              <summit-schedule
                  summit_id="27"
                  api_access_token=""
                  api_url="https://testresource-server.openstack.org"
                  schedule_base="schedule"
                  schedule_url="localhost/schedule"
                  login_url="login-url-not-set"
                  calendar_instructions_link="calendar-instructions-link-not-set"
                  venues_page_link="venues-page-not-set"
              />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'

const apiStatusContants = {
  initial: 'INITIAL',
  succes: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    data: [],
    apiStatus: apiStatusContants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusContants.inProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    const updatedData = data.courses.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      logoUrl: eachData.logo_url,
    }))
    if (response.ok === true) {
      this.setState({data: updatedData, apiStatus: apiStatusContants.succes})
    } else {
      this.setState({apiStatus: apiStatusContants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader />
    </div>
  )

  renderFailureView = () => (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <div>
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
        </div>
        <button type="button" onClick={this.getData}>
          Retry
        </button>
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <div>
        <h1>Courses</h1>
        <ul>
          {data.map(each => (
            <Course details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContants.succes:
        return this.renderSuccessView()
      case apiStatusContants.failure:
        return this.renderFailureView()
      case apiStatusContants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderApiStatus()}</div>
      </>
    )
  }
}

export default Home

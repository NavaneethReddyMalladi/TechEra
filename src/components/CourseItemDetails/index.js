import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

const apiStatusContants = {
  initial: 'INITIAL',
  succes: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {detailedData: {}, apiStatus: apiStatusContants.initial}

  componentDidMount() {
    this.getDetailedData()
  }

  getDetailedData = async () => {
    this.setState({apiStatus: apiStatusContants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    console.log(response.ok)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        id: data.course_details.id,
        description: data.course_details.description,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        detailedData: updatedData,
        apiStatus: apiStatusContants.succes,
      })
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
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getDetailedData}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {detailedData} = this.state
    const {description, name, imageUrl} = detailedData
    return (
      <>
        <div className="item-container">
          <img src={imageUrl} alt={name} />
          <div>
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div>
      </>
    )
  }

  renderCourseApiStatus = () => {
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
        {this.renderCourseApiStatus()}
      </>
    )
  }
}

export default CourseItemDetails

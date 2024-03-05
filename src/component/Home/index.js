import React, {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'
import './index.css'

class Home extends Component {
  state = {isLoading: true, isFailed: false, isSuccess: false, courseList: []}

  componentDidMount() {
    this.getApiDetails()
  }

  getApiDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      console.log(updatedData)
      this.setState({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        courseList: updatedData,
      })
    } else {
      this.setState({
        isLoading: false,
        isSuccess: false,
        isFailed: true,
      })
    }
  }

  render() {
    const {isFailed, isLoading, isSuccess, courseList} = this.state
    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div data-testid="loader" className="spinner">
              <TailSpin
                height="80"
                width="80"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {isSuccess && (
            <div>
              <h1>Courses</h1>
              <ul className="list">
                {courseList.map(eachCourse => (
                  <Course key={eachCourse.id} details={eachCourse} />
                ))}
              </ul>
            </div>
          )}
          {isFailed && (
            <div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                  alt="failure view"
                />
              </div>
              <h1>Oops! Something Went Wrong</h1>
              <p>We cannot seem to find the page you are looking for</p>
              <div>
                <button type="button" onClick={this.getApiDetails}>
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default Home

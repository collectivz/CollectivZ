import React from 'react'

import Slide0 from '../components/slides/slide0'
import Slide1 from '../components/slides/slide1'
import Slide2 from '../components/slides/slide2'
import Slide3 from '../components/slides/slide3'
import Slide4 from '../components/slides/slide4'

const Slides = [
  Slide0,
  Slide1,
  Slide2,
  Slide3,
  Slide4,
]

export default class Onboarding extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      slide: 0
    }

    this.goTo = this.goTo.bind(this)
    this.pickSlide = this.pickSlide.bind(this)
  }

  goTo(path) {
    this.context.router.push(path)
  }

  pickSlide(slideNumber) {
    this.setState({
      slide: slideNumber
    })
  }

  isActive(slideNumber) {
    const { slide } = this.state
    return (slideNumber === slide) ? "active" : ""
  }

  renderSlide() {
    const { slide } = this.state
    const CurrentSlide = Slides[slide]

    return <CurrentSlide/>
  }

  render() {
    return (
        <div className="screen-box onboarding">
          {this.renderSlide()}
          <div className="steps button-box">
          <a className={`step ${this.isActive(0)}`} onClick={this.pickSlide.bind(this, 0)}></a>
          <a className={`step ${this.isActive(1)}`} onClick={this.pickSlide.bind(this, 1)}></a>
          <a className={`step ${this.isActive(2)}`} onClick={this.pickSlide.bind(this, 2)}></a>
          <a className={`step ${this.isActive(3)}`} onClick={this.pickSlide.bind(this, 3)}></a>
          <a className={`step ${this.isActive(4)}`} onClick={this.pickSlide.bind(this, 4)}></a>
          </div>
          <div className="pass button-box">
            <button className="button primary" onClick={this.goTo.bind(this, "/register")}>S'inscrire</button>
            <button className="button primary" onClick={this.goTo.bind(this, "/login")}>Se connecter</button>
          </div>
        </div>

    )
  }
}

Onboarding.contextTypes = {
  router: React.PropTypes.object
}

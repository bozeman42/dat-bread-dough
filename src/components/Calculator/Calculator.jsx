import React, { Component } from 'react'

const KNEEDING_FACTOR = 5

class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airTemperature: 68,
      flourTemperature: 68,
      desiredDoughTemperature: 75,
      waterTemperature: null
    }
    this.handleInput = this.handleInput.bind(this)
    this.calculateWaterTemperature = this.calculateWaterTemperature.bind(this)
  }

  handleInput(field) {
    return e => {
      this.setState({
        ...this.state,
        [field]: parseFloat(e.target.value)
      })
    }
  }

  calculateWaterTemperature () {
    const { airTemperature, flourTemperature, desiredDoughTemperature } = this.state
    const desiredTempFactor = 3 * desiredDoughTemperature
    return Math.round((desiredTempFactor - KNEEDING_FACTOR - airTemperature - flourTemperature) * 10000) / 10000
  }

  render() {
    const { state: { flourTemperature, airTemperature, desiredDoughTemperature }, handleInput, calculateWaterTemperature } = this
    return (
      <div>
        <div>
          <label htmlFor='desired-dough-temperature'>Desired Dough Temperature &deg;F</label>
          <input type='number' id='desired-dough-temperature' onInput={handleInput('desiredDoughTemperature')} value={desiredDoughTemperature} />
        </div>
        <div>
          <label htmlFor='flour-temperature'>Flour Temperature &deg;F</label>
          <input type='number' id='flour-temperature' onInput={handleInput('flourTemperature')} value={flourTemperature} />
        </div>
        <div>
          <label htmlFor='air-temperature'>Air Temperature &deg;F</label>
          <input type='number' id='air-temperature' onInput={handleInput('airTemperature')} value={airTemperature} />
        </div>
        <p>Water temperature:</p>
        <h2>{calculateWaterTemperature()}&deg;F</h2>
      </div>
    )
  }
}

export default Calculator

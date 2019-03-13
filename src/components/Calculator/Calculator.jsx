import React, { Component } from 'react'

const KNEEDING_FACTOR = 5
const INITIAL_AIR_TEMP_F = 68
const INITIAL_FLOUR_TEMP_F = 68
const INITIAL_DOUGH_TEMP_F = 76


class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      airTemperatureF: INITIAL_AIR_TEMP_F,
      flourTemperatureF: INITIAL_FLOUR_TEMP_F,
      desiredDoughTemperatureF: INITIAL_DOUGH_TEMP_F,
      airTemperatureC: this.fToC(INITIAL_AIR_TEMP_F),
      flourTemperatureC: this.fToC(INITIAL_FLOUR_TEMP_F),
      desiredDoughTemperatureC: this.fToC(INITIAL_DOUGH_TEMP_F),
      waterTemperatureF: null,
      waterTemperatureC: null,
      units: 'fahrenheit'
    }
    this.handleTempInput = this.handleTempInput.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.unitLabel = this.unitLabel.bind(this)
    this.calculateWaterTemperature = this.calculateWaterTemperature.bind(this)
    this.fieldValue = this.fieldValue.bind(this)
  }

  cToF(temperature) {
    return Math.round(((temperature * 9 / 5) + 32) * 10) /10
  }

  fToC(temperature) {
    return Math.round(((temperature - 32) * (5 / 9)) * 10) / 10
  }

  handleInput(field) {
    return e => {
      this.setState({
        units: e.target.value
      })
    }
  }

  handleTempInput(field) {
    return units => {
      return e => {
        console.log(this)
        const tempF = units === 'fahrenheit' ? e.target.value : this.cToF(e.target.value)
        const tempC = units === 'celsius' ? e.target.value : this.fToC(e.target.value)
        this.setState({
          [`${field}F`]: parseFloat(tempF),
          [`${field}C`]: parseFloat(tempC)
        })
      }
    }
  }

  unitLabel() {
    return `°${this.state.units === 'fahrenheit' ? 'F' : 'C'}`
  }

  calculateWaterTemperature() {
    const { airTemperatureF, flourTemperatureF, desiredDoughTemperatureF } = this.state
    const desiredTempFactor = 3 * desiredDoughTemperatureF
    const resultF = desiredTempFactor - KNEEDING_FACTOR - airTemperatureF - flourTemperatureF
    return Math.round((this.state.units === 'fahrenheit' ? resultF : this.fToC(resultF)) * 10) / 10 
  }

  fieldValue (field) {
    const unitSuffix = this.state.units === 'fahrenheit' ? 'F' : 'C'
    return this.state[`${field}${unitSuffix}`]
  }

  render() {
    const {
      state: {
        units
      },
      handleTempInput,
      handleInput,
      fieldValue,
      calculateWaterTemperature,
      unitLabel
    } = this
    return (
      <div>
        <div>
          <p>Units:</p>
          <div>
            <label htmlFor='fahrenheit'>Fahrenheit</label>
            <input type='radio' onChange={handleInput('units')} name='units' checked={units === 'fahrenheit'} value='fahrenheit' />
          </div>
          <div>
            <label htmlFor='celsius'>Celsius</label>
            <input type='radio' onChange={handleInput('units')} name='units' checked={units === 'celsius'} value='celsius' />
          </div>
        </div>
        <div>
          <label htmlFor='desired-dough-temperature'>Desired Dough Temperature {unitLabel()}</label>
          <input type='number' id='desired-dough-temperature' onChange={handleTempInput('desiredDoughTemperature')(units)} value={fieldValue('desiredDoughTemperature')} />
        </div>
        <div>
          <label htmlFor='flour-temperature'>Flour Temperature {unitLabel()}</label>
          <input type='number' id='flour-temperature' onChange={handleTempInput('flourTemperature')(units)} value={fieldValue('flourTemperature')} />
        </div>
        <div>
          <label htmlFor='air-temperature'>Air Temperature {unitLabel()}</label>
          <input type='number' id='air-temperature' onChange={handleTempInput('airTemperature')(units)} value={fieldValue('airTemperature')} />
        </div>
        <p>Water temperature:</p>
        <h2>{calculateWaterTemperature()}{unitLabel()}</h2>
      </div>
    )
  }
}

export default Calculator

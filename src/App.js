import React from 'react'

import {Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css'
import { fetchData } from './api'

class App extends React.Component {
    // Using state to pass fetch data to the components as a prop
    state = {
        data: {},
        country: '',
    }

    // Fetching the API
    // componentDidMount has a built-in async
    async componentDidMount() {
        const fetchedData = await fetchData()
        this.setState({data: fetchedData})
    }

    handleCountryChange = async (country) => {
        // Fetch the data
        const fetchedData = await fetchData(country)
        // Set the state
        this.setState({data: fetchedData, country: country})
    }

    render() {
        // Deconstruct the state for easier access
        const {data, country} = this.state
        
        return (
            <div className={styles.container}>
                <Cards
                data={data}
                />
                <CountryPicker
                handleCountryChange = {this.handleCountryChange}
                />
                <Chart
                data={data}
                country={country}
                />
            </div>
        )
    }
}

export default App
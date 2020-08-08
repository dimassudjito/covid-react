import React from 'react'

import {Cards, Chart, CountryPicker} from './components'
import styles from './App.module.css'
import { fetchData } from './api'

class App extends React.Component {
    // Using state to pass fetch data to the components as a prop
    state = {
        data: {},
    }
    
    // Fetching the API
    // componentDidMount has a built-in async
    async componentDidMount() {
        const fetchedData = await fetchData()
        this.setState({data: fetchedData})
    }
    
    render() {
        // Deconstruct the state for easier access
        const {data} = this.state
        
        return (
            <div className={styles.container}>
                <Cards
                data={data}
                />
                <CountryPicker/>
                <Chart/>
            </div>
        )
    }
}

export default App
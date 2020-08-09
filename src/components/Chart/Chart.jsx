import React, {useState, useEffect} from 'react'
import {fetchDailyData} from '../../api'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
    // Creating state for the data
    const [dailyData, setDailyData] = useState({})
    
    // Running the fetching function created in the api folder 
    // And assigning it to the state
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }

        fetchAPI()
    })

    // Creating the chart component conditionally
    const lineChart = (
        // Checking if data is fetched yet
        dailyData.length  ?
        <Line 
        data={{
            // Labels value uses the array of date
            labels: dailyData.map(({date}) => date),
            datasets: [{
                // Confirmed datasets
                // Data value uses the array of confirmed cases
                data: dailyData.map(({ confirmed }) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true
            }, {
                // Death datasets
                // Data value uses the array of death numbers
                data: dailyData.map(({ deaths }) => deaths),
                label: 'Deaths',
                borderColor: 'rgba(255, 0, 0, 0.5)',
                fill: true
            }]
        }}
        /> : null
    )

    const barChart = (
        confirmed ? 
        (
            <Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.5)', 
                        'rgba(0, 255, 0, 0.5)', 
                        'rgba(255, 0, 0, 0.5)'
                    ],
                    data:[confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{
                legend: {display: false},
                title: {display: true, text: `Current state in ${country}`}
            }}
            />
        ) : null
    )

    return (
        <div className={styles.container}> 
        {country ? barChart : lineChart}
        </div>
    )
}

export default Chart
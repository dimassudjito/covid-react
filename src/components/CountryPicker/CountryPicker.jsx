import React, {useState, useEffect} from 'react'
import {NativeSelect , FormControl} from '@material-ui/core'
import { fetchCountries } from '../../api'

import styles from './CountryPicker.module.css'

const CountryPicker = ({ handleCountryChange }) => {
    // Setting up states for countries list
    const [fetchedCountries, setFetchedCountries] = useState([])
    
    useEffect(() => {
        const fetchAPI = async () => {
            // Assigning API value to the state
            setFetchedCountries(await fetchCountries())
        }

        fetchAPI()
    
    }, [setFetchedCountries]) // Run everytime value is changed

    console.log(fetchedCountries)
    
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                {/* Looping the list to create options */}
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl> 
    )
}

export default CountryPicker
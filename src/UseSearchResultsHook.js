import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as Constants from './api/endPoints'
function UseSearchResultsHook(query, page) {
    const [list, setList] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    function fetchData() {
       
        let movieData = axios.get(Constants.API.search + Constants.CATEGORY.movie, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                query,
                page
            },
           
        });
        let tvData = axios.get(Constants.API.search + Constants.CATEGORY.tv, {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                query,
                page
            }
        });

        return Promise.all([movieData, tvData])
    }
    useEffect(() => {
        
        setList([])
    }, [query])

    useEffect(() => {
        if(query === ''){
            setList([])
            return;
        }
        setLoading(true)
        fetchData().then(data => {
            setLoading(false);
            
            console.log('data' ,data);
            
            let results = data.reduce((acc, curr) => {
                acc.push(...curr.data.results);
                return acc
            }, []);
            console.log(results);
            setList(prev => [...prev, ...results])
        }).catch(err => { console.log(err); setError(error) })

    }, [query, page])
    return { list, error ,loading }


}

export default UseSearchResultsHook
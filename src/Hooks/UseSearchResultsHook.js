import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as Constants from '../api/endPoints'
function UseSearchResultsHook(query, page) {
    const [list, setList] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false)
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
        if (query === '') {
            setList([])
            return;
        }
        setLoading(true)
        fetchData().then(data => {
            setLoading(false);
            setHasMore(data[0].data.page <= data[0].data.total_pages || data[1].data.page <= data[1].data.total_pages)
            console.log('data', data);

            let results = data.reduce((acc, curr) => {
                acc.push(...curr.data.results);
                return acc
            }, []);
            console.log('fffdg', results);
            setList(prev => [...prev, ...results]);
            // 
        }).catch(err => { console.log(err); setError(error) })

    }, [query, page])
    return { list, error, loading, hasMore }


}

export default UseSearchResultsHook
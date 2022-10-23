import React, { useState, useRef, useEffect, useCallback } from 'react'
import UseSearchResultsHook from './UseSearchResultsHook';
import styles from './styles/search.module.css';
import Movie from './Movie';
import { useParams } from 'react-router';
function Search() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  let { keyword } = useParams()
  // const [loading, setloading] = useState(false);
  const { list, error, loading } = UseSearchResultsHook(query, page)
  const observer = useRef();
  useEffect(() => {
    setQuery(keyword)
  }, [keyword])

  const lastElementRef = useCallback(
    function (node) {

      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)


    },
    [loading]
  )


  useEffect(() => {

    console.log('lidt', list);

  }, [list])

  return (
    <main >
      {/* <input value={query} onChange={(e) => { setQuery(e.target.value) }} placeholder="Search" /> */}
      <p className={styles.heading}>Showing results for "{query}"</p>
      <div className={styles.container}>
        {
          list?.map((item, index) => {
            if (list.length === index + 1) {
              return <div ref={lastElementRef} key={item.id}>
                <Movie key={list.id} movie={item} />
              </div>
            }
            else {
              return <div key={item.id}>
                {/* {item?.name ?? item?.title} */}
                <Movie key={list.id} movie={item} />
              </div>
            }

          })
        }
        {
          loading && <div>Loading</div>
        }
        {
          error && <div>Error</div>
        }
      </div>
    </main>
  )
}

export default Search;
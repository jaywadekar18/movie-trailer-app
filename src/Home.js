import React from 'react'

import Slider from './Slider'


function Home() {
  let contentList = [
    {
      id: 1,
      title: "Polular Movies",
      contentType: 'movie',
      category: 'popular'

    },
    {
      id: 2,
      title: "Popular TV shows",
      contentType: 'tv',
      category: 'popular'
    },
    {
      id: 3,
      title: "Top rated Movies",
      contentType: 'movie',
      category: 'top_rated'

    },
    {
      id: 4,
      title: "Top rated TV shows",
      contentType: 'tv',
      category: 'top_rated'
    }
  ]
  return (
    <div>
      {contentList.map(content => {
        return <Slider content={content} key={content.id}/>
      })}
  
    </div>
  )
}

export default Home
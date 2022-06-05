import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useEffect } from 'react'

const MAX_TWEET_CHAR = 250

// Função formulário do tweet com uso do state(estado)
 function TweetForm() {
  const [text, setText] = useState('')

  function changeText(e) {
    setText(e.target.value)
  }

  return (
  <div className='border-b border-silver p-4 space-y-4'>
    <div className='flex  space-x-6'>
       <svg
          width="35"
          height="35"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="24" r="24" fill="white" />
       </svg>
       <h1 className='font-bold text-xl'>Página Inicial</h1>
    </div>

  <form className='pl-12 text-lg flex flex-col'>
      <textarea 
      name="text"
      value={text}
      placeholder="O que está acontecendo?" 
      className='bg-transparent outline-none disabled:opacity-50'
      onChange={changeText} 
      // disabled={true}
      />
      
      <div className='flex justify-end items-center space-x-3'>
        <span className='text-sm'>  
            <span> {text.length} </span> / <span className='text-birdBlue'>{MAX_TWEET_CHAR}</span> 
        </span>
        <button 
        className='bg-birdBlue text-platinum px-5 py-2 rounded-full disabled:opacity-50'
        disabled={text.length > MAX_TWEET_CHAR}
        >
        Tweet
      </button>
      </div>
  </form>
  </div>
  )
}

 function Tweet({name, username, children}) {

  return (
    <div className="flex space-x-3 p-4 border-b border-silver">
       <div>
         <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          >
          <circle cx="24" cy="24" r="24" fill="#0082DD"/>
         </svg>
      </div>
      
      <div className='space-y-1'>
        <span className="font-bold text-sm">{name}</span> {' '}
        <span className="text-sm text-silver">@{username}</span>

        <p>{children}</p>
        <div className='flex space-x-1 text-silver text-sm items-center'>
          <HeartIcon className='w-6 stroke-1'/>
          <span>1.2k</span>
        </div>
      </div>
    </div>
  )
}

export function Home({loggedInUser}) {
   const [data, setData] = useState([])
  
   async function getData() {
    const res = await axios.get('http://localhost:9901/tweets', {
      headers: {
        'authorization': `Bearer ${loggedInUser.accessToken}`
      }
    })
    setData(res.data)
   }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
       <TweetForm />
      <div>
        {data.length && data.map(tweet => (
          <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username}>
            {tweet.text}
          </Tweet>          
        ))}
      </div>
    </>
  )  
}
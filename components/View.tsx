import React from 'react'
import Ping from './Ping'
import { posts } from '@/public/posts'

const View = async ({ id }: { id: string }) => {
    const views = await posts.find(post => post._id.toString() == id)?.views
    
    //TODO : Update The Number Of Views

    
  return (
      <div className="view-container">
          <div className="absolute -top-2 -right-2">
              <Ping/>
          </div>
          <p className="view-text">
              <span className="font-black text-white ">{views} views</span>
          </p>
    </div>
  )
}

export default View
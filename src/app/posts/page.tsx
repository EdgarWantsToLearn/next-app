import React, { use, useEffect } from 'react'
import PostsListComponent from './PostsListComponent'
import { IPost } from '@/types'

const fetchAllPosts = async () => {
  const response = await fetch('http://localhost:3000/api/posts')
  const responseJson = await response.json()
  console.log(responseJson.data)
  return responseJson.data
}

export default async function PostsListPage() {
  const postsList = await fetchAllPosts()


  return (
    <div>
      <div>
        <h2>Post List SSR</h2>
        {postsList.length === 0 && <div>No posts</div>}

        {postsList.length > 0 && postsList.map((post: IPost) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
          </div>
        ))}
      </div>

      <div>
        <h2>Post list Hybride</h2>
        <PostsListComponent />
      </div>
    </div>
  )
}
"use client"
import React, { useState, useEffect } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [blockId, setBlockId] = useState(null);
  const [block, setBlock] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log('Ошибка при загрузке постов:', error);
    }
  };
  const handleUserClick = (postId) => {
    setBlockId(postId);
    const newURL = `http://localhost:3000/users/${postId}`;
    window.history.pushState(null, '', newURL);
  };
  useEffect(() => {
    const handlePopstate = () => {
    const postId = window.location.pathname.replace('/users/', '');
    setBlockId(postId);
  };
  window.addEventListener('popstate', handlePopstate);
  return () => {
    window.removeEventListener('popstate', handlePopstate);
  };
}, []);

useEffect(() => {
  if (blockId) {
    const user = posts.find((post) => post.id === blockId);
  setBlock(user);
}
}, [blockId, posts]);

  return (
    <div>
      {block && (
        <div className='block'>
          <span>{block.id}</span>
          <p><span>Name:</span> {block.name}</p>
          <p><span>Username:</span> {block.username}</p>
          <p><span>Email:</span> {block.email}</p>
          <p><span>Phone:</span> {block.phone}</p>
          <p><span>Website:</span> {block.website}</p>
          <h1>Company</h1>
          <p><span>Name:</span> {block.company.name}</p>
          <p><span>CatchPhrase:</span> {block.company.catchPhrase}</p>
          <p><h3>Bs:</h3> {block.company.bs}</p>
        </div>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={blockId ? { display: 'none' } : {}}>
            <span>{post.id}</span>
            <p>{post.name}</p>
            <p>{post.username}</p>
            <button onClick={() => handleUserClick(post.id)}>Post</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default Posts;
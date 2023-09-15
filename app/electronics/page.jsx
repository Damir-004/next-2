"use client"
import React, { useState, useEffect } from 'react';

function Electronics() {
  const [posts, setPosts] = useState([]);
  const [blockId, setBlockId] = useState(null);
  const [block, setBlock] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/category/electronics/');
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
          <img src={block.image} alt="" />
          <p>{block.title}</p>
          <p>{block.price}</p>
          <p><span>Phone:</span> {block.phone}</p>
          <p><span>Website:</span> {block.website}</p>
        </div>
      )}
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={blockId ? { display: 'none' } : {}}>
            <span>{post.id}</span>
            <img src={post.image} alt="" />
            <p>{post.title}</p>
            <p>{post.price}</p>
            <button onClick={() => handleUserClick(post.id)}>Post</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default Electronics;
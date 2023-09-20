"use client"
import React, { useState, useEffect } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [blockId, setBlockId] = useState(null);
  const [block, setBlock] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log('Ошибка при загрузке постов:', error);
    }
  };

  const handleUserClick = (postId) => {
    setBlockId(postId);
    const newURL = `http://localhost:3000/products/${postId}`;
    window.history.pushState(null, '', newURL);
  };

  useEffect(() => {
    const handlePopstate = () => {
      const postId = window.location.pathname.replace('/products/', '');
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {block && (
        <div className='block'>
          <img src={block.image} alt="Image"/>
          <div className='block-box' >
            <p>{block.title}</p>
            <h2>Price: {block.price}$</h2>
            <p>{block.description}</p>
            <p>{block.category}</p>
          </div>
        </div>
      )}

      <div>
        <input style={blockId ? { display: 'none' } : {}} type='search' value={searchTerm} onChange={handleSearch} />
      </div>

      <ul>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <li key={post.id} style={blockId ? { display: 'none' } : {}}>
              <img src={post.image} alt="Image"/>
              <p>{post.title}</p>
              <button className='button' onClick={() => handleUserClick(post.id)}>Post</button>
            </li>
          ))
        ) : (
          <p className='empty'>Пусто</p>
        )}
      </ul>
    </div>
  );
}

export default Posts;

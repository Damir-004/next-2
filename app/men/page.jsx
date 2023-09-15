"use client"
import React, { useState, useEffect } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [blockId, setBlockId] = useState(null);
  const [block, setBlock] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Определение значения totalPosts
  const totalPosts = posts.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log('Ошибка при загрузке постов:', error);
    }
  };  
  const handleUserClick = (postId) => {
    setBlockId(postId);
    const newURL = `http://localhost:3001/posts/${postId}`;
    window.history.pushState(null, '', newURL);
  };
  useEffect(() => {
    const handlePopstate = () => {
      const postId = window.location.pathname.replace('/posts/', '');
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
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='box'>
      {block && (
        <div className='block'>
          <span>{block.id}</span>
          <h3>{block.title}</h3>
          <p>{block.body}</p>
        </div>
      )}
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id} style={blockId ? { display: 'none' } : {}}>
            <span>{post.id}</span>
            <p>{post.title}</p>
            <button onClick={() => handleUserClick(post.id)}>Post</button>
          </li>
          
        ))}
      </ul>
      
      <nav 
         style={blockId ? { display: 'none' } : {}}
      >
        
        
        <ol className='pagination' >
          {pageNumbers.map((number) => (
            <li key={number} className='page-item'>
              <button onClick={() => paginate(number)} className='page-link'>
                {number}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default Posts;

// frontend/src/pages/forum.js

import { useEffect, useState } from 'react';
import apiClient from '../utils/api';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

export default function Forum() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await apiClient.get('/forum/posts');
      setPosts(res.data);
    } catch (error) {
      console.error('获取帖子失败', error);
    }
  };

  return (
    <div className="container">
      <h2><FormattedMessage id="forum" defaultMessage="Forum" /></h2>
      <Link href="/forum/create"><a><FormattedMessage id="create_post" defaultMessage="Create Post" /></a></Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/forum/${post.id}`}><a>{post.title}</a></Link> by {post.author.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
}

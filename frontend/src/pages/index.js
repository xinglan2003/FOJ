// frontend/src/pages/index.js

import Link from 'next/link';
import { useEffect, useState } from 'react';
import apiClient from '../utils/api';
import { FormattedMessage } from 'react-intl';

export default function Home() {
  const [importantPosts, setImportantPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetchImportantPosts();
    fetchUserPosts();
  }, []);

  const fetchImportantPosts = async () => {
    try {
      const res = await apiClient.get('/forum/posts', { params: { important: true } });
      setImportantPosts(res.data);
    } catch (error) {
      console.error('获取重要帖子失败', error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await apiClient.get('/forum/posts');
      setUserPosts(res.data);
    } catch (error) {
      console.error('获取用户帖子失败', error);
    }
  };

  return (
    <div className="container">
      <h1><FormattedMessage id="welcome" defaultMessage="Welcome to FOJ Online Judge" /></h1>
      <p><FormattedMessage id="home_description" defaultMessage="This is a comprehensive online judge platform supporting forums, problem sets, competitions, rating systems, training courses, friend chats, and an online compiler." /></p>

      <section>
        <h2><FormattedMessage id="important_announcements" defaultMessage="Important Announcements" /></h2>
        <ul>
          {importantPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/forum/${post.id}`}>
                <a>{post.title}</a>
              </Link>
              <span> by {post.author.nickname}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2><FormattedMessage id="latest_posts" defaultMessage="Latest Posts" /></h2>
        <ul>
          {userPosts.slice(0, 5).map((post) => (
            <li key={post.id}>
              <Link href={`/forum/${post.id}`}>
                <a>{post.title}</a>
              </Link>
              <span> by {post.author.nickname}</span>
            </li>
          ))}
        </ul>
        <Link href="/forum">
          <a><FormattedMessage id="view_more_posts" defaultMessage="View More Posts" /></a>
        </Link>
      </section>

      <section>
        <h2><FormattedMessage id="quick_navigation" defaultMessage="Quick Navigation" /></h2>
        <ul>
          <li>
            <Link href="/login">
              <a><FormattedMessage id="login" defaultMessage="Login" /></a>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <a><FormattedMessage id="register" defaultMessage="Register" /></a>
            </Link>
          </li>
          <li>
            <Link href="/problems">
              <a><FormattedMessage id="problems" defaultMessage="Problems" /></a>
            </Link>
          </li>
          <li>
            <Link href="/competitions">
              <a><FormattedMessage id="competitions" defaultMessage="Competitions" /></a>
            </Link>
          </li>
          <li>
            <Link href="/leaderboard">
              <a><FormattedMessage id="leaderboard" defaultMessage="Leaderboard" /></a>
            </Link>
          </li>
          <li>
            <Link href="/training">
              <a><FormattedMessage id="training" defaultMessage="Training" /></a>
            </Link>
          </li>
          <li>
            <Link href="/compiler">
              <a><FormattedMessage id="compiler" defaultMessage="Compiler" /></a>
            </Link>
          </li>
          <li>
            <Link href="/friends">
              <a><FormattedMessage id="friends" defaultMessage="Friends" /></a>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

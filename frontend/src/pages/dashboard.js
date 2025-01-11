// frontend/src/pages/dashboard.js

import { useEffect, useState } from 'react';
import apiClient from '../utils/api';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchCompetitions();
    fetchCourses();
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await apiClient.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error('获取用户信息失败', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await apiClient.get('/forum/posts');
      setPosts(res.data);
    } catch (error) {
      console.error('获取帖子失败', error);
    }
  };

  const fetchCompetitions = async () => {
    try {
      const res = await apiClient.get('/competition');
      setCompetitions(res.data);
    } catch (error) {
      console.error('获取比赛失败', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await apiClient.get('/training');
      setCourses(res.data);
    } catch (error) {
      console.error('获取课程失败', error);
    }
  };

  if (!user) return <div><FormattedMessage id="loading" defaultMessage="Loading..." /></div>;

  return (
    <div className="container">
      <h2><FormattedMessage id="welcome_user" defaultMessage="Welcome, {nickname}!" values={{ nickname: user.nickname }} /></h2>

      <section>
        <h3><FormattedMessage id="latest_posts" defaultMessage="Latest Posts" /></h3>
        <ul>
          {posts.slice(0, 5).map((post) => (
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
        <h3><FormattedMessage id="latest_competitions" defaultMessage="Latest Competitions" /></h3>
        <ul>
          {competitions.slice(0, 5).map((competition) => (
            <li key={competition.id}>
              <Link href={`/competitions/${competition.id}`}>
                <a>{competition.name}</a>
              </Link>
              <span> - {competition.type} <FormattedMessage id="competition_format" defaultMessage="format" /></span>
            </li>
          ))}
        </ul>
        <Link href="/competitions">
          <a><FormattedMessage id="view_more_competitions" defaultMessage="View More Competitions" /></a>
        </Link>
      </section>

      <section>
        <h3><FormattedMessage id="training_courses" defaultMessage="Training Courses" /></h3>
        <ul>
          {courses.slice(0, 5).map((course) => (
            <li key={course.id}>
              <Link href={`/training/${course.id}`}>
                <a>{course.title}</a>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/training">
          <a><FormattedMessage id="view_more_courses" defaultMessage="View More Courses" /></a>
        </Link>
      </section>
    </div>
  );
}

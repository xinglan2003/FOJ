// frontend/src/pages/forum/[id].js

import { useEffect, useState } from 'react';
import apiClient from '../../utils/api';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await apiClient.get(`/forum/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error('获取帖子失败', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await apiClient.post(
        `/forum/posts/${id}/comments`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment('');
      fetchPost();
    } catch (error) {
      alert(error.response?.data?.message || <FormattedMessage id="comment_failed" defaultMessage="Comment Failed" />);
    }
  };

  if (!post) return <div><FormattedMessage id="loading" defaultMessage="Loading..." /></div>;

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><FormattedMessage id="author" defaultMessage="Author" />: {post.author.nickname}</p>
      <h3><FormattedMessage id="comments" defaultMessage="Comments" /></h3>
      <ul>
        {post.comments.map((c) => (
          <li key={c.id}>
            {c.content} - {c.author.nickname}
          </li>
        ))}
      </ul>
      <form onSubmit={handleComment}>
        <textarea
          placeholder="发表评论"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button type="submit"><FormattedMessage id="submit" defaultMessage="Submit" /></button>
      </form>
    </div>
  );
}

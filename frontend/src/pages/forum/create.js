// frontend/pages/forum/create.js
import { useState } from 'react';
import apiClient from '../../utils/api';
import { useRouter } from 'next/router';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await apiClient.post(
        '/forum/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('帖子创建成功');
      router.push('/forum');
    } catch (error) {
      alert(error.response?.data?.message || '创建失败');
    }
  };

  return (
    <div className="container">
      <h2>创建帖子</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">发布</button>
      </form>
    </div>
  );
}

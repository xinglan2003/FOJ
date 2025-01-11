// frontend/pages/friends.js
import { useEffect, useState } from 'react';
import apiClient from '../utils/api';

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [friendId, setFriendId] = useState('');

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await apiClient.get('/chat/friends', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(res.data);
    } catch (error) {
      console.error('获取好友失败', error);
    }
  };

  const handleAddFriend = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await apiClient.post(
        '/chat/add-friend',
        { friendId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('好友请求已发送。');
      setFriendId('');
      fetchFriends();
    } catch (error) {
      alert(error.response?.data?.message || '添加失败');
    }
  };

  return (
    <div className="container">
      <h2>好友列表</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.nickname}</li>
        ))}
      </ul>
      <h3>添加好友</h3>
      <form onSubmit={handleAddFriend}>
        <input
          type="text"
          placeholder="好友ID"
          value={friendId}
          onChange={(e) => setFriendId(e.target.value)}
          required
        />
        <button type="submit">添加</button>
      </form>
    </div>
  );
}

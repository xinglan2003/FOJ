// frontend/src/pages/register.js

import { useState } from 'react';
import apiClient from '../utils/api';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

export default function Register() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/auth/register', { email, nickname, password });
      alert(res.data.message); // 显示成功消息
      router.push('/login');
    } catch (error) {
      console.error('注册错误响应:', error.response);
      const message = error.response?.data?.message || '注册失败';
      setError(message); // 设置错误消息到状态
    }
  };

  return (
    <div className="container">
      <h2><FormattedMessage id="register" defaultMessage="Register" /></h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="邮箱"
          required
        />
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="昵称"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密码"
          required
        />
        <button type="submit"><FormattedMessage id="submit" defaultMessage="Submit" /></button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 显示错误消息 */}
    </div>
  );
}

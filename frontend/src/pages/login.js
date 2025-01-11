// frontend/src/pages/login.js

import { useState } from 'react';
import apiClient from '../utils/api';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      alert(res.data.message); // 显示成功消息
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (error) {
      console.error('登录错误响应:', error.response);
      const message = error.response?.data?.message || '登录失败';
      setError(message); // 设置错误消息到状态
    }
  };

  return (
    <div className="container">
      <h2><FormattedMessage id="login" defaultMessage="Login" /></h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="邮箱"
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

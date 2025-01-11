// frontend/src/pages/competitions/create.js

import { useState } from 'react';
import apiClient from '../../utils/api';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

export default function CreateCompetition() {
  const [name, setName] = useState('');
  const [type, setType] = useState('ACM');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const router = useRouter();

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await apiClient.post(
        '/competition',
        { name, type, startTime, endTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(<FormattedMessage id="competition_create_success" defaultMessage="Competition created successfully." />);
      router.push('/competitions');
    } catch (error) {
      alert(error.response?.data?.message || <FormattedMessage id="competition_create_failed" defaultMessage="Competition creation failed." />);
    }
  };

  return (
    <div className="container">
      <h2><FormattedMessage id="create_competition" defaultMessage="Create Competition" /></h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="比赛名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="ACM"><FormattedMessage id="acm" defaultMessage="ACM" /></option>
          <option value="OI"><FormattedMessage id="oi" defaultMessage="OI" /></option>
        </select>
        <input
          type="datetime-local"
          placeholder="开始时间"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="结束时间"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <button type="submit"><FormattedMessage id="create" defaultMessage="Create" /></button>
      </form>
    </div>
  );
}

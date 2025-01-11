// frontend/src/pages/leaderboard.js

import { useEffect, useState } from 'react';
import apiClient from '../utils/api';
import { FormattedMessage } from 'react-intl';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await apiClient.get('/rating/leaderboard');
      setLeaderboard(res.data);
    } catch (error) {
      console.error('获取排行榜失败', error);
    }
  };

  return (
    <div className="container">
      <h2><FormattedMessage id="leaderboard" defaultMessage="Leaderboard" /></h2>
      <table>
        <thead>
          <tr>
            <th><FormattedMessage id="rank" defaultMessage="Rank" /></th>
            <th><FormattedMessage id="nickname" defaultMessage="Nickname" /></th>
            <th><FormattedMessage id="elo_score" defaultMessage="Elo Score" /></th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry.id}>
              <td>{index + 1}</td>
              <td>{entry.user.nickname}</td>
              <td>{entry.elo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

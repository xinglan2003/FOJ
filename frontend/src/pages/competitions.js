// frontend/src/pages/competitions.js

import { useEffect, useState } from 'react';
import apiClient from '../utils/api';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

export default function Competitions() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const res = await apiClient.get('/competition');
      setCompetitions(res.data);
    } catch (error) {
      console.error('获取比赛失败', error);
    }
  };

  return (
    <div className="container">
      <h2><FormattedMessage id="competitions" defaultMessage="Competitions" /></h2>
      <Link href="/competitions/create"><a><FormattedMessage id="create_competition" defaultMessage="Create Competition" /></a></Link>
      <ul>
        {competitions.map((competition) => (
          <li key={competition.id}>
            <Link href={`/competitions/${competition.id}`}>
              <a>{competition.name}</a>
            </Link> - {competition.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

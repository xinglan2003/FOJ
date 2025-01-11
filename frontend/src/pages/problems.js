// frontend/src/pages/problems.js

import { useEffect, useState } from 'react';
import apiClient from '../utils/api';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await apiClient.get('/problem');
      setProblems(res.data);
    } catch (error) {
      console.error('获取题目失败', error);
    }
  };

  return (
    <div className="container">
      <h2><FormattedMessage id="problems" defaultMessage="Problems" /></h2>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <Link href={`/problems/${problem.id}`}><a>{problem.title}</a></Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

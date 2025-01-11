// frontend/pages/problems/[id].js
import { useEffect, useState } from 'react';
import apiClient from '../../utils/api';
import { useRouter } from 'next/router';

export default function ProblemDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProblem();
    }
  }, [id]);

  const fetchProblem = async () => {
    try {
      const res = await apiClient.get(`/problem/${id}`);
      setProblem(res.data);
    } catch (error) {
      console.error('获取题目失败', error);
    }
  };

  if (!problem) return <div>加载中...</div>;

  return (
    <div className="container">
      <h2>{problem.title}</h2>
      <p>{problem.description}</p>
      <p>时间限制: {problem.timeLimit} ms</p>
      <p>空间限制: {problem.memoryLimit} MB</p>
      <h3>样例</h3>
      {problem.samples.map((sample, index) => (
        <div key={index}>
          <p><strong>输入:</strong></p>
          <pre>{sample.input}</pre>
          <p><strong>输出:</strong></p>
          <pre>{sample.output}</pre>
        </div>
      ))}
    </div>
  );
}

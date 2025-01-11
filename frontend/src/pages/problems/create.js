// frontend/src/pages/problems/create.js

import { useState } from 'react';
import apiClient from '../../utils/api';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

export default function CreateProblem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(1000);
  const [memoryLimit, setMemoryLimit] = useState(256);
  const [tags, setTags] = useState('');
  const [samples, setSamples] = useState([{ input: '', output: '' }]);
  const router = useRouter();

  const handleSampleChange = (index, field, value) => {
    const newSamples = [...samples];
    newSamples[index][field] = value;
    setSamples(newSamples);
  };

  const addSample = () => {
    setSamples([...samples, { input: '', output: '' }]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const tagList = tags.split(',').map(tag => tag.trim());

    try {
      await apiClient.post(
        '/problem',
        { title, description, timeLimit, memoryLimit, tags: tagList, samples },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(<FormattedMessage id="problem_create_success" defaultMessage="Problem created successfully." />);
      router.push('/problems');
    } catch (error) {
      alert(error.response?.data?.message || <FormattedMessage id="problem_create_failed" defaultMessage="Problem creation failed." />);
    }
  };

  return (
    <div className="container">
      <h2><FormattedMessage id="create_problem" defaultMessage="Create Problem" /></h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="题面描述"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          placeholder="时间限制 (ms)"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="空间限制 (MB)"
          value={memoryLimit}
          onChange={(e) => setMemoryLimit(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="标签（用逗号分隔）"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <h3><FormattedMessage id="samples" defaultMessage="Samples" /></h3>
        {samples.map((sample, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="输入"
              value={sample.input}
              onChange={(e) => handleSampleChange(index, 'input', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="输出"
              value={sample.output}
              onChange={(e) => handleSampleChange(index, 'output', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addSample}><FormattedMessage id="add_sample" defaultMessage="Add Sample" /></button>
        <button type="submit"><FormattedMessage id="create" defaultMessage="Create" /></button>
      </form>
    </div>
  );
}

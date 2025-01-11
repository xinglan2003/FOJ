// frontend/src/pages/compiler.js

import { useState } from 'react';
import apiClient from '../utils/api';
import dynamic from 'next/dynamic';
import { FormattedMessage } from 'react-intl';

const MonacoEditor = dynamic(import('@monaco-editor/react'), { ssr: false });

export default function Compiler() {
  const [code, setCode] = useState('// 在这里编写代码');
  const [language, setLanguage] = useState('cpp');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await apiClient.post(
        '/compiler/submit',
        { problemId: 1, code, language }, // 这里的 problemId 需要根据实际情况传递
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(<FormattedMessage id="status" defaultMessage="Status" /> + `: ${res.data.status}\n` + <FormattedMessage id="details" defaultMessage="Details" /> + `: ${res.data.details}`);
    } catch (error) {
      setResult(error.response?.data?.message || <FormattedMessage id="submit_failed" defaultMessage="Submit Failed" />);
    }
  };

  return (
    <div className="container">
      <h2><FormattedMessage id="online_compiler" defaultMessage="Online Compiler" /></h2>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="cpp"><FormattedMessage id="cpp" defaultMessage="C++" /></option>
        <option value="python"><FormattedMessage id="python" defaultMessage="Python" /></option>
      </select>
      <MonacoEditor
        height="400px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />
      <button onClick={handleSubmit}><FormattedMessage id="submit" defaultMessage="Submit" /></button>
      <pre>{result}</pre>
    </div>
  );
}

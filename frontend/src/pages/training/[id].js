// frontend/src/pages/training/[id].js

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import { FormattedMessage } from 'react-intl';

let socket;

export default function TrainingRoom() {
  const router = useRouter();
  const { id } = router.query;
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // 'http://backend:5000'
    socket = io(backendUrl);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;

        // 发送信令数据
        socket.emit('join-room', id);

        // 处理远程视频流
        socket.on('user-connected', (userId) => {
          // 使用 WebRTC 建立连接
        });
      })
      .catch((err) => console.error('获取媒体失败:', err));

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const toggleMicrophone = () => {
    const stream = localVideoRef.current.srcObject;
    const audioTrack = stream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
  };

  const toggleCamera = () => {
    const stream = localVideoRef.current.srcObject;
    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
  };

  return (
    <div className="container">
      <h2><FormattedMessage id="classroom" defaultMessage="Classroom {id}" values={{ id }} /></h2>
      <div>
        <video ref={localVideoRef} autoPlay muted></video>
        <video ref={remoteVideoRef} autoPlay></video>
      </div>
      <button onClick={toggleMicrophone}><FormattedMessage id="toggle_microphone" defaultMessage="Toggle Microphone" /></button>
      <button onClick={toggleCamera}><FormattedMessage id="toggle_camera" defaultMessage="Toggle Camera" /></button>
    </div>
  );
}

// backend/utils/dockerCompiler.js
const Docker = require('dockerode');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const docker = new Docker({ socketPath: process.env.DOCKER_SOCKET });

const compileAndRun = async (code, language) => {
  const id = uuidv4();
  const workDir = `/tmp/${id}`;
  fs.mkdirSync(workDir);

  let fileName, compileCmd, runCmd;

  if (language === 'cpp') {
    fileName = 'main.cpp';
    compileCmd = ['g++', 'main.cpp', '-o', 'main'];
    runCmd = ['./main'];
  } else if (language === 'python') {
    fileName = 'main.py';
    compileCmd = null; // Python 不需要编译
    runCmd = ['python3', 'main.py'];
  } else {
    return { error: 'Unsupported language.' };
  }

  fs.writeFileSync(path.join(workDir, fileName), code);

  try {
    // 编译步骤（如果需要）
    if (compileCmd) {
      const compileResult = await runCommandInDocker(workDir, 'gcc:latest', compileCmd, 5);
      if (compileResult.stderr) {
        return { error: compileResult.stderr };
      }
    }

    // 运行步骤
    const runResult = await runCommandInDocker(workDir, 'gcc:latest', runCmd, 10);
    return { stdout: runResult.stdout, stderr: runResult.stderr };
  } catch (error) {
    return { error: error.message };
  } finally {
    // 清理
    fs.rmSync(workDir, { recursive: true, force: true });
  }
};

const runCommandInDocker = (workDir, image, cmd, timeout) => {
  return new Promise((resolve, reject) => {
    docker.pull(image, (err, stream) => {
      if (err) return reject(err);
      docker.modem.followProgress(stream, onFinished, onProgress);

      function onFinished(err, output) {
        if (err) return reject(err);
        const container = new Docker.Container({ Image: image, Cmd: cmd, HostConfig: { Binds: [`${workDir}:/usr/src/app`], AutoRemove: true, Memory: 256 * 1024 * 1024, NetworkMode: 'none' } });
        container.create((err, container) => {
          if (err) return reject(err);
          container.start((err, data) => {
            if (err) return reject(err);
            container.wait((err, data) => {
              if (err) return reject(err);
              container.logs({ stdout: true, stderr: true }, (err, stream) => {
                if (err) return reject(err);
                let output = '';
                stream.on('data', (chunk) => {
                  output += chunk.toString();
                });
                stream.on('end', () => {
                  resolve({ stdout: output, stderr: '' });
                });
              });
            });
          });
        });
      }

      function onProgress(event) {
        // 可以添加进度条等
      }
    });
  });
};

module.exports = { compileAndRun };

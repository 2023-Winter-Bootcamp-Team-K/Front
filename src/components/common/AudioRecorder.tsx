import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MicGIF from '../gif/Mic';
import { useChatStore } from '../../stores/chat';

type AudioRecorderProps = {
  isShowChar: () => void;
};

// 이게 나가는건데
export default function AudioRecorder({ isShowChar }: AudioRecorderProps) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  //zustand 상태관리
  const { RecordToggle, setRecordToggle, setAudio, setSendAudio } =
    useChatStore();

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    setRecordToggle(false); // true이면 녹음 시작 false면 중지
    toggleRecording();
  };

  useEffect(() => {
    toggleRecording();
    console.log('ToggleRecording useEffect: ', RecordToggle);
  }, [RecordToggle]);

  // 녹화 토글
  const toggleRecording = async () => {
    const newMediaRecorder = mediaRecorder;

    if (RecordToggle === true) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(newMediaRecorder);
      newMediaRecorder.start();
      console.log('녹음 시작 위에 있는 토글 값', RecordToggle);

      console.log('녹음 시작');

      //
    } else if (RecordToggle === false) {
      if (newMediaRecorder) {
        newMediaRecorder.stop();
        console.log('녹음 종료');
      }
    }
    //blob처리
    let audioChunks: Blob[] = [];

    if (newMediaRecorder) {
      //blob에 추가
      newMediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });
      //stop 입력이 오면
      newMediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks);
        // test codes
        // console.log('audio recording success:', audioBlob);
        // const audioUrl = URL.createObjectURL(audioBlob);
        // const audio = new Audio(audioUrl);
        // audio.play();
        //
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          const base64Audio = fileReader.result as string;
          const resultAudio = base64Audio.split(',')[1];

          // console.log('오디오 설정', resultAudio);
          setAudio(resultAudio);
          setSendAudio(true);
        };
        fileReader.readAsDataURL(audioBlob);
      });
    }
  };

  return (
    <MicButtonLayout onClick={handleButtonClick}>
      {RecordToggle ? (
        <MicGIF />
      ) : (
        <Mic src="/src/assets/img/BlackMic.png" />
      )}
    </MicButtonLayout>
  );
}

const MicButtonLayout = styled.button`
  all: unset;
  margin-bottom: 1.19rem;
  @media all and (max-width: 390px) {
    margin-bottom: 1.5rem;
    margin-top: 1.68rem;
  }
  cursor: pointer;
  &:active {
    opacity: 0.3;
  }
`;

const Mic = styled.img`
  all: unset;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  width: 40px;
  height: 40px;
`;

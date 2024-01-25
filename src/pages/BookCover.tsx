import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getDiary } from '../api/diary';
import { useQuery } from 'react-query';

export default function BookCover() {
  const [isOpen, setIsOpen] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [captureImage, setCaptureImage] = useState('');
  const navigate = useNavigate();
  const selectedDiaryId = window.localStorage.getItem('selectedDiaryId');
  const selectedChatRoomId = window.localStorage.getItem('selectedChatRoomId');

  const { data: diaryData } = useQuery(
    ['selectedDiaryId', selectedDiaryId],
    () => getDiary(selectedDiaryId || '')
  );
  const diaryContent = diaryData;

  const fetchCaptureImage = async () => {
    if (selectedChatRoomId) {
      try {
        const response = await fetch(`/apps/chat_list/${selectedChatRoomId}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        // 응답 내용을 텍스트로 출력
        const responseText = await response.text();
        console.log("Response text:", responseText);
  
        // JSON으로 파싱을 시도합니다.
        try {
          const data = JSON.parse(responseText);
          setCaptureImage(data.captureURL);
        } catch (jsonError) {
          console.error("JSON 파싱 오류", jsonError);
          // 응답이 JSON 형식이 아닐 경우 처리
        }
      } catch (error) {
        console.error('캡처 이미지 가져오기 오류', error);
      }
    }
  };
  
  
  useEffect(() => {
    openBook();
    fetchCaptureImage();
  }, []);

  const openBook = () => {
    setIsOpen(true);
    setTimeout(() => {
      setShowRight(true);
    }, 1200);
    setTimeout(() => {
      navigate('/diary');
    }, 1400);
  };

  return (
    <>
      <BackGround>
        <Cover className={isOpen ? 'open' : ''}>
          <CoverInner>
            <Front>
              <Year>{2024}</Year>
              <Title>{diaryContent?.username} 다이어리</Title>
              <img src={captureImage} alt="Capture" />
              <button onClick={openBook}>함께 보러가기 </button>
            </Front>
            {showRight && <Back></Back>}
          </CoverInner>
        </Cover>
        {showRight && (
          <Right>
            <CenterLine></CenterLine>
          </Right>
        )}
      </BackGround>
    </>
  );
}


const openAnimation = keyframes`
  0%, 10% {
    transform: translateX(0) rotateY(0);
  }
  20% {
    transform: translateX(10%) rotateY(0);
  }
  30% {
    transform: translateX(20%) rotateY(0);
  }
  40% {
    transform: translateX(30%) rotateY(0);
  }
  50% {
    transform: translateX(40%) rotateY(0);
  }
  60% {
    transform: translateX(50%) rotateY(0);
  }
  70% {
    transform: translateX(50%) rotateY(-90deg);
  }
  80% {
    transform: translateX(50%) rotateY(-135deg);
  }
  90% {
    transform: translateX(50%) rotateY(-170deg);
  }
  100% {
    transform: translateX(50%) rotateY(-180deg);
  }
`;

const BackGround = styled.div`
  background-image: url('src/assets/img/Chat_bg.png');
  margin: auto;
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 50%;

  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Cover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 36.875rem;
  height: 53.125rem;
  border-radius: 0.75rem;
  transform-origin: left center;
  transition: transform 1.3s ease-in;
  transform-style: preserve-3d;

  &.open {
    animation: ${openAnimation} 1.5s ease-in-out forwards;
  }

  @media (max-width: 390px) {
    display: none;
  }

  img {
    width: 25rem;
    height: 20.625rem;
    border-radius: 1.875rem;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  button {
    all: unset;
    width: 13.5rem;
    height: 2.625rem;
    border-radius: 0.75rem;
    font-family: 'Cafe24Dongdong';
    text-align: center;
    background: #ff939c;
    margin-top: 10rem;
    transition: box-shadow 0.3s ease-in-out;
    box-shadow: 4px 4px 4px 0px rgba(78, 78, 78, 0.25);

    &:hover {
      box-shadow: 4px 4px 4px 2px rgba(0, 0, 0, 0.25);
    }
  }
`;

const CoverInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  border-radius: 0.75rem;
`;

const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.75rem;
  background-image: url('src/assets/img/Cover.png');
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: white;
  transform: rotateY(180deg);
  border-radius: 0.75rem;
  background-image: url(/src/assets/img/diaryRightSide.png);
  position: relative;
`;

const Year = styled.p`
  text-align: center;
  font-family: 'Cafe24Dongdong';
  font-size: 2rem;
  font-weight: 400;
  margin-top: 5.81rem;
`;

const Title = styled.p`
  text-align: center;
  font-family: 'Cafe24Dongdong';
  font-weight: 400;
  font-size: 2.5rem;
  margin-bottom: 2.31rem;
`;

const Right = styled.div`
  border-radius: 0.75rem;
  background: #ffc6cb;
  background-image: url(/src/assets/img/diaryRightSide.png);
  position: absolute;
  width: 36.875rem;
  height: 53.125rem;
  left: 1273px;

  @media (max-width: 1536px) {
    width: 36.875rem;
    height: 53.125rem;
    left: 1273px;
  }
  @media (max-width: 1440px) {
    width: 36.875rem;
    height: 53.125rem;
    left: 719px;
  }
  @media (max-width: 390px) {
    display: none;
  }
`;

const CenterLine = styled.div`
  width: 0.8125rem;
  height: 50.125rem;
  border-radius: 2.40625rem;
  background: rgba(185, 185, 185, 0.68);
  box-shadow: 1px 8px 22.1px 10px rgba(128, 128, 128, 0.25);
  z-index: 4;
  position: relative;
  left: -7px;
  top: 18px;
`;

import styled from 'styled-components';
import MyMessage from './MyMessage';
import OpponentMessage from './OpponentMessage';
import { useEffect, useState } from 'react';
import AudioRecorder from './AudioRecorder';
import { useRef } from 'react';

type ChatBoxProps = {
  sendChatArray: any[];
};

export default function ChatBox({ sendChatArray }: ChatBoxProps) {
  const [messages, setMessages] = useState<
    { character?: string; message?: string }[]
  >([]);
  const messageLayOutRef = useRef<HTMLDivElement | null>(null);

  // console.log('왜 목소리 나오고 나옴? 왜 시작할 때는 잘 나왔잖아', messages);

  //스크롤부분
  useEffect(() => {
    const messageLayOutElement = messageLayOutRef.current;
    if (messageLayOutElement) {
      messageLayOutElement.scrollTop = messageLayOutElement.scrollHeight;
    }
  });

  useEffect(() => {
    if (sendChatArray !== messages) {
      setMessages(sendChatArray);
    }
  }, [sendChatArray, messages]);

  return (
    <ChatLayout>
      <ChatBoxLayout ref={messageLayOutRef}>
        {messages.map((message, index) => {
          if (message.character === 'quokka') {
            return (
              <OpponentMessage key={index} chatMessage={message.message} />
            );
          }
          if (message.character === 'child') {
            return <MyMessage key={index} chatMessage={message.message} />;
          }
          return null;
        })}
      </ChatBoxLayout>
      <TextBox>말을 다하면 나를 눌러줘</TextBox>
      <AudioRecorder />
    </ChatLayout>
  );
}

const ChatLayout = styled.div`
  border-radius: 1.75rem;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media all and (min-width: 391px) {
    width: 31.25rem;
    height: 43.75rem;
    box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.13);
  }
  @media all and (max-width: 390px) {
    width: 22rem;
    height: 34rem;
    background: transparent;
    box-shadow: none;
  }
`;

const ChatBoxLayout = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  background: rgba(255, 255, 255, 0.82);
  flex-direction: column;

  @media all and (min-width: 391px) {
    width: 31.25rem;
    margin-top: 2.19rem;
    border-radius: 1.75rem;
  }
  @media all and (max-width: 390px) {
    width: 22rem;
    background: transparent;
  }
`;

const TextBox = styled.div`
  color: #000;
  text-align: center;
  font-family: 'Cafe24Dongdong';
  font-weight: 400;

  @media all and (min-width: 391px) {
    font-size: 1.5rem;
  }
  @media all and (max-width: 390px) {
    margin-bottom: 0.68rem;
    font-size: 1rem;
  }
`;

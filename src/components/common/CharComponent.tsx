import { styled, keyframes } from 'styled-components';
import Voice from '../gif/Voice';
import { VoiceSvg } from '../../assets/SVG';
import { useChatStore } from '../../stores/chat';

export default function CharComponent() {
  const { RecordToggle, plzWait } = useChatStore();
  // console.log(RecordToggle, 'RecordToggle');

  return (
    <Layout>
      {RecordToggle ? (
        <>
          <SpeakingQuakka src="src/assets/img/SpeakingQuakka.png" />
          <Blank />
        </>
      ) : (
        <SpeakingQuakkaAnimate src="src/assets/img/SpeakingQuakka.png" />
      )}
      {plzWait ? <PlzWait>잠시만 기다려줘</PlzWait> : <Blank />}
      {RecordToggle ? (
        <>
          <VoiceSvg />
          <div style={{ height: '3.75rem' }} />
        </>
      ) : (
        <>
          <Voice />
        </>
      )}
    </Layout>
  );
}

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Blank = styled.div`
  all: unset;
  height: 2.25rem;
`;

const PlzWait = styled.div`
  margin-top: 1rem;
  font-size: 1.25rem;
  text-align: center;
  font-family: 'Cafe24Dongdong';
  font-weight: bold;
`;

const SpeakingQuakkaAnimate = styled.img`
  animation: ${bounce} 2s ease-in-out infinite;

  /* margin-top: 5rem; */

  @media all and (max-width: 390px) {
    width: 18.60675rem;
    margin-top: 5rem;
    /* margin-top: 5.41rem; */
  }
  @media all and (min-width: 391px) {
    width: 30rem;
    margin-top: 2rem;
  }
`;

const SpeakingQuakka = styled.img`
  /* margin-top: 5rem; */

  @media all and (max-width: 390px) {
    width: 18.60675rem;
    margin-top: 5rem;
  }
  @media all and (min-width: 391px) {
    width: 30rem;
    margin-top: 1.5rem;
  }
`;

const Layout = styled.div`
  border-radius: 1.75rem;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  flex-direction: column;
  box-shadow: 0px 14px 24px rgba(0, 0, 0, 0.13);

  @media all and (max-width: 390px) {
    width: 21.4375rem;
    height: 32.625rem;
    box-shadow: none;
  }
  @media all and (min-width: 391px) {
    width: 30rem;
    height: 43.75rem;
    box-shadow: none;
  }
`;

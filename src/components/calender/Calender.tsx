import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarContainer,
  HeaderContainer,
  HeaderYear,
  HeaderDate,
  WeekWrap,
  DaysWrap,
  DaysCol,
  ArrowBackIcon,
  ArrowForwardIcon,
  DateContainer,
  DayName,
} from './CalenderStyle';

type MoodType = 'joy' | 'sad' | 'angry';
type MoodToImageUrlType = { [key in string]: string };

const moodToImageUrl: MoodToImageUrlType = {
  joy: 'https://ifh.cc/g/13Ktbk.png',
  sad: 'https://ifh.cc/g/pscoAZ.png',
  angry: 'https://ifh.cc/g/alvMNR.png',
};
type calenderType = {
  created_at: string;
  diaryId: number;
  imageURL?: string;
  mood: MoodType;
  chat_room_id:number;
};
type CalenderProps = {
  data: calenderType[];
};
const Calender = ({ data }: CalenderProps) => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [sampleFeelings, setSampleFeelings] = useState<{
    [key: string]: FeelingType[];
  }>({});

  type FeelingType = {
    diaryId: number;
    mood: string;
    imageUrl?: string;
    created_at?: string | undefined;
    roomId?: number;
  };

  const handleDayClick = (dateKey: string) => {
    const feelings = sampleFeelings[dateKey];
    console.log(feelings)
  
    if (feelings && feelings.length > 0) {
      const diaryId = feelings[0].diaryId.toString();
      const chatRoomId = feelings[0].roomId.toString();
      localStorage.setItem('selectedDiaryId', diaryId);
      localStorage.setItem('selectedChatRoomId', chatRoomId); 
      navigate('/bookcover');
    } else {
      alert('해당 날짜에는 다이어리가 존재하지 않습니다.');
    }
  };
  console.log(data)
  useEffect(() => {
    if (data) {
      const feelingsData = data.reduce<{ [key: string]: FeelingType[] }>(
        (acc, item) => {
          const date = item.created_at;

          if (date) {
            acc[date] = acc[date] || [];
            acc[date].push({
              diaryId: item.diaryId,
              mood: moodToImageUrl[item.mood],
              imageUrl: item.imageURL,
              created_at: item.created_at,
              roomId: item.chat_room_id,  
            });
          }
          return acc;
        },
        {}
      );

      setSampleFeelings(feelingsData);
    }
  }, [data]);
  // console.log(sampleFeelings[dateKey]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const changeMonth = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day, index) => <DayName key={index}>{day}</DayName>);
  };

  const renderDays = () => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();

    const prevMonthLastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    const prevMonthDays = Array.from(
      { length: firstDayOfMonth },
      (_, index) => {
        const day = prevMonthLastDay - firstDayOfMonth + index + 1;
        return (
          <DaysCol key={`prev-${day}`} className="not-current">
            {day}
          </DaysCol>
        );
      }
    );

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      const dateKey = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day + 1
      )
        .toISOString()
        .split('T')[0];

      return (
        <DaysCol
          key={`current-${day}`}
          className="current"
          style={{
            position: 'relative',
            overflow: 'hidden',
          }}
          onClick={() => handleDayClick(dateKey)}
        >
          {sampleFeelings[dateKey] && (
            <img
              src={sampleFeelings[dateKey][0].mood}
              alt="Mood"
              style={{
                width: '130%', // 이미지 크기 조절
                height: 'auto', // 높이 자동 조절
                position: 'absolute',
                top: '5px',
                left: '50%',
                transform: 'translateX(-50%)', // 이미지를 수평 중앙 위치
              }}
            />
          )}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
              width: '100%',
              textAlign: 'center',
            }}
          >
            {day}
          </div>
        </DaysCol>
      );
    });

    const totalDays = firstDayOfMonth + daysInMonth;
    const numberOfRows = Math.ceil(totalDays / 7);
    const nextMonthDaysLength = numberOfRows * 7 - totalDays;
    const nextMonthDays = Array.from(
      { length: nextMonthDaysLength },
      (_, index) => {
        return (
          <DaysCol key={`next-${index}`} className="not-current">
            {index + 1}
          </DaysCol>
        );
      }
    );

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const days = renderDays();
  const numberOfRows = Math.ceil(days.length / 7);

  return (
    <CalendarContainer>
      <HeaderContainer>
        <ArrowBackIcon onClick={() => changeMonth(-1)} />
        <DateContainer>
          <HeaderYear>{currentDate.getFullYear()}</HeaderYear>
          <HeaderDate>
            <p>{currentDate.toLocaleString('default', { month: 'long' })}</p>
          </HeaderDate>
        </DateContainer>
        <ArrowForwardIcon onClick={() => changeMonth(1)} />
      </HeaderContainer>
      <WeekWrap>{renderDaysOfWeek()}</WeekWrap>
      <DaysWrap rows={numberOfRows}>{days}</DaysWrap>
    </CalendarContainer>
  );
};

export default Calender;

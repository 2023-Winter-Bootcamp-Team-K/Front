import { baseInstance } from './config';
import { getCookie } from '../utils/cookie';

export const getDiary = async (Id: string) => {
  const token = getCookie('token');
  try {
    const response = await baseInstance.get(`/diary/${Id}/`, {
      headers: {
        Authorization: `${token}`, 
      },
    });
    if (response.status === 200) {
      console.log("일기 조회 성공");
      return response.data; 
    } else {
      console.log("일기 조회 실패", response.status);
      return null;
    }
  } catch (error) {
    console.log("에러 발생", error);
    return null;
  }
};

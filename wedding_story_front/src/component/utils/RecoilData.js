import { atom, selector } from "recoil";

//atom : 데이터를 저장 할 수 있음 -> 사용 시 useRecoilState()=> state타입 리턴
//selector : 존재하는 데이터를 이용해서 함수에서 데이터를 편집하여 리턴할 수 있음
//              ->사용 시 useRecoilValue() => 함수에서 리턴하는 데이터 타입

//외부에서 데이터를 저장하거나 또는 사용하고싶은경우 atom
//외부에서 특정 데이터를 통한 특정 연산결과를 도출하고싶으면 selector

//로그인한 아이디를 저장하는 저장소
const loginNoState = atom({
  key: "loginNoState",
  default: 0,
});
const loginIdState = atom({
  key: "loginIdState",
  default: "",
});
//로그인한 회원 타입을 저장하는 저장소
const memberTypeState = atom({
  key: "memberTypeState",
  default: -1,
});
//로그인한 회원 코드을 저장하는 저장소
const memberCodeState = atom({
  key: "memberCodeState",
  default: "",
});
//로그인한 업체 코드을 저장하는 저장소
const companyNoState = atom({
  key: "companyNoState",
  default: "",
});
//atom으로 생성한 데이터로 처리하는 함수
const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    //매개변수 state는 recoil 저장된 데이터를 불러오기 위한 객체
    const loginNo = state.get(loginNoState);
    //미리 만들어진 LoginIdState의 값 가져옴
    const loginId = state.get(loginIdState);
    //미리 만들어진 memberTypeState의 값 가져옴
    const memberType = state.get(memberTypeState);
    //미리 만들어진 LoginIdState의 값 가져옴
    const memberCode = state.get(memberCodeState);
    //미리 만들어진 memberTypeState의 값 가져옴
    const companyNo = state.get(companyNoState);

    //로그인 여부 -> LoginIdState가 빈문자열 ("")이 아니고, memberTypeState값이 -1이 아닌 경우
    //업체는 회원코드가 없고 회원은 업체코드가 없으므로 해당 조건은 생략
    return loginId !== "" && memberType !== -1;
  },
});

export {
  loginNoState,
  loginIdState,
  memberTypeState,
  memberCodeState,
  companyNoState,
  isLoginState,
};

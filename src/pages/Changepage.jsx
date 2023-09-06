import { Helmet } from 'react-helmet-async';
import Button from '@/components/Button';
import Nav from '@/components/Nav';

function Changepage() {
  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <div className="max-w-[600px] min-w-[320px] bg-ec4 text-ec1 flex flex-col justify-around items-center h-screen m-auto">
        <div>
          <p className="p-3">아이디| 12조 최고 ~ </p>
          <p className="p-3">비밀번호| ********</p>
          <p className="p-3">닉네임| </p>
        </div>
        <Button>저장</Button>
      </div>
      <Nav></Nav>

    </>
  );
}

export default Changepage;
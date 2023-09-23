import { string } from 'prop-types';
import { Link } from 'react-router-dom';

MyPageData.propTypes = {
    records: string,
    community: string,
    comment: string,
};

function MyPageData({ records, community, comment }) {
    return (
        <ul className="w-80 s:px-12 rounded-lg border-2 p-12 text-xl space-y-4 mt-8 text-center">
            <li aria-label={'내가 작성한 기록 '} tabIndex="0">
                내가 작성한 기록 :
                <Link
                    to="/myrecord"
                    className="hover:dark:text-dark-ec5 hover:font-bold"
                >
                    {records} 개
                </Link>
            </li>
            <li aria-label={'내가 작성한 글 '} tabIndex="0">
                내가 작성한 글 :
                <Link
                    to="/mycommunity"
                    className="hover:dark:text-dark-ec5 hover:font-bold"
                >
                    {community} 개
                </Link>
            </li>
            <li aria-label={'내가 작성한 댓글 '} tabIndex="0">
                내가 작성한 댓글 :
                <Link
                    to="/mycomment"
                    className="hover:dark:text-dark-ec5 hover:font-bold"
                >
                    {comment} 개
                </Link>
            </li>
            <li>
                <Link
                    to="/bookmark"
                    className="hover:dark:text-dark-ec5 hover:font-bold"
                >
                    <span aria-hidden="true">⭐</span> 즐겨찾기 바로가기
                </Link>
            </li>
        </ul>
    );
}

export default MyPageData;
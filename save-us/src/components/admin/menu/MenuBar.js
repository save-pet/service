import { React } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function MenuBar() {
  return (
    <div>
      <Menu>
        <h2>관리자 페이지</h2>
        <Content>
          <Link to="/admin">회원 정보 관리</Link>
        </Content>
        <Content>
          <Link to="/admin/lostPostList">분실 신고 리스트</Link>
        </Content>
        <Content>
          <Link to="/admin/seePostList">목격 신고 리스트</Link>
        </Content>
      </Menu>
    </div>
  );
}

const Menu = styled.menu`
  width: 20%;
  height: 300px;
  display: inline-block;
  flex-direction: column;
  align-items: left;
  margin: 0;
  padding: 10px;
`;

const Content = styled.div`
  margin: 0;
  padding: 10px;
  border: 1px solid #fafafa;
  &:hover {
    background-color: #fafafa;
    color: black;
    transition: 0.3s;
  }
`;

export default MenuBar;

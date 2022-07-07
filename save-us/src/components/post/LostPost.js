import React, { useState } from 'react';
import PostImg from './LostPostImg';
import Modal from '../Modal';

export default function InputData() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <form>
      반려 동물 이름 <input name="반려 동물 이름" />
      품종 <input type="text" list="animalSpecies" />
      <datalist id="animalSpecies">
        <option value="믹스견">믹스견</option>
        <option value="푸들">푸들</option>
        <option value="비숑">비숑</option>
      </datalist>
      <br />
      실종 날짜 <input type="date" />
      실종 장소
      <button
        type="button"
        className="openMapModalBtn"
        onClick={() => setOpenModal(true)}
      >
        지도 열기
      </button>
      {openModal && <Modal closeModal={setOpenModal} />}
      <br />
      나이 <input type="text" />
      색깔 <input type="text" />
      <br />
      성별
      <label htmlFor="sex">
        <input type="radio" name="성별" value="남자" />
        남자
      </label>
      <label htmlFor="sex">
        <input type="radio" name="성별" value="여자" />
        여자
      </label>
      <br />
      중성화 여부 <input type="checkbox" />
      <br />
      보호자 연락처1 <input type="tel" /> <br />
      보호자 연락처2 <input type="tel" /> <br />
      특이 사항 <input type="text" /> <br />
      <PostImg />
    </form>
  );
}

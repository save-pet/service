import React, { useState } from 'react';
import PostImg from './LostPostImg';
import Modal from '../Modal';

export default function InputData() {
  const [openModal, setOpenModal] = useState(false);

  const [animalName, setAnimalName] = useState('');
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [lostDate, setLostDate] = useState('');
  const [animalAge, setAnimalAge] = useState(0);
  const [animalColor, setAnimalColor] = useState('');
  const [animalSex, setAnimalSex] = useState('');
  const [animalNeuter, setAnimalNeuter] = useState(false);

  const handleChangeAnimalName = ({ target: { value } }) =>
    setAnimalName(value);
  const handleAnimalSpecies = ({ target: { value } }) =>
    setAnimalSpecies(value);
  const handleLostDate = ({ target: { value } }) => setLostDate(value);
  const handleAnimalAge = ({ target: { value } }) => setAnimalAge(value);
  const handleAnimalColor = ({ target: { value } }) => setAnimalColor(value);
  const handleAnimalSex = ({ target: { value } }) => setAnimalSex(value);
  const handleAnimalNeuter = ({ target: { value } }) => setAnimalNeuter(value);

  return (
    <form>
      반려 동물 이름{' '}
      <input
        name="반려 동물 이름"
        value={animalName}
        onChange={handleChangeAnimalName}
      />
      품종{' '}
      <input
        type="text"
        list="animalSpecies"
        value={animalSpecies}
        onChange={handleAnimalSpecies}
      />
      <datalist id="animalSpecies">
        <option value="믹스견">믹스견</option>
        <option value="푸들">푸들</option>
        <option value="비숑">비숑</option>
      </datalist>
      <br />
      실종 날짜 <input type="date" value={lostDate} onChange={handleLostDate} />
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
      나이 <input type="number" value={animalAge} onChange={handleAnimalAge} />
      색깔{' '}
      <input type="text" value={animalColor} onChange={handleAnimalColor} />
      <br />
      성별
      <label htmlFor="sex" value={animalSex} onChange={handleAnimalSex}>
        <input type="radio" name="성별" value="남자" />
        남자
      </label>
      <label htmlFor="sex">
        <input type="radio" name="성별" value="여자" />
        여자
      </label>
      <br />
      중성화 여부{' '}
      <input
        type="checkbox"
        value={animalNeuter}
        onChange={handleAnimalNeuter}
      />
      <br />
      보호자 연락처1 <input type="tel" /> <br />
      보호자 연락처2 <input type="tel" /> <br />
      특이 사항 <input type="text" /> <br />
      <PostImg />
      <br />
      <button type="submit">등록하기</button>
    </form>
  );
}

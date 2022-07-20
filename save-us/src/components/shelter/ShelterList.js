import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RenderList from '../main/RenderList';

export default function ShelterList() {
  const [shelterList, setShelterList] = useState([]);
  const location = useLocation();
  const careCode = location.pathname.split('/')[2];

  async function getRescue() {
    useEffect(() => {
      const asyncGetRescue = async () => {
        const { data } = await axios(
          `${process.env.REACT_APP_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}/${process.env.REACT_APP_ROUTER_RESCUE}/care-code/${careCode}`,
        );
        setShelterList(data);
      };
      asyncGetRescue();
    }, []);
  }
  getRescue();

  return (
    <>
      {shelterList.length > 0 && <h2>{shelterList[0].careName}</h2>}
      <main
        style={{
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          gap: '20px',
          padding: '20px',
        }}
      >
        <RenderList list={shelterList} />
      </main>
    </>
  );
}

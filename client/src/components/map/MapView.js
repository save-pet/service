/* eslint-disable no-underscore-dangle */

import { React, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import axios from 'axios';
import { SpinningCircles } from 'react-loading-icons';
import Map2ListToggle from './Map2ListToggle';
import Aside from './Aside';
import getRescueDataByShelter from '../../api/getRescueDataByShelter';
import ShelterMarker from './ShelterMarker';

function MapView() {
  const [shelterList, setShelterList] = useState([]);
  const [rescueList, setRescueList] = useState([]);
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getShelterData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios({
        url: `${process.env.REACT_APP_SERVER_DOMAIN}/api/shelter`,
        method: 'GET',
      });
      return data;
    } catch (error) {
      return error.response.data.reason;
    } finally {
      setIsLoading(false);
    }
  };

  const findMyLocation = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    const asyncGetData = async () => {
      setShelterList(await getShelterData());
    };
    findMyLocation();
    asyncGetData();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center	 w-100 h-screen">
        <SpinningCircles fill="#EDA900" stroke="#997000" />
      </div>
    );
  return (
    <div id="map_wrap" className="relative w-full h-96 m-0 p-0">
      <div id="map" className="relative w-full h-full">
        <div className="relative">
          <div className="h-12 z-10 absolute top-[3vh] mx-auto inset-x-0 text-center opacity-80">
            <Map2ListToggle />
          </div>

          <Map // 지도를 표시할 Container
            center={state.center}
            className="w-full h-[85vh]"
            level={9} // 지도의 확대 레벨
          >
            {!state.isLoading && (
              <MapMarker
                position={state.center}
                image={{
                  src: 'https://i.ibb.co/F4q5WKP/image.png',
                  size: {
                    width: 50,
                    height: 50,
                  },
                }}
                clickable={false}
              />
            )}
            {shelterList.map((shelter) => {
              const handleMarkerClick = async () => {
                setRescueList(await getRescueDataByShelter(shelter.careCode));
              };
              return (
                <ShelterMarker
                  key={`EventMarkerContainer-${shelter._id}`}
                  shelter={shelter}
                  onMarkerClick={handleMarkerClick}
                />
              );
            })}
          </Map>
        </div>
      </div>
      <Aside rescueList={rescueList} />
    </div>
  );
}

export default MapView;

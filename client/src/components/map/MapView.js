/* eslint-disable no-underscore-dangle */

import { React, useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { SpinningCircles } from 'react-loading-icons';
import Map2ListToggle from './Map2ListToggle';
import Aside from './Aside';
import getRescueDataByShelter from '../../api/getRescueDataByShelter';
import getShelterData from '../../api/getShelterData';
import ShelterMarker from './ShelterMarker';
import CurrentPositionMarker from './CurrentPositionMarker';

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

  useEffect(() => {
    const asyncGetData = async () => {
      setShelterList(await getShelterData(setIsLoading));
    };
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
            <CurrentPositionMarker
              state={state}
              setState={setState}
              iconHeight={50}
              iconWidth={50}
            />

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

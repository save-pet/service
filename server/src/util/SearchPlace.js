/**
 * @param {string} place
 */
async function getPlaces(place) {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${place}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
          Host: 'dapi.kakao.com',
        },
      },
    )
    const data = await res.json();
    return data.documents;
}

/**
 * @param {Array}  dataArr
 * @param {string} dataArr[].x
 * @param {string} dataArr[].y
 */
function getCenterPlace(dataArr){
    const LatLngObj = dataArr.reduce(
        function(acc, item) {
        acc.lat = (acc.lat || 0) + Number(item.y)
        acc.lng = (acc.lng || 0) + Number(item.x)
        return acc;
      }, {});

    const [lat, lng] = [LatLngObj.lat/dataArr.length, LatLngObj.lng/dataArr.length]
    return [lat, lng]
}

/**
 * @param {string} place
 */
async function SearchPlace(place) {
    const dataArr = await getPlaces(place);
    const [lat, lng] = getCenterPlace(dataArr);
    return [lat, lng]
}

// await SearchPlace('상주')
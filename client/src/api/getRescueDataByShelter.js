import axios from 'axios';

const getRescueDataByShelter = async (careCode) => {
  try {
    const { data } = await axios({
      url: `${process.env.REACT_APP_SERVER_DOMAIN}/api/rescue/care-code/${careCode}`,
      method: 'GET',
    });
    return data;
  } catch (error) {
    return error.response.data.reason;
  }
};

export default getRescueDataByShelter;

import axios from 'axios';

const getShelterData = async (setIsLoading) => {
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

export default getShelterData;

import axios from 'axios';
import PropTypes from 'prop-types';

const getShelterData = async (setIsLoading) => {
  if (setIsLoading) setIsLoading(true);
  try {
    const { data } = await axios({
      url: `${process.env.REACT_APP_SERVER_DOMAIN}/api/shelter`,
      method: 'GET',
    });
    return data;
  } catch (error) {
    return error.response.data.reason;
  } finally {
    if (setIsLoading) setIsLoading(false);
  }
};

export default getShelterData;

getShelterData.defaultProps = {
  setIsLoading: false,
};

getShelterData.propTypes = {
  setIsLoading: PropTypes.func,
};

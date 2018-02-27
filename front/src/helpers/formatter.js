
import { padStart } from 'lodash';

const formatTimeDifference = (tdf) => {
  let mins = '00';

  if (tdf % 1 !== 0) {
    mins = '30';
  }

  const isMinus = tdf < 0;
  return `${isMinus ? '- ' : '+ '}${padStart(parseInt(Math.abs(tdf), 10), 2, 0)}:${mins}`;
};

export default formatTimeDifference;

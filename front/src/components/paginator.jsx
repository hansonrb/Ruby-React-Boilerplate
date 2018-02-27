
import React from 'react';
import { Link } from 'react-router';
import { compose, pure } from 'recompose';
import { range, map, uniqueId } from 'lodash';
import cn from 'classnames';
import FlatButton from 'material-ui/FlatButton';

import './paginator.css';

const enhance = compose(
  pure,
);

export default enhance(({
  total,
  current,
  base,
  extra,
}) => (
  <ul className="paginator">
    { current > 1 &&
      <li>
        <Link
          to={`${base}?${extra || ''}&page=1`}
          className="page-link"
        ><FlatButton className="flatbutton-simple">{ '\xAB' }</FlatButton></Link>
      </li>
    }
    { map(
      range(Math.max(1, current - 5), Math.min(total, current + 5) + 1),
      page => (
        <li key={uniqueId()}>
          <Link
            to={`${base}?${extra || ''}&page=${page}`}
            className={cn('page-link', { active: page === current })}
          ><FlatButton className="flatbutton-simple">{ page }</FlatButton></Link>
        </li>
      ),
    ) }
    { current < total &&
      <li>
        <Link
          to={`${base}?${extra || ''}&page=${total}`}
          className="page-link"
        ><FlatButton className="flatbutton-simple">{ '\xBB' }</FlatButton></Link>
      </li>
    }
  </ul>
));

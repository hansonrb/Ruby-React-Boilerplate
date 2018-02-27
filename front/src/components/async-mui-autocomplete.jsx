
import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { pure, compose, withState, withHandlers, lifecycle } from 'recompose';
import { get, find, map } from 'lodash';
import apiClient from 'helpers/api-client';

let searchCache = {};

const enhance = compose(
  withState('items', 'setItems', props => props.initialList),
  withState('searchText', 'setSearchText', props =>
    get(
      find(props.items, { value: props.input.value }), 'text', '',
    ),
  ),
  withHandlers({
    handleSearch: props => (val) => {
      if (searchCache[val]) {
        props.setItems(searchCache[val]);
      } else {
        props.setItems([]);
        apiClient()
          .get('/api/users', { params: { page: 1, filter: val, sort: 'name', include_self: '1' } })
          .then((res) => {
            searchCache[val] = map(res.data.users, u => ({
              value: u.id, text: u.name,
            }));
            props.setItems(searchCache[val]);
          });
      }
    },
  }),
  lifecycle({
    componentWillMount() {
      searchCache = {};
    },
  }),
  pure,
);

export default enhance(({
  input,
  meta: { error, warning },
  items, setItems,
  searchText, setSearchText,
  onNewRequest,
  initialList,
  handleSearch,
  ...props
}) => (
  <AutoComplete
    searchText={searchText}
    floatingLabelText="User"
    filter={AutoComplete.caseInsensitiveFilter}
    dataSource={items}
    errorText={items.length > 0 && (error || warning) ? error || warning : null}
    dataSourceConfig={{
      text: 'text',
      value: 'value',
    }}
    onNewRequest={(value) => {
      input.onChange(
        typeof value === 'object'
          ? value.value
          : value,
      );
    }}
    onUpdateInput={(value) => {
      setSearchText(value);
      handleSearch(value);
      input.onChange('');
    }}
    {...props}
  />
));

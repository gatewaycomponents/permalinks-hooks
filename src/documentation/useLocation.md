# useLocation

Uses current window location and adds enhanced functionality.

```js
import { useState } from 'react';
import { useLocation, useNavigation } from 'dcs-permalinks';
import ReactJson from 'react-json-view';

function Component () {
  const location = useLocation();
  const navigation = useNavigation();

  // Change this here and click "Change location" or use your browser address bar to get different results.
  const link = '/path/to/file?query=string'

  const {
    href,
    pathname,
    patharray,
    search,
    query
  } = location;

  const json = {
    href,
    pathname,
    patharray,
    search,
    query
  };

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={json || {}}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => { navigation.push(link) }}>Change location</button>
      <button style={{margin: '1em'}} onClick={() => { navigation.push('/') }}>Go home</button>
    </>
  );
};

<Component />
```

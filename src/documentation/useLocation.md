# useLocation

Parses all path parts and query parameters using window.location, and provides ways to change the window location.

```js
import { useState } from 'react';
import { useLocation } from 'dcs-permalinks';
import ReactJson from 'react-json-view';

function Component () {
  const { pathArray, queryObject, pushLocation } = useLocation();

  const link = {
    state: {id: 'myCustomLink'},
    path: '/path/to/file?query=string'
  }

  const json = {
    pathArray,
    queryObject
  };

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={json || {}}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => {pushLocation(link);}}>Change location</button>
      <button style={{margin: '1em'}} onClick={() => {pushLocation({state:{id:'home'}, path: '/'});}}>Go home</button>
    </>
  );
};

<Component />
```

# useLocation

Uses current window location and adds enhanced functionality.

```js
import { useState } from 'react';
import { useLocation } from 'dcs-permalinks';
import ReactJson from 'react-json-view';

function Component () {
  const location = useLocation();

  const link = '/path/to/file?query=string'

  const {
    href,
    pathname,
    patharray,
    searh,
    query
  } = location;

  const json = {
    href,
    pathname,
    patharray,
    searh,
    query
  };

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={json || {}}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => { location.push(link) }}>Change location</button>
      <button style={{margin: '1em'}} onClick={() => { location.push('/') }}>Go home</button>
    </>
  );
};

<Component />
```

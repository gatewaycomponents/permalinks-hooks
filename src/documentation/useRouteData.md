# useRouteData

Receives a route object and url data, and retrieves a single new object.

```js
import { useState } from 'react';
import { useRouteData, useLocation } from 'dcs-permalinks';
import ReactJson from 'react-json-view';

const route = {
  entry: "post",
  path: ['username', '...postPath']
}

function Component () {
  const { pathArray, queryObject, pushLocation } = useLocation();
  const { routeData } = useRouteData({route,routePath:pathArray,queryObject});

  const link = {
    state: {id: 'myCustomLink'},
    path: '/johndoe/javascript/how-to-react?search=custom+hooks'
  }

  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={routeData || {}}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => {pushLocation(link);}}>Change location</button>
      <button style={{margin: '1em'}} onClick={() => {pushLocation({state:{id:'home'}, path: '/'});}}>Go home</button>
    </>
  );
};

<Component />
```

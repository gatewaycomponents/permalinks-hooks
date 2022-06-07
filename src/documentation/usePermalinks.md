Receives an array of routes and matches the current url to return the a data object. The array of routes can be skipped by using the PermalinksConfig component as ancestor.

```jsx
import { useState, useEffect } from 'react';
import { usePermalinks, useNavigation } from 'permalinks-hooks';
import ReactJson from 'react-json-view';

const routes = [
  {
    entry: "scripture",
    path: ["org","lang","resource","branch","book","chapter","verse"]
  },
  {
    entry: "resource",
    path: ["org", "lang", "resource", "...pathToFile"]
  }
]

function Component () {

  const { permalink: data } = usePermalinks({
    routes
  });
  const { push } = useNavigation();

  // Change this links and click "Change location" or use your browser address bar to get different results.
  const link1 = 'resource/unfoldingWord/en/tw/bible/kt/grace.md?search=gift';
  const link2 = '/scripture/unfoldingWord/en/ult/master/tit/3/12';
  
  return (
    <>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={data || {}}
        theme="monokai"
      />
      <button style={{margin: '1em'}} onClick={() => {push(link1);}}>Change location 1</button>
      <button style={{margin: '1em'}} onClick={() => {push(link2);}}>Change location 2</button>
      <button style={{margin: '1em'}} onClick={() => {push('/');}}>Go home</button>
    </>
  );
};

<Component />
```

## Using usePermalinks with PermalinksConfig

```js
import { useState } from 'react';
import { usePermalinks, PermalinksConfig, useLocation, useNavigation } from 'permalinks-hooks';
import ReactJson from 'react-json-view';

const routes = [
  {
    entry: "scripture",
    path: ["org","lang","resource","branch","book","chapter","verse"]
  },
  {
    entry: "resource",
    path: ["org", "lang", "resource", "...pathToFile"]
  }
]

function Scripture () {
  const { permalink: data, entry } = usePermalinks({});
  return( entry === 'scripture' &&
    <div>
      <h2>Scripture: {data.book} {data.chapter}:{data.verse} {data.resource}</h2>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={data}
        theme="monokai"
      />
    </div>
  )
}

function Resource () {
  const { permalink: data, entry } = usePermalinks({});
  return(entry === 'resource' &&
    <div>
      <h2>Resource: {data.resource}</h2>
      <h3>Data to load translation resources:</h3>
      <ReactJson
        style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
        src={data}
        theme="monokai"
      />
    </div>
  )
}

function Component () {

  const { push } = useNavigation();
  
  // Change this links and click "Change location" or use your browser address bar to get different results.
  const link1 = 'resource/unfoldingWord/en/tw/bible/kt/grace.md?search=gift';
  const link2 = '/scripture/unfoldingWord/en/ult/master/tit/3/12';

  return (
    <>
      <Resource/>
      <Scripture/>
      <button style={{margin: '1em'}} onClick={() => {push(link1);}}>Change location 1</button>
      <button style={{margin: '1em'}} onClick={() => {push(link2);}}>Change location 2</button>
      <button style={{margin: '1em'}} onClick={() => {push('/');}}>Go home</button>
    </>
  );
};

<PermalinksConfig routes={routes}>
  <Component />
</PermalinksConfig>
```

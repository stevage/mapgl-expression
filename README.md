## Mapbox-expression

This library lets you evaluate a Mapbox GL expression directly, for a given feature, in a given context.

Credit for the code goes to danvk. Most of the code comes from [here](https://gist.github.com/danvk/4378b6936f9cd634fc8c9f69c4f18b81). See the [Mapbox GL issue](https://github.com/mapbox/mapbox-gl-js/issues/7670) for further context.

You need to include Mapbox GL separately.

### Usage

```js
import Expression from 'mapbox-expression';

const feature = {
    type: 'Feature',
    properties: {
        name: 'Jan'
    },
    geometry: null
};

Expression.parse(['concat', 'Hello, ', ['get', 'name']]).evaluate(feature);
// 'Hello, Jan'
```

You can also pass in a context object. Mapbox GL seems to recognise these values:

```
zoom: number, // required
heatmapDensity: number,
lineProgress: number,
isSupportedScript: (string) => boolean,
accumulated: Value
```

So:

```js
Expression.parse(['interpolate', ['linear'], ['zoom'], 10, 3, 15, 8]).evaluate(feature, { zoom: 12 })
// 5
```
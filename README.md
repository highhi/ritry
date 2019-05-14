# ritry

## Install
```
$ npm install --save ritry
```

## Usage
The following code throws an error after 4 retries.

``` javascript
import { ritry } from 'ritry'

function promiseFunction() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('fail')), 500)
  })
}

ritry(promiseFunction, { retry: 4 }).catch((err) => {
  console.error(err)
})
```

you can gradually increase the duration.

``` javascript
import { ritry } from 'ritry'

function promiseFunction({ retryCount }) {
  const duration = 1000 + retryCount * 200
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('fail')), duration)
  })
}

ritry(promiseFunction, { retry: 4 }).catch((err) => {
  console.error(err)
})
```

```
declare type Callback<T> = () => Promise<T>;
declare type Options = {
  retry?: number;
};
export declare function ritry<T>(callback: Callback<T>, options?: Options): Promise<T>;
```


## Options
### retry
`default: 1`  
You can change the number of retries


## License
MIT

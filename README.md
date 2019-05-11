# ritry
[![CircleCI](https://circleci.com/gh/highhi/ritry.svg?style=svg)](https://circleci.com/gh/highhi/ritry)

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

ritry(() => promiseFunction(), { retry: 4 }).catch((err) => {
  console.error(err.message)
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

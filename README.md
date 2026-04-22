#### This package pdf-merge-split performe merge and split opreation on pdf, provide prebuild function, It use pdf-lib


## Installation
```
npm i pdf-merge-split
```

## merge pdf

### commonjs
```
const {merge_pdf} = require('pdf-merge-split')
const fs = require('fs')

const paths = ['./test.pdf','./test2.pdf']

async function mergePdf_fn() {
    const pdf_data = await merge_pdf(paths);
    if (pdf_data.success) {
        fs.writeFileSync('merge.pdf', pdf_data.data)
    }
}

mergePdf_fn()

```

### ES6
```
import {merge_pdf} from 'pdf-merge-split'
import fs from 'fs'

const paths = ['./test.pdf','./test2.pdf']

const mergePdf_fn = async () => {
    const pdf_data = await merge_pdf(paths);
    if (pdf_data.success) {
        fs.writeFileSync('merge.pdf', pdf_data.data)
    }
}

mergePdf_fn()

```
### merge_pdf accept one argument
### array of pdf paths

#### Path must be Array of string
#### Path min length 2
#### Add as many pdf paths you want


<hr>

### merge_pdf return object with two values
### 1. success (Boolean) => true only if merge successfull
### 2. data (final raw pdf data) => need to save as pdf
###  data will not return if success is false





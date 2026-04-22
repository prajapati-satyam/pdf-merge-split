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

## Input

### merge_pdf accepts one argument:

### An array of PDF file paths

## Rules
### Must be an array of strings
### Minimum 2 file paths required
### You can add as many PDF files as needed


<hr>

## Output

### merge_pdf returns an object:

```javascript
{
  success: Boolean,
  data: Buffer
}
```
### Fields
### success => true only if merge is successful
### data => final merged PDF (raw buffer, must be saved as .pdf)
### If success = false, data will NOT be returned




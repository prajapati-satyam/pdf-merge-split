#### This package pdf-merge-split performe merge and split opreation on pdf, provide prebuild function, It use pdf-lib


## Installation
```
npm i pdf-merge-split
```

## merge pdf

### commonjs
``` javascript
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
``` javascript
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

### Input

#### merge_pdf accepts one argument:

* An array of PDF file paths

### Rules
* Must be an array of strings
* Minimum 2 file paths required
* You can add as many PDF files as needed


<hr>

### Output

#### merge_pdf returns an object:

```javascript
{
  success: Boolean,
  data: Buffer
}
```

* success => true only if merge is successful
* data => final merged PDF (raw buffer, must be saved as .pdf)
* If success = false, data will NOT be returned


<hr>

## split pdf

### allpagesplit (split each page of pdf as separate pdf file)
### commonjs
 ```javascript
const {split_pdf} = require('pdf-merge-split');
const fs = require('fs');

const option = {
    mode: 'allpagesplit'
}
async function splitPdf_fn() {
   const pdf_data = await split_pdf('./test.pdf', option);
   if (pdf_data.success) {
      for (let i = 0; i < pdf_data.totalPages; i++) {
      fs.writeFileSync(`${i+1}.pdf`,pdf_data.data[i])
     }
   }
}
splitPdf_fn()
 ```
### ES6
```javascript
import {split_pdf} from 'pdf-merge-split'
import fs from 'fs'

const option = {
    mode: 'allpagesplit'
}
const splitPdf_fn = () => {
    const pdf_data = await split_pdf('./test.pdf', option);
  if (pdf_data.success) {
     for (let i = 0; i < pdf_data.totalPages; i++) {
     fs.writeFileSync(`${i+1}.pdf`,pdf_data.data[i])
    }
  }
}
splitPdf_fn()
```
### range (split each page of pdf as separate pdf file for given range , ex: 10, 15 => output => 10.pdf , 11.pdf .... to 15.pdf, give range inside option  pageNumbers field)
### commonjs

```javascript
const {split_pdf} = require('pdf-merge-split');
const fs = require('fs');

const option = {
   mode: 'range',
   pageNumbers: [10,15]
}

const splitPdf_fn = () => {
    const pdf_data = await split_pdf('./test.pdf', option);
    if (pdf_data.success) {
     for (let i = 0; i < pdf_data.totalPages; i++) {
      fs.writeFileSync(`${i+1}.pdf`,pdf_data.data[i])
  }
 }
}

splitPdf_fn()
```
### ES6
```javascript
import {split_pdf} from 'pdf-merge-split'
import fs from 'fs'

const option = {
   mode: 'range',
   pageNumbers: [10,15]
}
const splitPdf_fn = () => {
    const pdf_data = await split_pdf('./test.pdf', option);
  if (pdf_data.success) {
     for (let i = 0; i < pdf_data.totalPages; i++) {
     fs.writeFileSync(`${i+1}.pdf`,pdf_data.data[i])
    }
  }
}
splitPdf_fn()
```

### pagenumber (split each page of pdf as separate pdf file for given page numbers , ex : 10, 15 => output => 10.pdf, 15.pdf, give pagenumber inside option  pageNumbers field)
### commonjs

``` javascript
const {split_pdf} = require('pdf-merge-split');
const fs = require('fs');

const option = {
   mode: 'pagenumber',
   pageNumbers: [10,15]
}
const splitPdf_fn = () => {
    const pdf_data = await split_pdf('./test.pdf', option);
  if (pdf_data.success) {
     for (let i = 0; i < pdf_data.totalPages; i++) {
     fs.writeFileSync(`${i+1}.pdf`,pdf_data.data[i])
    }
  }
}

splitPdf_fn()
```

### ES6
```javascript
import {split_pdf} from 'pdf-merge-split'
import fs from 'fs'

const option = {
   mode: 'pagenumber',
   pageNumbers: [10,15]
}
const splitPdf_fn = () => {
    const pdf_data = await split_pdf('./test.pdf', option);
  if (pdf_data.success) {
     for (let i = 0; i < pdf_data.totalPages; i++) {
     fs.writeFileSync(`${i+1}.pdf`,pdf_data.data[i])
    }
  }
}

splitPdf_fn()

```



### Input
#### split_pdf accept two argumenst:
* pdf path (string)
* option (object)

#### option
* mode (string)
  * allpagesplit (split each page of pdf as separate pdf file)
  * range (split each page of pdf as separate pdf file for given range , ex: 10, 15 => output => 10.pdf , 11.pdf .... to 15.pdf)
  * pagenumber (split each page of pdf as separate pdf file for given page numbers , ex : 10, 15 => output => 10.pdf, 15.pdf)
* pageNumbers (Array of Number) (total length must be excat 2) (only required for mode range and pagenumber)

#### option for allpagesplit
```javascript
const option = {
    mode: "allpagesplit"
}

```
#### option for range
``` javascript
const option = {
    mode: "range",
    pageNumbers: [10,15]
}
```
#### option for pagenumber
```javascript
const option = {
   mode: 'pagenumber',
   pageNumbers: [10,15]
}
```



### Output


```javascript
{
  success: Boolean,
  data: [] Buffer,
  totalPages: Number
}
```
* success : return true if all ok
* data : array of buffer raw data, each element is separate pdf
* totalPages : length of data

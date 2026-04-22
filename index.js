const fs = require('fs')
const { PDFDocument } = require("pdf-lib");


async function merge_pdf(pdfpaths) {
 if (pdfpaths.length < 2) {
      console.log(new Error("Atleast 2 pdfs are required to merge"));
      const obj ={
      success: false
    }
    return obj;
 }
 let pdfBytesLoad = [];
  // buffer data of pdf
  for (let i = 0; i < pdfpaths.length; i++) {
    let chunks = [];
    await new Promise((resolve, reject) => {
      const stream = fs.createReadStream(pdfpaths[i]);
      stream.on('data', (chunk) => {
       chunks.push(chunk)
      })
      stream.on('end', () => {
        pdfBytesLoad.push(Buffer.concat(chunks));
        resolve();
      })
      stream.on("error", () => {
        reject();
        console.log(new Error("Unable to stream pdf"));
        // console.log("unable to process stream in merge_pdf");
        process.exit(1);
      })
    })
  }
  // console.log("length of pdf bytes load : ", pdfBytesLoad.length);
  // console.log("data of pdf bytes load : ", pdfBytesLoad);
  let existingPdf = [];
  // load data in pdf document
  for (let i = 0; i < pdfBytesLoad.length; i++) {
    const loadpdf = await PDFDocument.load(pdfBytesLoad[i]);
    existingPdf.push(loadpdf);
  }
  // console.log("length of existing pdf : ", existingPdf.length);
  // console.log("existing pdf data : ", existingPdf);

  // making final pdf
  // let bytesOfFinalPdf = [];
  const final_pdf = await PDFDocument.create();
  for (let i = 0; i < existingPdf.length; i++) {
    const copyPages = await final_pdf.copyPages(existingPdf[i], existingPdf[i].getPageIndices());

    copyPages.forEach((page) => {
      final_pdf.addPage(page)
    });
  }
  const finalPdfBytes = await final_pdf.save();
  const obj = {
    success: true,
    data: finalPdfBytes
  }
  return obj
}

// range, pagenumbers, allpagesplit

async function split_pdf(inputpath, option) {
  if (!inputpath || !(fs.existsSync(inputpath)) || !option || inputpath === null || inputpath === undefined || inputpath.trim() === '') {
    const obj ={
      success: false
    }
    console.log(new Error("Input path error, Check Your Input "))
    return obj
  }
  // if ([range, pagenumbers, allpagesplit].filter(Boolean).length >= 2) {
  //   console.log("only one parameter can be execute at once")
  //   process.exit(1);
  // }
  const existingPdfBytes = fs.readFileSync(inputpath);



  // for if user give all page split true
  if (option.mode === "allpagesplit") {
    const finalAllPdfBytes = []
    const existingPdf = await PDFDocument.load(existingPdfBytes);
    // const newPdf = await PDFDocument.create();
    const page_count = existingPdf.getPageIndices();
    // const random_dir = fs.mkdtempSync("hello split");

    for (let i = 0; i < page_count.length; i++) {
      const singlePagePdf = await PDFDocument.create();
      const [page] = await singlePagePdf.copyPages(existingPdf, [i]);
      singlePagePdf.addPage(page);
      const pdfBytes = await singlePagePdf.save();
      finalAllPdfBytes.push(pdfBytes);
      // fs.writeFileSync(`./${random_dir}/page_${i + 1}.pdf`, pdfBytes);
    }

    // const zip_file = await zip(`./${random_dir}`, `./${random_dir}.zip`, { compression: COMPRESSION_LEVEL.high });
    // fs.rmSync(random_dir, { recursive: true, force: true });
    const obj = {
      success: true,
      data: finalAllPdfBytes,
      totalPages: existingPdf.getPageCount()
    }
    return obj
  }



  // for if user give range of two numbers
  // push all range numbers in array
  // range && range.length === 2 && range[0] < range[1] && range[1] > range[0]
  if (option.mode === "range") {
    if (option.pageNumbers.length !== 2 || option.pageNumbers[0] > option.pageNumbers[1] || !option.pageNumbers) {
       console.log(new Error('Check rangeNumbers values, first value can\'t be Greter than second, must be exact two elements in rangeNumbers, Values must be Number, Check Your rangeNumbers option'))
       const obj ={
      success: false
    }
    return obj
    }
    let page_count2 = [];
    let finalAllPdfBytes = [];
    while (option.pageNumbers[0] <= option.pageNumbers[1]) {
      page_count2.push(option.pageNumbers[0]);
      option.pageNumbers[0]++;
    }
    // console.log("i am page count ", page_count2)
    const existingPdf = await PDFDocument.load(existingPdfBytes);
    // const newPdf = await PDFDocument.create();
    // check input range is not greater than total pdf length
    if (page_count2.length > existingPdf.getPageCount()) {
      console.log(new Error("Input Range Can't exceed Total Number of Pages in PDF"))
      const obj ={
      success: false
    }
    return obj
    }

    // const random_dir = fs.mkdtempSync("hello split");
    for (let i = 0; i < page_count2.length; i++) {
      const singlePagePdf = await PDFDocument.create();
      const [page] = await singlePagePdf.copyPages(existingPdf, [page_count2[i] - 1]);
      singlePagePdf.addPage(page);
      const pdfBytes = await singlePagePdf.save();
      finalAllPdfBytes.push(pdfBytes);
      // fs.writeFileSync(`./${random_dir}/page_${page_count2[i]}.pdf`, pdfBytes);
    }
    // await zip(`./${random_dir}`, `${random_dir}.zip`, {
    //   compression: COMPRESSION_LEVEL.high
    // })
    // fs.rmSync(random_dir, { recursive: true, force: true });
    const obj = {
      success: true,
      data: finalAllPdfBytes,
      totalPages: finalAllPdfBytes.length
    }
    return obj;
  }



  // for is user give random page numbers
  // pagenumbers && pagenumbers.length > 0
  if (option.mode === "pagenumber") {
    if (!option.pageNumbers || option.pageNumbers.length < 0) {
       console.log(new Error("Check your opions and try again"));
       const obj ={
      success: false
    }
    return obj;
    }
    const existingPdf = await PDFDocument.load(existingPdfBytes);
    for (let i =0; i < option.pageNumbers.length; i++) {
      if (option.pageNumbers[i] > existingPdf.getPageCount()) {
          console.log(new Error("Page Numbers can't exceed Tottalpages of PDF"))
          const obj ={
      success: false
    }
    return obj;
      }
    }

    // const newPdf = await PDFDocument.create();
    // const random_dir = mkdtempSync("hello split");
    let finalAllPdfBytes = [];
    for (let i = 0; i < option.pageNumbers.length; i++) {
      const pageIndex = option.pageNumbers[i] - 1;

      const singlePagePdf = await PDFDocument.create();
      const [page] = await singlePagePdf.copyPages(existingPdf, [pageIndex]);
      singlePagePdf.addPage(page);

      const pdfBytes = await singlePagePdf.save();
      finalAllPdfBytes.push(pdfBytes)

      // keep the file name same as user input (1-based)
      // fs.writeFileSync(`${random_dir}/page_${pagenumbers[i]}.pdf`, pdfBytes);
    }
    // await zip(`./${random_dir}`, `${random_dir}.zip`, {
    //   compression: COMPRESSION_LEVEL.high
    // })
    // fs.rmSync(random_dir, { recursive: true, force: true })
    const obj = {
      success: true,
      data: finalAllPdfBytes,
      totalPages: finalAllPdfBytes.length
    }
    return obj
  }
}


module.exports = {merge_pdf, split_pdf}
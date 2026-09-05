declare function merge_pdf(pdfpaths: any[]): Promise<{
    success: boolean;
}>;
declare function split_pdf(inputpath: string, option: any): Promise<{
    success: boolean;
} | undefined>;
declare const _default: {
    merge_pdf: typeof merge_pdf;
    split_pdf: typeof split_pdf;
};
export = _default;
//# sourceMappingURL=index.d.ts.map
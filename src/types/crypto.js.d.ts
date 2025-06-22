declare module 'crypto-js' {
    // @ts-expect-error importing a library without types
    const CryptoJS: any;
    export = CryptoJS;
}
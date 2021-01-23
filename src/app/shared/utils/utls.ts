export class Utils {

    public static hasValue(value: string) {
        return (value !== null && value !== undefined);
    }

    public static converterToBLob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    public static converterBlobToUrl(b64Data, contentType) {
        const blob = Utils.converterToBLob(b64Data, contentType);
        return URL.createObjectURL(blob);
    }

    // public static getBase642(fileResquest: File) {
    //     let modelvalue: string | ArrayBuffer;
    //     let reader = new FileReader();
    //     reader.readAsDataURL(fileResquest);
    //     reader.onload = function () {
    //         console.log(reader.result)
    //         modelvalue = reader.result;
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
    //     return modelvalue.toString();
    // }

    public static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
}
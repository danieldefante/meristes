import { Observable } from 'rxjs';
import { Buffer } from 'buffer';

export class FileResource {

    public update(url: string, base64: string) {

        let blob: File = this.extractFile(base64);

        return this.executeRequest("PUT", url, blob);
    }

    public save(url: string, base64: string) {

        let blob: File = this.extractFile(base64);

        return this.executeRequest("POST", url, blob);
    }

    private extractFile(base64: string): File {
        let matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2], 'base64');

        let blob = new Blob([buffer], { type: type });

        return <File>blob;
    }

    private executeRequest(method: string, url: string, file: any) {
        return Observable.fromPromise(new Promise((resolve, reject) => {
            let formData: any = new FormData()
            let xhr = new XMLHttpRequest()

            formData.append("file", file, 'teste')

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response))
                    } else {
                        reject(xhr.response)
                    }
                }
            }
            xhr.open(method, url, true)
            xhr.send(formData)
        }));
    }
}
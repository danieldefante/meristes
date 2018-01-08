import { PagedResult } from './pagedResult';
export class ImageUtil {
    private imgDefault: string = 'data:image/png;base64,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'
    constructor() {

    }

    public resolverPagedResultBlobToBase64(pagedResult: PagedResult, field: string): PagedResult {
        let img: string;

        pagedResult.getDataList().forEach(element => {
            if (element[field]) {
                this.resolverBlobToBase64(element, field);
            } else {
                element[field] = this.imgDefault;
            }

        });

        return pagedResult;
    }

    public resolverBlobToBase64(data: any, field: string, childField?: string): any {
        let img: string;

        if (data[field]) {
            if (childField) {
                img = data[field][childField].toString('base64');
                data[field][childField] = 'data:image/jpeg;base64,'.concat(img);//.replace('dataimage/jpegbase64', 'data:image/jpeg;base64,');
            } else {
                img = data[field].toString('base64');
                data[field] = 'data:image/jpeg;base64,'.concat(img);//.replace('dataimage/jpegbase64', 'data:image/jpeg;base64,');
            }
        } else if (childField) {
            data[field] = {
                [childField]: this.imgDefault
            };

        } else {
            data[field] = this.imgDefault;
        }

        return data;
    }
}
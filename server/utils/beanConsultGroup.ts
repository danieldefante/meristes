export class BeanConsultGroup {

    private page: number;

    private size: number;

    constructor(page, size) {
        this.setPage(+page);
        this.setSize(+size);
    }

    public getPage(): number {
        return this.page;
    }

    public setPage(page: number) {
        this.page = page;
    }

    public getSize(): number {
        return this.size;
    }

    public setSize(size: number) {
        this.size = size;
    }
    
    public resolver() {
        return [this.getPage() * this.getSize(), this.getSize()];
    }
}
export class PagedResult {
	
	private sizeDB: number;
	
    private dataList: any[];

	public getSizeDB() {
		return this.sizeDB;
	}

	public setSizeDB(sizeDB: number) {
		this.sizeDB = sizeDB;
	}

	public getDataList() {
		return this.dataList;
	}

	public setDataList(dataList) {
		this.dataList = dataList;
	}

	constructor (sizeDB: number, dataList: any[]) {
		this.sizeDB = sizeDB;
		this.dataList = dataList;
	}
	
	
	
}
import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.recordList && this.recordList.push(record2);
    // 可以简写成this.recordList?.push(record2) 问号表示不确定这个对象在不在 有可能是undefined 如果不存在 就不要执行后面的代码 直接跳过
    recordStore.saveRecords();
  }
};

recordStore.fetchRecords();

export default  recordStore
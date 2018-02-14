import * as Table from 'cli-table2'

// 创建一个表格实例
export default function createTable (createOptions?: any) {
  return new Table(createOptions)
}
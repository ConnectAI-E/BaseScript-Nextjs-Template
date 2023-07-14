'use client'
import { bitable, TableMeta } from "@base-open/web-api";
import { Button, Form } from '@douyinfe/semi-ui';
import { useState, useEffect, useRef, useCallback } from 'react';
import { BaseFormApi } from '@douyinfe/semi-foundation/lib/es/form/interface';
import styles from './index.module.css';

export default function App() {
  const [tableMetaList, setTableMetaList] = useState<TableMeta[]>();
  const formApi = useRef<BaseFormApi>();
  const addRecord = useCallback(async ({ table: tableId }: { table: string }) => {
    if (tableId) {
      const table = await bitable.base.getTableById(tableId);
      table.addRecord({
        fields: {},
      });
    }
  }, []);
  useEffect(() => {
    Promise.all([bitable.base.getTableMetaList(), bitable.base.getSelection()])
      .then(([metaList, selection]) => {
        setTableMetaList(metaList);
        formApi.current?.setValues({ table: selection.tableId });
      });
  }, []);

  return (
    <main className={styles.main}>
      <h4 className={styles.h4}>
        Edit <code className={styles.code}>src/App.tsx</code> and save to reload
      </h4>
      <Form labelPosition='top' onSubmit={addRecord} getFormApi={(baseFormApi: BaseFormApi) => formApi.current = baseFormApi}>
        <Form.Slot label="Development guide">
          <div>
            <a href="https://bytedance.feishu.cn/docx/VxhudDXbyo1V7jxAcTbctJQ5nvc" target="_blank"
              rel="noopener noreferrer">
              Base Extension Scripts Guide
            </a>
            、
            <a href="https://bytedance.feishu.cn/docx/HazFdSHH9ofRGKx8424cwzLlnZc" target="_blank"
              rel="noopener noreferrer">
              扩展脚本开发指南
            </a>
          </div>
        </Form.Slot>
        <Form.Slot label="API">
          <div>
            <a href="https://bytedance.feishu.cn/docx/OPatd1tBZoWogFxKKtmcBZMxnle" target="_blank"
              rel="noopener noreferrer">
              Base Extension Scripts Front-end API
            </a>
            、
            <a href="https://bytedance.feishu.cn/docx/HjCEd1sPzoVnxIxF3LrcKnepnUf" target="_blank"
              rel="noopener noreferrer">
              扩展脚本API
            </a>
          </div>
        </Form.Slot>
        <Form.Select field='table' label='Select Table' placeholder="Please select a Table" style={{ width: '100%' }}>
          {
            Array.isArray(tableMetaList) && tableMetaList.map(({ name, id }) => {
              return (
                <Form.Select.Option key={id} value={id}>
                  {name}
                </Form.Select.Option>
              );
            })
          }
        </Form.Select>
        <Button theme='solid' htmlType='submit'>Add Record</Button>
      </Form>
    </main>
  )
}
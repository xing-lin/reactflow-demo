import { FLOW_NODE_TYPE_KEY } from '../../nodes';

export const mockData = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    type: FLOW_NODE_TYPE_KEY.VISIT_PAGE,
    prompt: '请访问指定的页面并等待加载完成。',
  },
  {
    id: '9c858901-8a57-4791-81fe-4c455b099bc9',
    type: FLOW_NODE_TYPE_KEY.VISIT_PAGE,
    prompt: '跳转到目标页面以开始数据抓取。',
  },
  {
    id: '7d44c710-0f2f-4ea7-9c0d-d5f3a9b828f1',
    type: FLOW_NODE_TYPE_KEY.VISIT_PAGE,
    prompt: '加载给定链接并捕获初始 DOM。',
  },
  {
    id: 'e02fa0e4-01ad-090A-c130-0d05b93fde5a',
    type: FLOW_NODE_TYPE_KEY.CLICK_ELEMENT,
    prompt: '定位并点击页面上的指定元素。',
  },
  {
    id: 'a8098c1a-f86e-4d13-bf2d-5a997c60e8a9',
    type: FLOW_NODE_TYPE_KEY.CLICK_ELEMENT,
    prompt: '模拟用户点击按钮或链接。',
  },
  {
    id: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
    type: FLOW_NODE_TYPE_KEY.CLICK_ELEMENT,
    prompt: '单击指定的 DOM 元素触发后续行为。',
  },
  {
    id: '1c6b147f-4d8c-4f87-8b4d-2aaf513d3eae',
    type: FLOW_NODE_TYPE_KEY.INPUT_TEXT,
    prompt: '找到输入框并输入给定文本。',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    type: FLOW_NODE_TYPE_KEY.INPUT_TEXT,
    prompt: '在指定字段中填入用户提供的内容。',
  },
  {
    id: '6fa459ea-ee8a-3ca4-894e-db77e160355e',
    type: FLOW_NODE_TYPE_KEY.INPUT_TEXT,
    prompt: '自动输入搜索关键词并提交。',
  },
  {
    id: '8d12e6f4-5b2c-48d9-8a5e-1d3a2e1c0b9f',
    type: FLOW_NODE_TYPE_KEY.SCROLL_PAGE,
    prompt: '向下滚动页面至底部。',
  },
  {
    id: '2e1dba4f-9b3d-4c57-ae90-3d4e5c2b1f7a',
    type: FLOW_NODE_TYPE_KEY.SCROLL_PAGE,
    prompt: '平滑滚动以加载更多内容。',
  },
  {
    id: '5b6a7c8d-2f4e-4a5b-b6c7-d8e9f0a1b2c3',
    type: FLOW_NODE_TYPE_KEY.SCROLL_PAGE,
    prompt: '滚动到指定坐标位置。',
  },
  {
    id: '7e6f5d4c-3b2a-4f1e-9c8d-7b6a5c4d3e2f',
    type: FLOW_NODE_TYPE_KEY.EXTRACT_DATA,
    prompt: '从页面中提取所有文章标题。',
  },
  {
    id: '4a3b2c1d-0e9f-8d7c-6b5a-4d3e2f1c0b9a',
    type: FLOW_NODE_TYPE_KEY.EXTRACT_DATA,
    prompt: '抓取表格中所有行的数据。',
  },
  {
    id: '8b7c6d5e-4f3a-2b1c-0e9d-8f7e6d5c4b3a',
    type: FLOW_NODE_TYPE_KEY.EXTRACT_DATA,
    prompt: '提取页面元数据（如作者、日期）。',
  },
  {
    id: '9a8b7c6d-5e4f-3a2b-1c0d-9e8f7d6c5b4a',
    type: FLOW_NODE_TYPE_KEY.LOOP,
    prompt: '重复执行抓取，直到满足停止条件。',
  },
  {
    id: '0b1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e',
    type: FLOW_NODE_TYPE_KEY.LOOP,
    prompt: '循环点击“加载更多”直到没有新内容。',
  },
  {
    id: '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
    type: FLOW_NODE_TYPE_KEY.LOOP,
    prompt: '多次重复操作直至数据完整。',
  },
  {
    id: '5f6e7d8c-9b0a-1c2d-3e4f-5a6b7c8d9e0f',
    type: FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA,
    prompt: '结束流程并返回最终结果。',
  },
  {
    id: '2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a',
    type: FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA,
    prompt: '汇总抓取到的所有数据并导出。',
  },
  {
    id: '7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e',
    type: FLOW_NODE_TYPE_KEY.FINISH_OUTPUT_DATA,
    prompt: '整理并返回抓取的结构化数据。',
  },
  {
    id: '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b',
    type: FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS,
    prompt: '提示用户输入抓取起始 URL。',
  },
  {
    id: '3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a',
    type: FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS,
    prompt: '请求用户提供登录凭证。',
  },
  {
    id: '5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f',
    type: FLOW_NODE_TYPE_KEY.INPUT_PARAMETERS,
    prompt: '收集外部传入的工作流参数。',
  },
  {
    id: '9f0e1d2c-3b4a-5c6d-7e8f-9a0b1c2d3e4f',
    type: FLOW_NODE_TYPE_KEY.START,
    prompt: '初始化工作流并加载配置。',
  },
  {
    id: '2a3b4c5d-6e7f-8a9b-0c1d-2e3f4a5b6c7d',
    type: FLOW_NODE_TYPE_KEY.START,
    prompt: '设置运行环境并校验凭证。',
  },
  {
    id: '4c5d6e7f-8a9b-0c1d-2e3f-4a5b6c7d8e9f',
    type: FLOW_NODE_TYPE_KEY.START,
    prompt: '执行前置检查，确认启动条件。',
  },
];

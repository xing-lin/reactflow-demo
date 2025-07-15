import { OUTPUT_TYPE_KEY } from './types';

export const outputTypeOptions = [
  { label: 'Text', value: OUTPUT_TYPE_KEY.TEXT },
  { label: 'Excel (xlsx)', value: OUTPUT_TYPE_KEY.EXCEL_XLSX },
  { label: 'CSV', value: OUTPUT_TYPE_KEY.CSV },
  { label: 'JSON', value: OUTPUT_TYPE_KEY.JSON },
  { label: 'XML', value: OUTPUT_TYPE_KEY.XML },
  { label: 'Markdown (MD)', value: OUTPUT_TYPE_KEY.MD },
  // { label: 'Source File', value: OUTPUT_TYPE_KEY.SOURCE_FILE },
];

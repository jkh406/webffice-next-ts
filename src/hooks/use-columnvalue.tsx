import { getColumnsApi } from 'service/board-api';

export const useColumnValues = async (field : any, token : any) => {
    try {
        const response = await getColumnsApi(field, token);
        const payload = response.data.map((rowData: any) => ({
          id: rowData.id,
          field: rowData.column_value,
          label: rowData.column_name,
          width: rowData.column_width,
          sortable: rowData.sortable,
          visible: rowData.visible,
          ...(rowData.column_render === "true"  && {
            cellRenderer: 'true'
        } 
          )
        }));
        return payload
    } catch (error: any) {
        console.log(error?.response);
        return [];
    }
};
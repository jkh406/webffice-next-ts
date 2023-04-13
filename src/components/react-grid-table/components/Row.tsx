import React from "react";
import { CellContainer } from ".";

const Row : any = ({ index, data, tableManager, measureRef } : any) => {
    const {
        config: { isVirtualScroll, rowIdField },
        rowEditApi: { editRow, getIsRowEditable },
        rowSelectionApi: { getIsRowSelectable, selectedRowsIds },
        columnsApi: { visibleColumns },
        paginationApi: { page, pageSize },
        rowVirtualizer: { virtualItems, totalSize },
    } = tableManager;

    if (isVirtualScroll) {
        if (index === "virtual-start") {
            return visibleColumns.map((visibleColumn : any) => (
                <div
                    key={`${index}-${visibleColumn.id}`}
                    style={{ minHeight: virtualItems[0]?.start }}
                />
            ));
        }
        if (index === "virtual-end") {
            return visibleColumns.map((visibleColumn : any) => (
                <div
                    key={`${index}-${visibleColumn.id}`}
                    style={{
                        minHeight:
                            totalSize -
                                virtualItems[virtualItems.length - 1]?.end || 0,
                    }}
                />
            ));
        }
    }

    let rowIndex = index + 1 + pageSize * (page - 1);
    let rowId = data?.[rowIdField] || rowIndex;
    let disableSelection = !data || !getIsRowSelectable(data);
    let isSelected =
        !!data &&
        !!selectedRowsIds.find((selectedRowId : any) => selectedRowId === rowId);
    let isEdit =
        !!data && editRow?.[rowIdField] === rowId && !!getIsRowEditable(data);

    return visibleColumns.map((visibleColumn : any, colIndex : any) => (
        <CellContainer
            key={`${visibleColumn.id}-${rowId}`}
            rowId={rowId}
            data={rowId && editRow?.[rowIdField] === rowId ? editRow : data}
            rowIndex={rowIndex}
            colIndex={colIndex}
            column={visibleColumn}
            isSelected={isSelected}
            isEdit={isEdit}
            disableSelection={disableSelection}
            forwardRef={colIndex === 0 ? measureRef : undefined}
            tableManager={tableManager}
        />
    ));
};

export default Row;

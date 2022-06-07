import React from "react";
import sampleData from "./sampleData.js";
import DefaultColumnFilter from "./DefaultColumnFilter.js";
import GlobalFilter from "./GlobalFilter.js";
import MapContainer from "./MapContainer.js";

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

export default function App() {
  const data = React.useMemo(() => sampleData, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "title",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Address",
        accessor: "location",
      },
      {
        Header: "URL",
        accessor: "url",
      },
    ],
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
    canNextPage,
    canPreviousPage,
    pageOptions,
    page,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      initialState: { pageSize: 5, pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left",
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  console.error('cell', cell)
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => {
            console.log("previousPage", previousPage);
            previousPage();
          }}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
      </div>
      <MapContainer />
    </>
  );
}

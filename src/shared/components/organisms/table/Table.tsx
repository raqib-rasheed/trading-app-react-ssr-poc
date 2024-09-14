import { ReactNode } from "react";
import "./Table.scss";

export interface IColumn<T> {
  key: string;
  label: string;
  cellRenderer?: (dataElement: T) => ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: IColumn<T>[];
}

const Table = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <div className="table__container">
      <table className="table">
        <thead className="table__header">
          <tr className="table__row">
            {columns.map((column) => (
              <th key={column.key} className="table__cell">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="table__body">
          {data.map((item, index) => (
            <tr key={index} className="table__row">
              {columns.map((column) => (
                <td key={column.key} className="table__cell">
                  {column.cellRenderer
                    ? column.cellRenderer(item)
                    : /* @ts-ignore */
                      item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

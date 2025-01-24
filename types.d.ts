type Widget = {
  widget: string;
  color: string;
};

type WidgetRow = Widget & {
  id: string;
};

// For the sql query result
type SqlQueryResult<T> = {
  rows: T[];
  rowCount: number;
};

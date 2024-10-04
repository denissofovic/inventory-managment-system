interface Columns<T> {
  getHeader: () => React.ReactNode;
  getValue: (object: T) => React.ReactNode;
  filter?: {
    callback: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    values: string[];
    selectName: string;
  };
  getName?: () => React.ReactNode;
  sort?: () => void;
}

export default Columns;

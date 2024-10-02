interface Columns<T> {
  getHeader: () => React.ReactNode;
  getValue: (object: T) => React.ReactNode;
}

export default Columns;

export interface Config {
  record: {
    order: 'ascending' | 'descending';
    extension: boolean;
    maxLength: number;
  };
}

export default <Config>{
  record: {
    order: 'ascending',
    extension: true,
    maxLength: 10,
  },
};

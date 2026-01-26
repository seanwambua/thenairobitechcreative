export class DbUninitializedError extends Error {
  constructor(message = 'The database has not been initialized.') {
    super(message);
    this.name = 'DbUninitializedError';
  }
}

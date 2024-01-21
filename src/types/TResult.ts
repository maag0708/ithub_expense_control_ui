export interface TResult<T> {
  data: T;
  success: boolean;
  messages: string[] | null;
  message: string | null;
  ex: string | null;
}

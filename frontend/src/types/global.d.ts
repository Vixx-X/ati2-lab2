declare interface Props {
  children?: JSX.Element | JSX.Element[] | string | null | undefined;
  [key: string | number]: any;
}

declare interface ApiError {
  error: string;
}

declare interface ClientApiError {
  data: string | null;
  status: number | null;
  url: string | null;
}

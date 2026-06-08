export class ApiError extends Error {
  readonly status: number;
  readonly statusText: string;
  readonly url: string;
  readonly body: unknown;

  constructor(
    message: string,
    init: { status: number; statusText: string; url: string; body?: unknown },
  ) {
    super(message);
    this.name = "ApiError";
    this.status = init.status;
    this.statusText = init.statusText;
    this.url = init.url;
    this.body = init.body;
  }
}

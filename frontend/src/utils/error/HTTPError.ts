import type { ErrorCode } from '@/constants/error';
import { errorMessages } from '@/constants/error';

export interface HTTPErrorProps {
  code: ErrorCode;
  message: string;
}

export class HTTPError extends Error {
  #status: number;

  constructor ({ status, code, message }: { status: number } & HTTPErrorProps) {
    super(errorMessages[code] || message);
    this.name = 'HTTPError';
    this.#status = status;
  }

  isLoginError = () => this.#status === 401;
}

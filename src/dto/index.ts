interface MonitorError {
  isOperational: boolean;
  status: string;
  statusCode: number;
}

export interface MonitorErrorData {
  error: MonitorError;
  message: string;
  stack: string;
  status: string;
}

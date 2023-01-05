interface StandardErrorViewModelProps {
  status: number;
  path: string;
  reason: string;
}

export class StandardErrorResponseViewModel {
  public static toHTTP({
    status,
    path,
    reason,
  }: StandardErrorViewModelProps): object {
    return {
      statusCode: status,
      requestPath: path,
      reason,
      timestamp: new Date().toISOString(),
    };
  }
}

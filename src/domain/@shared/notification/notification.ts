export type NotificationErrorProps = {
  message: string;
  context: string;
}

export default class Notification {
  
  private errors: NotificationErrorProps[] = [];
  
  addError(error: NotificationErrorProps): void {
    this.errors.push(error);
  }
  
  messages(context: string): string {
    return context + ": " + this.errors.filter(e => e.context === context)
      .map(e => e.message)
      .join(',');
  }
  
  hasErrors(context?: string): boolean {
    if (context) {
      return this.errors.filter(e => e.context === context).length > 0;
    }
    
    return this.errors.length > 0;
  }
  
  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }
  
}
export interface Event {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date ;
    location?: string;
    isAllDay?: boolean;
    recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'none';
    attendees?: string[];
    color?: string;
    reminders?: {
      timeBefore: number;
      method: 'popup' | 'email' | 'notification';
    }[];
    status?: 'confirmed' | 'tentative' | 'cancelled';
    createdAt: Date  ;
    updatedAt?: Date  ;
  }
  
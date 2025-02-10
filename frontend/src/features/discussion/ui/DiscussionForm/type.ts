import type { DiscussionRequest } from '../../model';

export interface FormBaseValue {
  name: keyof DiscussionRequest;
  error?: string;
}

export type FormType = 'add' | 'edit';
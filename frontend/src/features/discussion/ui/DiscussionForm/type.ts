import type { DiscussionRequest } from '../../model';

export interface FormBaseValue {
  name: Extract<DiscussionRequest, 'string'>;
  error?: string;
}

export type FormType = 'add' | 'edit';
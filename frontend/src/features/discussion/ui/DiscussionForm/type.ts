import type { DiscussionRequestDTO } from '../../model';

export interface FormBaseValue {
  name: keyof DiscussionRequestDTO;
  error?: string;
}

export type FormType = 'add' | 'edit';
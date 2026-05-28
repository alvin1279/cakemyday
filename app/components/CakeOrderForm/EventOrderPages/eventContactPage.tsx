/**
 * Reuses ForumContactPage directly.
 * EventFormState shares the same contact fields (fullName, phone, email, contactPref)
 * so the cast is safe — only the event-specific fields differ, and this page
 * never touches them.
 */
import { ForumContactPage } from "../ForumPages/forumContactPage";
import type { EventStepProps } from "../EventOrderForm.Types";

export function EventContactPage({ form, set, toggleArr }: EventStepProps) {
  return (
    <ForumContactPage
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form={form as any}
      set={set as any}
      toggleArr={(toggleArr ?? (() => {})) as any}
    />
  );
}

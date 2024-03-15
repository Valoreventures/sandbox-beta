import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://teyudjxlutkavyyigwwz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRleXVkanhsdXRrYXZ5eWlnd3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMDQ2NjgsImV4cCI6MjAyMTg4MDY2OH0.MvaDhHKE55sSIEiasenRbR9U1LKnt7ae6dZUa89LUJg';
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertJournalEntry(
  journalType,
  journalId,
  journalIcon,
  journalMeaning,
  journalEntry,
  wisdomMessage
) {
  const { data, error } = await supabase.from('user_journal_entries').insert({
    journal_type: journalType,
    journal_id: journalId,
    journal_icon: journalIcon,
    journal_meaning: journalMeaning,
    journal_entry: journalEntry,
    wisdom_message: wisdomMessage,
  });

  if (error) {
    console.error('error inserting journal entry:', error);
    return { success: false, error };
  } else {
    console.log('journal entry inserted successfully:', data);
    return { success: true, data };
  }
}

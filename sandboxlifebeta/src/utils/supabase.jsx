import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://teyudjxlutkavyyigwwz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRleXVkanhsdXRrYXZ5eWlnd3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMDQ2NjgsImV4cCI6MjAyMTg4MDY2OH0.MvaDhHKE55sSIEiasenRbR9U1LKnt7ae6dZUa89LUJg';
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function insertJournalEntry(
  userId,
  journalType,
  journalId,
  journalIcon,
  journalMeaning,
  journalEntry,
  wisdomMessage
) {
  const { data, error } = await supabase.from('user_journal_entries').insert({
    user_id: userId,
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

export async function fetchTopUserRecords(userId) {
  const { data, error } = await supabase
    .from('user_journal_entries')
    .select('*') // Select all columns (you can adjust this to specific columns)
    .order('id', { ascending: false }) // Order by ID descending (latest first)
    .limit(6) // Limit to top 6 records
    .eq('user_id', userId); // Filter by user ID

  if (error) {
    console.error('error fetching user records:', error);
    // return null; // Handle error or return an empty array
    return { success: false, error };
  }

  return { success: true, data };
}

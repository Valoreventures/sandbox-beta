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
  wisdomMessage,
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


export const fetchDailyEntryCount = async (userId) => {
  console.log('Fetching daily entry count for user:', userId);

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

  console.log('Start of day:', startOfDay);
  console.log('End of day:', endOfDay);

  const { data, error } = await supabase
    .from('user_journal_entries') // Correct table name
    .select('id', { count: 'exact' })
    .eq('user_id', userId)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay);

  if (error) {
    console.error('Error fetching daily entry count:', error);
    return 0;
  }

  console.log('Fetched daily entry count:', data?.length || 0);
  return data?.length || 0;
};


export async function fetchTopUserRecords(userId) {
  const { data, error } = await supabase
    .from('user_journal_entries')
    .select('*') // Select all columns (you can adjust this to specific columns)
    .order('id', { ascending: false }) // Order by ID descending (latest first)
    .limit(6) // Limit to top 6 records
    .neq('journal_type', 'thought_of_the_day')
    .eq('user_id', userId); // Filter by user ID

  if (error) {
    console.error('error fetching user records:', error);
    // return null; // Handle error or return an empty array
    return { success: false, error };
  }

  return { success: true, data };
}

export const fetchEntries = async (userId, journalType, limit) => {
  try {
    const { data, error } = await supabase
      .from('user_journal_entries')
      .select('*')
      .eq('user_id', userId)
      .eq('journal_type', journalType)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching thought of the day:', error);
      return error;
    } else {
      return data;
    }
  } catch (error) {
    console.error('Error fetching thought of the day:', error);
  }
};



//------------------------------------------ made change here ------------------------------- //
export const fetchAllEntries = async (userId, startDay, lastDay) => {
  try {
    const { data, error } = await supabase
      .from("user_journal_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .gte("created_at", startDay)
      .lte("created_at", lastDay);

    if (error) {
      console.error("Error fetching thought of the day:", error);
      return error;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error fetching thought of the day:", error);
  }
};



//------------------------------------------ made change here ------------------------------- //
export const fetchWeeklyData = async (userId,) => {
  try {
    const { data, error } = await supabase
      .from("user_journal_entries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      // .gt("created_at", weekStart)
      .limit(5)

    if (error) {
      console.error("Error fetching thought of the day:", error);
      return error;
    } else {
      const sorted = data.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at))
      return sorted;
    }
  } catch (error) {
    console.error("Error fetching thought of the day:", error);
  }
};
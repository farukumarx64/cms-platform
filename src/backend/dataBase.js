import { createClient } from "@supabase/supabase-js";

export default async function dataBase(formData, ticketID) {
  console.log('FormData: ', formData, '\nTicketID: ', ticketID);
  
  const supabaseUrl = "https://nalyqbblkzsbsuapjilb.supabase.co";
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Insert data using Supabase 'insert' method
    const { data: insertedData, error: insertError } = await supabase
      .from('complainData')
      .upsert([
        { ...formData, ticket: ticketID }
      ], { returning: 'minimal' }); // Adjust the 'returning' option as needed

    if (insertError) {
      console.error('Error inserting data:', insertError);
    } else {
      console.log('Inserted data:', insertedData);
    }

    // Query data using Supabase 'select' method
    const { data, error } = await supabase
      .from('complainData')
      .select('*');

    if (error) {
      console.error('Error querying data:', error);
    } else {
      console.log('Fetched data:', data);
    }
  } catch (error) {
    console.error('General error:', error);
  }
}

import { createClient } from "@supabase/supabase-js";

export default class Database {
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_KEY;
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async insertData(formData, ticketID) {
    console.log("FormData: ", formData, "\nTicketID: ", ticketID);

    try {
      // Insert data using Supabase 'upsert' method
      const { data: insertedData, error: insertError } = await this.supabase
        .from("complainData")
        .upsert([{ ...formData, id: ticketID }], { returning: "minimal" });

      if (insertError) {
        console.error("Error inserting data:", insertError);
      } else {
        console.log("Inserted data:", insertedData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async queryAll() {
    try {
      // Query data using Supabase 'select' method
      const { data, error } = await this.supabase
        .from("complainData")
        .select("*");

      if (error) {
        console.error("Error querying data:", error);
      } else {
        console.log("Fetched data:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async queryData(ticketID) {
    try {
      // Query data using Supabase 'select' method with a filter for the ticketID
      const { data, error } = await this.supabase
        .from("complainData")
        .select("*")
        .eq("id", ticketID);

      if (error) {
        console.error("Error querying data:", error);
      } else {
        console.log(`Fetched data for ticket ${ticketID}:`, data);
        return data;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

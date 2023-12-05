// storageService.js

import { createClient } from "@supabase/supabase-js";

class StorageService {
  constructor() {
    this.supabaseUrl = "https://nalyqbblkzsbsuapjilb.supabase.co";
    this.supabaseKey = process.env.SUPABASE_KEY;
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    this.bucketName = "complain-attachment";
  }

  async uploadFile(file) {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucketName)
        .upload(`files/${file.name}`, file);

      if (error) {
        console.error(error);
        throw error;
      }
      console.log('Data: ', data)
      console.log('Url: ', data.path)
      return data.path; // Return the file key (URL) from Supabase Storage
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default StorageService;

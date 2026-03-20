import type { SupabaseClient, User } from '@supabase/supabase-js';
import type { Database } from '$lib/database.types';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient<Database>;
			getUser: () => Promise<User | null>;
		}
		interface PageData {
			user?: User | null;
			teacher?: Database['public']['Tables']['teachers']['Row'] | null;
		}
	}
}

export {};

// Auto-generated types from Supabase schema.
// Regenerate with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type MasteryConfig = {
	method: 'highest';
	thresholds: { '4': number; '3': number; '2': number; '1': number };
};

export interface Database {
	public: {
		Tables: {
			teachers: {
				Row: {
					id: string;
					email: string;
					full_name: string | null;
					plan: 'free' | 'pro';
					stripe_customer_id: string | null;
					stripe_sub_id: string | null;
					sub_status: string | null;
					sub_period_end: string | null;
					created_at: string;
				};
				Insert: {
					id: string;
					email: string;
					full_name?: string | null;
					plan?: 'free' | 'pro';
					stripe_customer_id?: string | null;
					stripe_sub_id?: string | null;
					sub_status?: string | null;
					sub_period_end?: string | null;
					created_at?: string;
				};
				Update: {
					id?: string;
					email?: string;
					full_name?: string | null;
					plan?: 'free' | 'pro';
					stripe_customer_id?: string | null;
					stripe_sub_id?: string | null;
					sub_status?: string | null;
					sub_period_end?: string | null;
					created_at?: string;
				};
			};
			classes: {
				Row: {
					id: string;
					teacher_id: string;
					name: string;
					subject: string | null;
					grade_level: string | null;
					mastery_config: MasteryConfig;
					created_at: string;
				};
				Insert: {
					id?: string;
					teacher_id: string;
					name: string;
					subject?: string | null;
					grade_level?: string | null;
					mastery_config?: MasteryConfig;
					created_at?: string;
				};
				Update: {
					id?: string;
					teacher_id?: string;
					name?: string;
					subject?: string | null;
					grade_level?: string | null;
					mastery_config?: MasteryConfig;
					created_at?: string;
				};
			};
			students: {
				Row: {
					id: string;
					class_id: string;
					name: string;
					created_at: string;
				};
				Insert: {
					id?: string;
					class_id: string;
					name: string;
					created_at?: string;
				};
				Update: {
					id?: string;
					class_id?: string;
					name?: string;
					created_at?: string;
				};
			};
			standards: {
				Row: {
					id: string;
					class_id: string;
					name: string;
					description: string | null;
					sort_order: number;
					created_at: string;
				};
				Insert: {
					id?: string;
					class_id: string;
					name: string;
					description?: string | null;
					sort_order?: number;
					created_at?: string;
				};
				Update: {
					id?: string;
					class_id?: string;
					name?: string;
					description?: string | null;
					sort_order?: number;
					created_at?: string;
				};
			};
			scores: {
				Row: {
					id: string;
					student_id: string;
					standard_id: string;
					score: number;
					assessed_at: string;
					created_at: string;
				};
				Insert: {
					id?: string;
					student_id: string;
					standard_id: string;
					score: number;
					assessed_at?: string;
					created_at?: string;
				};
				Update: {
					id?: string;
					student_id?: string;
					standard_id?: string;
					score?: number;
					assessed_at?: string;
					created_at?: string;
				};
			};
		};
		Functions: {
			get_mastery_grid: {
				Args: { p_class_id: string };
				Returns: {
					students: Array<{ id: string; name: string; class_id: string; created_at: string }>;
					standards: Array<{ id: string; name: string; description: string | null; sort_order: number; class_id: string; created_at: string }>;
					scores: Record<string, number>;
				};
			};
		};
	};
}

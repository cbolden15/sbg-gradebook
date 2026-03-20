// Manually written to match @supabase/supabase-js v2 generated type format.
// Replace with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type MasteryConfig = {
	method: 'highest';
	thresholds: { '4': number; '3': number; '2': number; '1': number };
};

export type Database = {
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
				Relationships: [];
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
				Relationships: [
					{
						foreignKeyName: 'classes_teacher_id_fkey';
						columns: ['teacher_id'];
						isOneToOne: false;
						referencedRelation: 'teachers';
						referencedColumns: ['id'];
					}
				];
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
				Relationships: [
					{
						foreignKeyName: 'students_class_id_fkey';
						columns: ['class_id'];
						isOneToOne: false;
						referencedRelation: 'classes';
						referencedColumns: ['id'];
					}
				];
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
				Relationships: [
					{
						foreignKeyName: 'standards_class_id_fkey';
						columns: ['class_id'];
						isOneToOne: false;
						referencedRelation: 'classes';
						referencedColumns: ['id'];
					}
				];
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
				Relationships: [
					{
						foreignKeyName: 'scores_student_id_fkey';
						columns: ['student_id'];
						isOneToOne: false;
						referencedRelation: 'students';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'scores_standard_id_fkey';
						columns: ['standard_id'];
						isOneToOne: false;
						referencedRelation: 'standards';
						referencedColumns: ['id'];
					}
				];
			};
		};
		Views: Record<string, never>;
		Functions: {
			get_mastery_grid: {
				Args: { p_class_id: string };
				Returns: Json;
			};
		};
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
};

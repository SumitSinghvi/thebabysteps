export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          image_url: string | null
          category: string | null
          stock: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          category?: string | null
          stock?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          category?: string | null
          stock?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          status: string
          total_amount: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          status?: string
          total_amount: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          status?: string
          total_amount?: number
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in any]: never
    }
    Functions: {
      [_ in any]: never
    }
    Enums: {
      [_ in any]: never
    }
    CompositeTypes: {
      [_ in any]: never
    }
  }
}

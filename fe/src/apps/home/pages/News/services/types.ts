import type { IBaseFilter } from "@/shared/types";

export interface ITopicArticle {
  id: number;              
  title: string;           
  urlFriendly: string;      
  image: string;            
  summary: string;         
  authorName: string;       
  publishedDate: string;    
  numOfView: number;        
}

export type TFilter = { Query?: object; } & IBaseFilter
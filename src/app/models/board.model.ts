import { Card } from "./card.model";
import { bgColor } from "./color.model";
import { List } from "./list.model";
import { userResponse } from "./user.model";

export interface Board {
    id: string;
    title: string;
    backgroundColor: bgColor;
    creationAt: string;
    updatedAt:string;
    members: userResponse[];
    lists: List[];
    cards: Card[];
  }
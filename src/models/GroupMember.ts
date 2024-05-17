import { User } from "./User";

export interface GroupMember {
    id: string;
    groupId: string;
    userId: string;
    role: number;
    createdAt: string;
    updatedAt: string;
}
export interface GroupMemberMetadata extends GroupMember {
    user: User
}
import { LikeInfo } from "@/types/like.type";
import { Attachment } from "./Attachment";
import { Like } from "./Like";
import { User } from "./User";

export interface Comment {
    id: string;
    postId: string;
    userId: string;
    replyId?: string;
    replyName?: string;
    tagIds?: string[];
    tagNames?: string[];
    content: string;
    parentCommentId?: string;
    createdAt: string;
    updatedAt: string;
}
export interface CommentHasChildren {
    id: string;
    postId: string;
    userId: string;
    replyId?: string;
    replyName?: string;
    tagIds?: string[];
    tagNames?: string[];
    content: string;
    parentCommentId?: string;
    user:User;
    children: CommentHasMetadata[];
    likes?: Like[];
    attachments?: Attachment[];
    createdAt: string;
    updatedAt: string;
}
export interface CommentHasMetadata {
    id: string;
    postId: string;
    userId: string;
    replyId?: string;
    replyName?: string;
    tagIds?: string[];
    tagNames?: string[];
    content: string;
    parentCommentId?: string;
    user: User;
    likes?: LikeInfo;
    attachments?: Attachment[];
    createdAt: string;
    updatedAt: string;
}
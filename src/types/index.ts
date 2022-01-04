export interface UserType {
  id: string;
  userName: string;
}

export interface PostType {
  id: number;
  userId: string;
  title: string;
  story: string;
  track: {
    audiusTrackId: string;
  };
  completedness: number;
  inceptionDate: string;
  inceptionDemo?: string;
  createdAt: string;
  user: UserType;
  comments: CommentType[];
}

export interface CommentType {
  body: string;
  author: UserType;
  post: PostType;
}

export interface LikeType {
  id: string;
  post: PostType;
  liker: UserType;
}

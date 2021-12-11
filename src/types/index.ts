export interface UserType {
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
  inceptionDate: Date;
  createdAt: string;
  user: UserType;
  comments: CommentType[];
}

export interface CommentType {
  body: string;
  author: UserType;
  post: PostType;
}

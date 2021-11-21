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
}

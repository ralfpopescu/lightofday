export type AudiusUserData = {
  album_count: number;
  bio: string;
  cover_photo: {
    "640x": string;
    "2000x": string;
  };
  followee_count: number;
  follower_count: number;
  handle: string;
  id: string;
  is_verified: true;
  location: string;
  name: string;
  playlist_count: number;
  profile_picture: {
    "150x150": string;
    "480x480": string;
    "1000x1000": string;
  };
  repost_count: number;
  track_count: number;
};

export type AudiusTrackData = {
  artwork: {
    "150x150": string;
    "480x480": string;
    "1000x1000": string;
  };
  description: string;
  genre: string;
  id: string;
  mood: string;
  release_date: string;
  repost_count: number;
  favorite_count: number;
  tags: string;
  title: string;
  duration: number;
  user: AudiusUserData;
};

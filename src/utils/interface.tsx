export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export interface MovieData {
  Title: string;
  Poster: string;
  Type: string;
  Year: string;
  imdbID: string;
  isBookmarked: boolean;
  isWatched: boolean;
}

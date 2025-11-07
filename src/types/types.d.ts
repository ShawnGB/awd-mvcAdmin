interface Post {
  id: string;
  title: string;
  image: string;
  author: string;
  createdAt: number;
  teaser: string;
  content: string;
  status: PostStatus;
}

type PostStatus = "published" | "draft" | "archived";

interface PostFields {
  title: string,
  text: string
}

export class Post {
  constructor(public email: string,
              public publicPosts:Array<PostFields>,
              public privatePosts: Array<PostFields>,
              public id?: number) {}
}

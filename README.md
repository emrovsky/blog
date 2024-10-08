[alistair.blog](https://alistair.blog)

# alistair.blog

A basic blogging site that uses Next.js whislt shipping zero client JS!

### I want to use this as a template!

I'm honoured! Feel free to fork the repo and then edit out places that have my name with your name. Then you can delete all of the posts in the `src/posts/<date>` folder and starting writing your own! Remember to import the post in the `src/posts/index.ts` file to register it listed.

#### Creating a new post

Creating a post is fairly simple, you just need to create a new class that extends the abstract class `Post` and implement the members. These are a name, date, a few other properties and cruically, a `render()` method that returns the content of this post.

import type {GetStaticPaths, GetStaticProps, PageConfig} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {posts} from '../posts';

export const config: PageConfig = {
	unstable_runtimeJS: false,
};

type Props = {
	readonly slug: string;
};

export default function PostPage({slug}: Props) {
	const post = posts.find(post => post.slug === slug)!;

	return (
		<div className="space-y-4">
			<Head>
				<title>{post.name}</title>
				<meta name="description" content={post.excerpt} />
				<meta name="keywords" content={post.keywords.join(', ')} />
				<meta name="theme-color" content={post.hidden ? '#ebb305' : '#171717'} />
			</Head>

			{post.hidden && (
				<div className="bg-yellow-500 text-yellow-900 rounded-md py-2 px-4">
					<p>Hey! This post is hidden! Please don't share the link for now...</p>
				</div>
			)}

			<div>
				<Link
					className="text-blue-500 dark:text-neutral-400 hover:text-blue-800 dark:hover:text-neutral-600"
					href="/"
				>
					../
				</Link>
			</div>

			<p>
				<time dateTime={post.date.toISOString()}>{post.date.toDateString()}</time>
			</p>

			<main className="prose prose-hr:border-neutral-200 dark:prose-hr:border-neutral-800 prose-blue prose-img:rounded-md prose-img:w-full dark:prose-invert">
				{post.render()}
			</main>
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
	const slug = params!.slug as string;

	const post = posts.find(post => post.slug === slug);

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			slug,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: posts.map(post => ({params: {slug: post.slug}})),
	fallback: 'blocking',
});

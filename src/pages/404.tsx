import type {PageConfig} from 'next';

export const config: PageConfig = {
	unstable_runtimeJS: false,
};

export default function Page404() {
	return (
		<p>
			<span className="font-bold text-blue-500">404</span> sorry, we couldn't locate that page...
		</p>
	);
}

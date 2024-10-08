import SyntaxHighlighter from 'react-syntax-highlighter';
import dark from 'react-syntax-highlighter/dist/cjs/styles/hljs/darcula';
import light from 'react-syntax-highlighter/dist/cjs/styles/hljs/lightfair';

export function Highlighter({
	children,
	language = 'typescript',
}: {
	readonly children: string;
	readonly language?: string;
}) {
	return (
		<div className="no-pre-margin">
			<div className="hidden dark:block">
				<SyntaxHighlighter language={language} style={dark}>
					{children}
				</SyntaxHighlighter>
			</div>

			<div className="dark:hidden border border-neutral-100 rounded-md">
				<SyntaxHighlighter language={language} style={light}>
					{children}
				</SyntaxHighlighter>
			</div>
		</div>
	);
}

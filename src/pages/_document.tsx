import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class BlogDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;500&display=swap"
						rel="stylesheet"
					/>
				</Head>

				<body>
					<Main />
					<NextScript />

					<script async defer src="https://lab.alistair.cloud/latest.js" />
					<noscript>
						<img
							src="https://lab.alistair.cloud/noscript.gif"
							alt=""
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</noscript>
				</body>
			</Html>
		);
	}
}

export abstract class Post {
	public abstract readonly name: string;
	public abstract readonly slug: string;
	public abstract readonly date: Date;
	public abstract readonly hidden: boolean;
	public abstract readonly excerpt: string;
	public abstract readonly keywords: string[];

	public toJSON() {
		return {
			name: this.name,
			slug: this.slug,
			date: this.date.toISOString(),
			hidden: this.hidden,
			excerpt: this.excerpt,
			keywords: this.keywords,
		};
	}

	public abstract render(): JSX.Element;
}

import type {ComponentProps} from 'react';

export function ExternalLink(props: ComponentProps<'a'>) {
	return <a {...props} target="_blank" rel="noopener noreferrer" />;
}

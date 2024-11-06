export function containOrAfter(event: Event, node: Node): boolean {
	return node.contains(event.target as Node);
}

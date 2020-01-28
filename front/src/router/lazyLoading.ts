export const lazyLoading = (name: string) => () =>
	import(`@/pages/${name}.vue`)

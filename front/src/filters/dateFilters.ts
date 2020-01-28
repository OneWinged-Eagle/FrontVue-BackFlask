export const dateFilters = {
	formatEpoch(value: string) {
		return new Date(value).toUTCString()
	}
}

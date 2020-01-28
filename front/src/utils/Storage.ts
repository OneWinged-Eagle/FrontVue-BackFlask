export class Storage {
	static set(key: string, data: any) {
		localStorage.setItem(key, JSON.stringify(data))
	}

	static get<T>(key: string): T | null {
		return JSON.parse(localStorage.getItem(key) || "null")
	}

	static remove(key: string) {
		localStorage.removeItem(key)
	}

	static clear() {
		localStorage.clear()
	}
}

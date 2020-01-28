import { Role } from "@/api/models/User"

export const utilsFilters = {
	roleIcon(value: string) {
		switch (value) {
			case Role.user:
				return "account"
			case Role.admin:
				return "account-key"
			default:
				return "account-question"
		}
	}
}

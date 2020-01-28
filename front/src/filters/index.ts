import Vue from "vue"

import { dateFilters } from "./dateFilters"
import { utilsFilters } from "./utilsFilters"

Vue.filter("formatEpoch", dateFilters.formatEpoch)

Vue.filter("roleIcon", utilsFilters.roleIcon)

import Vue from "vue"

enum Mode {
	"multi-line" = "multi-line",
	vertical = "vertical"
}

enum X {
	right = "right",
	left = "left"
}

enum Y {
	top = "top",
	bottom = "bottom"
}

interface SnackbarProps {
	color?: string
	mode?: Mode
	text: string
	timeout?: number
	visible?: boolean
	x?: X
	y?: Y
}

const state = Vue.observable<SnackbarProps>({
	color: "success",
	mode: Mode["multi-line"],
	text: "",
	timeout: 6000,
	visible: false,
	x: X.right,
	y: Y.top
})

const HIDE = "HIDE"
const SHOW = "SHOW"

const mutations = {
	[HIDE]() {
		state.visible = false
	},

	[SHOW]({ color = "success", mode = Mode["multi-line"], text, timeout = 6000, x = X.right, y = Y.top }: SnackbarProps) {
		state.color = color
		state.mode = mode
		state.text = text
		state.timeout = timeout
		state.visible = true
		state.x = x
		state.y = y
	}
}

const actions = {
	hide() {
		mutations[HIDE]()
	},

	show(props: SnackbarProps) {
		mutations[HIDE]()
		setTimeout(() => {
			mutations[SHOW](props)
		}, 250)
	}
}

export { state as snackbarState, actions as snackbarActions }

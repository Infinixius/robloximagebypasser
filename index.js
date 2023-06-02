import { setDebugText, commaSeparate, range, range2, randInt, chunkArray } from "./utility.js"
import { divideIntoRectangles, reassembleImage } from "./rect.js"
import { generateFrame, header, footer } from "./export.js"

// define our variables

const original_canvas = document.querySelector("#original")
const original_ctx = original_canvas.getContext("2d")

const blocks_canvas = document.querySelector("#blocks")
const blocks_ctx = blocks_canvas.getContext("2d")

const final_canvas = document.querySelector("#final")
const final_ctx = final_canvas.getContext("2d")

const threshold = document.querySelector("#threshold")
const fileupload = document.querySelector(`input[type="file"]`)
const extreme = document.querySelector("#extreme")
const error = document.querySelector("#error")

// the init function is called when an image is uploaded

async function init() {
	original_canvas.width = image.width
	original_canvas.height = image.height

	blocks_canvas.width = image.width
	blocks_canvas.height = image.height

	final_canvas.width = image.width
	final_canvas.height = image.height

	setDebugText("size", `${image.width}x${image.height}`)
	setDebugText("pixels", commaSeparate(image.width * image.height))

	for (const x of range(image.width)) {
		for (const y of range(image.height)) {
			var pixel = image.getPixelXY(x, y)

			original_ctx.fillStyle = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] ?? 255})`
			original_ctx.fillRect(x, y, 1, 1)
		}	

	}
}

// this function isn't used anymore but i didnt wanna get rid of it
function splitImage() {
	var colors = {}

	for (const x of range(image.width)) {
		for (const y of range(image.height)) {
			var pixel = image.getPixelXY(x, y)
			var color = `${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] ?? 255}`

			if (colors[color] == undefined) {
				colors[color] = []
			}

			colors[color].push([x, y])
		}	

	}

	return colors
}

// get a 2d array of pixels from a rectangular area
function getPixels(x1, y1, x2, y2) {
	var pixels = []

	for (const x of range2(x1, x2)) {
		var row = []
		for (const y of range2(y1, y2)) {
			row.push(image.getPixelXY(x, y))
		}
		pixels.push(row)
	}

	return pixels
}

// the main script, runs every time the threshold is changed
function run() {
	var startTime = Date.now()

	var pixels = getPixels(0, 0, image.width, image.height)

	var rect = divideIntoRectangles(pixels, threshold.value)

	var reassembled = reassembleImage(rect, image.width, image.height)

	for (const x of range(image.width)) {
		for (const y of range(image.height)) {
			var pixel = reassembled[x][y]

			blocks_ctx.fillStyle = `hsl(${pixel[0]}, 100%, 50%)`
			blocks_ctx.fillRect(x, y, 1, 1)

			final_ctx.fillStyle = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3] ?? 255})`
			final_ctx.fillRect(x, y, 1, 1)
		}
	}

	setDebugText("blocks", commaSeparate(rect.length))
	setDebugText("time", `${Date.now() - startTime}ms`)
	setDebugText("improvement", `${Math.round((1 - (rect.length / (image.width * image.height))) * 100)}%`)

	return rect
}

// exports the string used in ROBLOX (old version)
function exportToROBLOXOLD(rect) {
	var output = `OUTPUTDATA1.0;WIDTH:${image.width};HEIGHT:${image.height};NAME:${fileupload.files[0].name};`

	for (const block of rect) {
		output += block.rect.x + ","
		output += block.rect.y + ","

		output += block.rect.width + ","
		output += block.rect.height + ","

		output += block.color[0] + ","
		output += block.color[1] + ","
		output += block.color[2] + ","
		output += block.color[3] ?? 255

		output += ";"
	}

	output += "END"

	return output
}

function exportToROBLOX(rect) {
	var output = header

	for (const block of rect) {
		output += generateFrame(
			block.rect.x,
			block.rect.y,

			block.rect.width,
			block.rect.height,

			image.width,
			image.height,

			0.05,

			block.color[0],
			block.color[1],
			block.color[2],
			block.color[3] ?? 255
		)
	}

	output += footer

	return output
}

// begin the actual script

var lastURL
fileupload.addEventListener("change", async (event) => {
	const file = event.target.files[0]

	if (lastURL) URL.revokeObjectURL(lastURL)
	lastURL = URL.createObjectURL(file)

	error.innerHTML = ""

	// theres a really fucking weird bug that happens when
	// you try to upload really specific images. the error
	// message says "Error: Unsupported filter: undefined"
	// and i dont know how to fix it!!!!!!!!!!!!!!!!!!!!!!
	window.image = await IJS.Image.load(lastURL)
		.catch(err => {
			error.innerHTML = `catastrophic error: "${err}"<br> please try another image!`

			throw err
		})

	init()

	var rect = run()

	threshold.addEventListener("input", () => {
		setDebugText("threshold", threshold.value)
		run()
	})
})

document.querySelector("#export").addEventListener("click", () => {
	var output = exportToROBLOX(run())
	
	var file = new Blob([output], { type: "text/plain" })

	var a = document.createElement("a")
	a.download = `${fileupload.files[0].name}.rbxmx`
	a.href = window.URL.createObjectURL(file)
	a.click()
	a.remove()
})

// allows you to use crazy thresholds like 100000
extreme.addEventListener("click", () => {
	if (extreme.checked == true) {
		threshold.max = 100000
	} else {
		threshold.max = 1000
	}
})
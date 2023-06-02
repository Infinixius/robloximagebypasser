// this is where the magic happens
export function divideIntoRectangles(image, threshold) {
	const rectangles = []

	function splitRectangle(rect) {
		const { x, y, width, height } = rect

		// calculate average color within the rectangle
		let sumR = 0
		let sumG = 0
		let sumB = 0
		let sumA = 0
		for (let i = x; i < x + width; i++) {
			for (let j = y; j < y + height; j++) {
				sumR += image[i][j][0]
				sumG += image[i][j][1]
				sumB += image[i][j][2]
				sumA += image[i][j][3]
			}
		}
		const averageColor = [
			Math.floor(sumR / (width * height)),
			Math.floor(sumG / (width * height)),
			Math.floor(sumB / (width * height)),
			Math.floor(sumA / (width * height)),
		]

		// if difference in colors is greater than threshold, split the rectangle
		let colorDiff = 0
		for (let i = x; i < x + width; i++) {
			for (let j = y; j < y + height; j++) {
				const diffR = Math.abs(image[i][j][0] - averageColor[0])
				const diffG = Math.abs(image[i][j][1] - averageColor[1])
				const diffB = Math.abs(image[i][j][2] - averageColor[2])
				const diffA = Math.abs(image[i][j][3] - averageColor[3])
				colorDiff += Math.max(diffR, diffG, diffB, diffA)
			}
		}

		if (colorDiff > threshold) {
			// split the rectangle into four equal sub-rectangles
			const halfWidth = Math.floor(width / 2)
			const halfHeight = Math.floor(height / 2)

			const rect1 = { x, y, width: halfWidth, height: halfHeight }
			const rect2 = {
				x: x + halfWidth,
				y,
				width: halfWidth,
				height: halfHeight,
			}
			const rect3 = {
				x,
				y: y + halfHeight,
				width: halfWidth,
				height: halfHeight,
			}
			const rect4 = {
				x: x + halfWidth,
				y: y + halfHeight,
				width: halfWidth,
				height: halfHeight,
			}

			// recursively split the sub-rectangles
			splitRectangle(rect1)
			splitRectangle(rect2)
			splitRectangle(rect3)
			splitRectangle(rect4)
		} else {
			// add the rectangle coordinates and color to the list of final rectangles
			rectangles.push({ rect, color: averageColor })
		}
	}

	// start with the entire image as a single rectangle
	const initialRectangle = {
		x: 0,
		y: 0,
		width: image.length,
		height: image[0].length,
	}
	splitRectangle(initialRectangle)

	return rectangles
}

export function reassembleImage(rectangles, width, height) {
	const image = []
  
	// initialize the image array with empty pixels
	for (let i = 0; i < width; i++) {
		image[i] = []
		for (let j = 0; j < height; j++) {
			image[i][j] = [0, 0, 0]
		}
	}
  
	// fill in the image array with colors from the rectangles
	for (const { rect, color } of rectangles) {
		const { x, y, width, height } = rect
	
		// adjust the rectangle coordinates and dimensions
		const adjustedX = x > 0 ? x - 1 : x
		const adjustedY = y > 0 ? y - 1 : y
		const adjustedWidth = x + width < width ? width + 1 : width
		const adjustedHeight = y + height < height ? height + 1 : height
	
		// fill in the adjusted rectangle with the color
		for (let i = adjustedX; i < adjustedX + adjustedWidth; i++) {
			for (let j = adjustedY; j < adjustedY + adjustedHeight; j++) {
				image[i][j] = color
			}
		}
	}
  
	return image
  }
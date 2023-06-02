export function setDebugText(id, text) {
	document.querySelector(`#debug_${id}`).innerText = text
}

export function range(amount) {
	var range = []
	for (var i = 0; i < amount; i++) {
		range.push(i)
	}
	return range
}

export function range2(start, amount) {
	var range = []
	for (var i = start; i < amount; i++) {
		range.push(i)
	}
	return range
}

export function chunkArray(arr, size) {
	var chunks = []
	for (var i = 0; i < arr.length; i += size) {
		chunks.push(arr.slice(i, i + size))
	}
	return chunks
}

export function commaSeparate(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function getFixedPixelArray(width, height, data) {
	var pixels = []

	for (const x of range(width)) {
		for (const y of range(height)) {
			var pixel = data.slice((x + y * width) * 4, (x + y * width) * 4 + 4)

			pixels.push(pixel)
		}
	}

	return pixels
}

export function getColorDifference(r, g, b, r2, g2, b2) {
	let color1 = new Color(`rgb(${r}, ${g}, ${b})`)
	let color2 = new Color(`rgb(${r2}, ${g2}, ${b2})`)

	return color1.deltaE2000(color2)
}

const LAB_FT = Math.pow(6 / 29, 3);

export function RGBtoXYZ(r, g, b) {
	r = r / 255;
	g = g / 255;
	b = b / 255;
	
	// Assume sRGB
	r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
	g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
	b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);

	const x = (r * 0.4124564) + (g * 0.3575761) + (b * 0.1804375);
	const y = (r * 0.2126729) + (g * 0.7151522) + (b * 0.072175);
	const z = (r * 0.0193339) + (g * 0.119192) + (b * 0.9503041);

	return [x * 100, y * 100, z * 100];
}

export function RGBtoLAB(r, g, b) {
	const xyz = RGBtoXYZ(r, g, b)
	let x = xyz[0];
	let y = xyz[1];
	let z = xyz[2];

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > LAB_FT ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
	y = y > LAB_FT ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
	z = z > LAB_FT ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);

	var l = (116 * y) - 16;
	var a = 500 * (x - y);
	var b2 = 200 * (y - z);

	return [l, a, b2];
}

export function RGBtoHSV(r, g, b) {
	let rdif;
	let gdif;
	let bdif;
	let h;
	let s;

	r = r / 255;
	g = g / 255;
	b = b / 255;
	const v = Math.max(r, g, b);
	const diff = v - Math.min(r, g, b);
	const diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = 0;
		s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}

		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	]
}

export function HSVtoRGB(h, s, v) {
	h = h / 60;
	s = s / 100;
	v = v / 100;
	const hi = Math.floor(h) % 6;

	const f = h - Math.floor(h);
	const p = 255 * v * (1 - s);
	const q = 255 * v * (1 - (s * f));
	const t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
}

export function randInt(min, max) {
	return Math.floor(Math.random() * (max - min - 1) + min)
}
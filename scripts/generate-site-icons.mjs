import { readFile, writeFile } from "node:fs/promises"
import sharp from "sharp"

// Package the site's vector monogram for browsers and search icon crawlers.
const vector = await readFile(new URL("../public/icon.svg", import.meta.url))
const small = await sharp(vector).resize(32, 32).png().toBuffer()
await writeFile(new URL("../public/icon-light-32x32.png", import.meta.url), small)
await writeFile(new URL("../public/icon-dark-32x32.png", import.meta.url), small)
const apple = await sharp(vector).resize(180, 180).flatten({ background: "#2D6A4F" }).png().toBuffer()
await writeFile(new URL("../public/apple-icon.png", import.meta.url), apple)

// Use standard 32-bit BMP frames rather than relying on PNG-in-ICO support.
const sizes = [16, 32, 48, 64]
const directory = Buffer.alloc(6 + sizes.length * 16)
directory.writeUInt16LE(1, 2)
directory.writeUInt16LE(sizes.length, 4)
const frames = []
let offset = directory.length
for (const [index, size] of sizes.entries()) {
  const rgba = await sharp(vector).resize(size, size).ensureAlpha().raw().toBuffer()
  const maskStride = Math.ceil(size / 32) * 4
  const pixelsLength = size * size * 4
  const frame = Buffer.alloc(40 + pixelsLength + maskStride * size)
  frame.writeUInt32LE(40, 0)
  frame.writeInt32LE(size, 4)
  frame.writeInt32LE(size * 2, 8)
  frame.writeUInt16LE(1, 12)
  frame.writeUInt16LE(32, 14)
  frame.writeUInt32LE(pixelsLength + maskStride * size, 20)
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const source = (y * size + x) * 4
    const row = size - 1 - y
    const target = 40 + (row * size + x) * 4
    frame[target] = rgba[source + 2]
    frame[target + 1] = rgba[source + 1]
    frame[target + 2] = rgba[source]
    frame[target + 3] = rgba[source + 3]
    if (rgba[source + 3] < 128) frame[40 + pixelsLength + row * maskStride + Math.floor(x / 8)] |= 0x80 >> (x % 8)
  }
  const entry = 6 + index * 16
  directory[entry] = size
  directory[entry + 1] = size
  directory.writeUInt16LE(1, entry + 4)
  directory.writeUInt16LE(32, entry + 6)
  directory.writeUInt32LE(frame.length, entry + 8)
  directory.writeUInt32LE(offset, entry + 12)
  offset += frame.length
  frames.push(frame)
}
await writeFile(new URL("../app/favicon.ico", import.meta.url), Buffer.concat([directory, ...frames]))
console.log("Generated SOILAB SVG/PNG/ICO icons (16, 32, 48, 64, 180px).")

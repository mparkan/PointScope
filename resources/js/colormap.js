/**
* PointScope
* Last update: 04 Aug 2014
*
* Licensed under the GPL Version 3 license.
* http://www.gnu.org/licenses/gpl-3.0.html
*
*/

// TO DO: convert RGB values to hexadecimal

var colormap = {
'jet' : [
	[0.000000, 0.000000, 0.515625],
	[0.000000, 0.000000, 0.531250],
	[0.000000, 0.000000, 0.546875],
	[0.000000, 0.000000, 0.562500],
	[0.000000, 0.000000, 0.578125],
	[0.000000, 0.000000, 0.593750],
	[0.000000, 0.000000, 0.609375],
	[0.000000, 0.000000, 0.625000],
	[0.000000, 0.000000, 0.640625],
	[0.000000, 0.000000, 0.656250],
	[0.000000, 0.000000, 0.671875],
	[0.000000, 0.000000, 0.687500],
	[0.000000, 0.000000, 0.703125],
	[0.000000, 0.000000, 0.718750],
	[0.000000, 0.000000, 0.734375],
	[0.000000, 0.000000, 0.750000],
	[0.000000, 0.000000, 0.765625],
	[0.000000, 0.000000, 0.781250],
	[0.000000, 0.000000, 0.796875],
	[0.000000, 0.000000, 0.812500],
	[0.000000, 0.000000, 0.828125],
	[0.000000, 0.000000, 0.843750],
	[0.000000, 0.000000, 0.859375],
	[0.000000, 0.000000, 0.875000],
	[0.000000, 0.000000, 0.890625],
	[0.000000, 0.000000, 0.906250],
	[0.000000, 0.000000, 0.921875],
	[0.000000, 0.000000, 0.937500],
	[0.000000, 0.000000, 0.953125],
	[0.000000, 0.000000, 0.968750],
	[0.000000, 0.000000, 0.984375],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.015625, 1.000000],
	[0.000000, 0.031250, 1.000000],
	[0.000000, 0.046875, 1.000000],
	[0.000000, 0.062500, 1.000000],
	[0.000000, 0.078125, 1.000000],
	[0.000000, 0.093750, 1.000000],
	[0.000000, 0.109375, 1.000000],
	[0.000000, 0.125000, 1.000000],
	[0.000000, 0.140625, 1.000000],
	[0.000000, 0.156250, 1.000000],
	[0.000000, 0.171875, 1.000000],
	[0.000000, 0.187500, 1.000000],
	[0.000000, 0.203125, 1.000000],
	[0.000000, 0.218750, 1.000000],
	[0.000000, 0.234375, 1.000000],
	[0.000000, 0.250000, 1.000000],
	[0.000000, 0.265625, 1.000000],
	[0.000000, 0.281250, 1.000000],
	[0.000000, 0.296875, 1.000000],
	[0.000000, 0.312500, 1.000000],
	[0.000000, 0.328125, 1.000000],
	[0.000000, 0.343750, 1.000000],
	[0.000000, 0.359375, 1.000000],
	[0.000000, 0.375000, 1.000000],
	[0.000000, 0.390625, 1.000000],
	[0.000000, 0.406250, 1.000000],
	[0.000000, 0.421875, 1.000000],
	[0.000000, 0.437500, 1.000000],
	[0.000000, 0.453125, 1.000000],
	[0.000000, 0.468750, 1.000000],
	[0.000000, 0.484375, 1.000000],
	[0.000000, 0.500000, 1.000000],
	[0.000000, 0.515625, 1.000000],
	[0.000000, 0.531250, 1.000000],
	[0.000000, 0.546875, 1.000000],
	[0.000000, 0.562500, 1.000000],
	[0.000000, 0.578125, 1.000000],
	[0.000000, 0.593750, 1.000000],
	[0.000000, 0.609375, 1.000000],
	[0.000000, 0.625000, 1.000000],
	[0.000000, 0.640625, 1.000000],
	[0.000000, 0.656250, 1.000000],
	[0.000000, 0.671875, 1.000000],
	[0.000000, 0.687500, 1.000000],
	[0.000000, 0.703125, 1.000000],
	[0.000000, 0.718750, 1.000000],
	[0.000000, 0.734375, 1.000000],
	[0.000000, 0.750000, 1.000000],
	[0.000000, 0.765625, 1.000000],
	[0.000000, 0.781250, 1.000000],
	[0.000000, 0.796875, 1.000000],
	[0.000000, 0.812500, 1.000000],
	[0.000000, 0.828125, 1.000000],
	[0.000000, 0.843750, 1.000000],
	[0.000000, 0.859375, 1.000000],
	[0.000000, 0.875000, 1.000000],
	[0.000000, 0.890625, 1.000000],
	[0.000000, 0.906250, 1.000000],
	[0.000000, 0.921875, 1.000000],
	[0.000000, 0.937500, 1.000000],
	[0.000000, 0.953125, 1.000000],
	[0.000000, 0.968750, 1.000000],
	[0.000000, 0.984375, 1.000000],
	[0.000000, 1.000000, 1.000000],
	[0.015625, 1.000000, 0.984375],
	[0.031250, 1.000000, 0.968750],
	[0.046875, 1.000000, 0.953125],
	[0.062500, 1.000000, 0.937500],
	[0.078125, 1.000000, 0.921875],
	[0.093750, 1.000000, 0.906250],
	[0.109375, 1.000000, 0.890625],
	[0.125000, 1.000000, 0.875000],
	[0.140625, 1.000000, 0.859375],
	[0.156250, 1.000000, 0.843750],
	[0.171875, 1.000000, 0.828125],
	[0.187500, 1.000000, 0.812500],
	[0.203125, 1.000000, 0.796875],
	[0.218750, 1.000000, 0.781250],
	[0.234375, 1.000000, 0.765625],
	[0.250000, 1.000000, 0.750000],
	[0.265625, 1.000000, 0.734375],
	[0.281250, 1.000000, 0.718750],
	[0.296875, 1.000000, 0.703125],
	[0.312500, 1.000000, 0.687500],
	[0.328125, 1.000000, 0.671875],
	[0.343750, 1.000000, 0.656250],
	[0.359375, 1.000000, 0.640625],
	[0.375000, 1.000000, 0.625000],
	[0.390625, 1.000000, 0.609375],
	[0.406250, 1.000000, 0.593750],
	[0.421875, 1.000000, 0.578125],
	[0.437500, 1.000000, 0.562500],
	[0.453125, 1.000000, 0.546875],
	[0.468750, 1.000000, 0.531250],
	[0.484375, 1.000000, 0.515625],
	[0.500000, 1.000000, 0.500000],
	[0.515625, 1.000000, 0.484375],
	[0.531250, 1.000000, 0.468750],
	[0.546875, 1.000000, 0.453125],
	[0.562500, 1.000000, 0.437500],
	[0.578125, 1.000000, 0.421875],
	[0.593750, 1.000000, 0.406250],
	[0.609375, 1.000000, 0.390625],
	[0.625000, 1.000000, 0.375000],
	[0.640625, 1.000000, 0.359375],
	[0.656250, 1.000000, 0.343750],
	[0.671875, 1.000000, 0.328125],
	[0.687500, 1.000000, 0.312500],
	[0.703125, 1.000000, 0.296875],
	[0.718750, 1.000000, 0.281250],
	[0.734375, 1.000000, 0.265625],
	[0.750000, 1.000000, 0.250000],
	[0.765625, 1.000000, 0.234375],
	[0.781250, 1.000000, 0.218750],
	[0.796875, 1.000000, 0.203125],
	[0.812500, 1.000000, 0.187500],
	[0.828125, 1.000000, 0.171875],
	[0.843750, 1.000000, 0.156250],
	[0.859375, 1.000000, 0.140625],
	[0.875000, 1.000000, 0.125000],
	[0.890625, 1.000000, 0.109375],
	[0.906250, 1.000000, 0.093750],
	[0.921875, 1.000000, 0.078125],
	[0.937500, 1.000000, 0.062500],
	[0.953125, 1.000000, 0.046875],
	[0.968750, 1.000000, 0.031250],
	[0.984375, 1.000000, 0.015625],
	[1.000000, 1.000000, 0.000000],
	[1.000000, 0.984375, 0.000000],
	[1.000000, 0.968750, 0.000000],
	[1.000000, 0.953125, 0.000000],
	[1.000000, 0.937500, 0.000000],
	[1.000000, 0.921875, 0.000000],
	[1.000000, 0.906250, 0.000000],
	[1.000000, 0.890625, 0.000000],
	[1.000000, 0.875000, 0.000000],
	[1.000000, 0.859375, 0.000000],
	[1.000000, 0.843750, 0.000000],
	[1.000000, 0.828125, 0.000000],
	[1.000000, 0.812500, 0.000000],
	[1.000000, 0.796875, 0.000000],
	[1.000000, 0.781250, 0.000000],
	[1.000000, 0.765625, 0.000000],
	[1.000000, 0.750000, 0.000000],
	[1.000000, 0.734375, 0.000000],
	[1.000000, 0.718750, 0.000000],
	[1.000000, 0.703125, 0.000000],
	[1.000000, 0.687500, 0.000000],
	[1.000000, 0.671875, 0.000000],
	[1.000000, 0.656250, 0.000000],
	[1.000000, 0.640625, 0.000000],
	[1.000000, 0.625000, 0.000000],
	[1.000000, 0.609375, 0.000000],
	[1.000000, 0.593750, 0.000000],
	[1.000000, 0.578125, 0.000000],
	[1.000000, 0.562500, 0.000000],
	[1.000000, 0.546875, 0.000000],
	[1.000000, 0.531250, 0.000000],
	[1.000000, 0.515625, 0.000000],
	[1.000000, 0.500000, 0.000000],
	[1.000000, 0.484375, 0.000000],
	[1.000000, 0.468750, 0.000000],
	[1.000000, 0.453125, 0.000000],
	[1.000000, 0.437500, 0.000000],
	[1.000000, 0.421875, 0.000000],
	[1.000000, 0.406250, 0.000000],
	[1.000000, 0.390625, 0.000000],
	[1.000000, 0.375000, 0.000000],
	[1.000000, 0.359375, 0.000000],
	[1.000000, 0.343750, 0.000000],
	[1.000000, 0.328125, 0.000000],
	[1.000000, 0.312500, 0.000000],
	[1.000000, 0.296875, 0.000000],
	[1.000000, 0.281250, 0.000000],
	[1.000000, 0.265625, 0.000000],
	[1.000000, 0.250000, 0.000000],
	[1.000000, 0.234375, 0.000000],
	[1.000000, 0.218750, 0.000000],
	[1.000000, 0.203125, 0.000000],
	[1.000000, 0.187500, 0.000000],
	[1.000000, 0.171875, 0.000000],
	[1.000000, 0.156250, 0.000000],
	[1.000000, 0.140625, 0.000000],
	[1.000000, 0.125000, 0.000000],
	[1.000000, 0.109375, 0.000000],
	[1.000000, 0.093750, 0.000000],
	[1.000000, 0.078125, 0.000000],
	[1.000000, 0.062500, 0.000000],
	[1.000000, 0.046875, 0.000000],
	[1.000000, 0.031250, 0.000000],
	[1.000000, 0.015625, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.984375, 0.000000, 0.000000],
	[0.968750, 0.000000, 0.000000],
	[0.953125, 0.000000, 0.000000],
	[0.937500, 0.000000, 0.000000],
	[0.921875, 0.000000, 0.000000],
	[0.906250, 0.000000, 0.000000],
	[0.890625, 0.000000, 0.000000],
	[0.875000, 0.000000, 0.000000],
	[0.859375, 0.000000, 0.000000],
	[0.843750, 0.000000, 0.000000],
	[0.828125, 0.000000, 0.000000],
	[0.812500, 0.000000, 0.000000],
	[0.796875, 0.000000, 0.000000],
	[0.781250, 0.000000, 0.000000],
	[0.765625, 0.000000, 0.000000],
	[0.750000, 0.000000, 0.000000],
	[0.734375, 0.000000, 0.000000],
	[0.718750, 0.000000, 0.000000],
	[0.703125, 0.000000, 0.000000],
	[0.687500, 0.000000, 0.000000],
	[0.671875, 0.000000, 0.000000],
	[0.656250, 0.000000, 0.000000],
	[0.640625, 0.000000, 0.000000],
	[0.625000, 0.000000, 0.000000],
	[0.609375, 0.000000, 0.000000],
	[0.593750, 0.000000, 0.000000],
	[0.578125, 0.000000, 0.000000],
	[0.562500, 0.000000, 0.000000],
	[0.546875, 0.000000, 0.000000],
	[0.531250, 0.000000, 0.000000],
	[0.515625, 0.000000, 0.000000],
	[0.500000, 0.000000, 0.000000]
],

'classification' : [
	[1.0000, 0.0000, 0.0000], // 0 Created, never classified, [1.0000, 00000, 0.0000]
	[0.8627, 0.0784, 0.2353], // 1 Unclassified, [0.8627    0.0784    0.2353]
	[1.0000, 1.0000, 0.7020], // 2 Ground [1.0000, 1.0000, 0.7020]
	[0.7020, 0.8706, 0.4118], // 3 Low Vegetation, [0.7020, 0.8706, 0.4118]
	[0.8000, 0.9216, 0.7725], // 4 Medium Vegetation [0.8000, 0.9216, 0.7725]
	[0.5529, 0.8275, 0.7804], // 5 High Vegetation [0.5529, 0.8275, 0.7804]
	[0.8510, 0.8510, 0.8510], // 6 Building [0.8510, 0.8510, 0.8510]
	[1.0000, 0.6471, 0.0000], // 7 Low Point (noise) 
	[1.0000, 1.0000, 1.0000], // 8 Model Key-point (mass point) 
	[0.6510, 0.8078, 0.8902], // 9 Water [0.6510, 0.8078, 0.8902]
	[0.7294, 0.3333, 0.8275], // 10 Reserved for ASPRS Definition 
	[0.0000, 0.0000, 0.0000], // 11 Reserved for ASPRS Definition 
	[1.0000, 0.5490, 0.0000], // 12 Overlap Points 
	[1.0000, 0.8941, 0.8824], // 13-255 Reserved for ASPRS Definition 
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
	[0.750000, 0.000000, 0.750000],
	[0.750000, 0.750000, 0.000000],
	[0.250000, 0.250000, 0.250000],
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.000000, 0.750000, 0.750000],
],

'eight' : [
	[0.000000, 0.000000, 1.000000],
	[0.000000, 0.500000, 1.000000],
	[0.000000, 1.000000, 1.000000],
	[0.500000, 1.000000, 0.500000],
	[1.000000, 1.000000, 0.000000],
	[1.000000, 0.500000, 0.000000],
	[1.000000, 0.000000, 0.000000],
	[0.500000, 0.000000, 0.000000],
],

'bin' : [
	[0.5294, 0.8078, 0.9803],
	[1.0000, 0.8431, 0.0000]
	]

}
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const INITIAL_PRODUCTS = [
  // CATEGORY 1: Solar Inverters
  {
    id: 'inv-exide-3k-1ph',
    name: 'Exide Aditya GTI 3kW 1PH',
    category: 'Inverters',
    brand: 'Exide',
    price: 34500.00,
    rating: 4.6,
    reviewsCount: 15,
    image: '/assets/inverter-exide.png',
    isTopItem: false,
    specs: {
      'Brand': 'Exide',
      'Capacity': '3kW',
      'Phase': '1 Phase',
      'Type': 'Grid Tie / On-grid',
      'Efficiency': '97.2%',
      'Warranty': '5 Years'
    },
    description: 'The Exide Aditya GTI 3kW is a high-performance single-phase grid-tie solar inverter. Engineered for efficiency and reliability in residential rooftop systems.'
  },
  {
    id: 'inv-fox-3.3k',
    name: 'FOX ESS 3.3kW 1PH MPPT Inverter',
    category: 'Inverters',
    brand: 'Fox ESS',
    price: 42800.00,
    rating: 4.8,
    reviewsCount: 22,
    image: '/assets/inverter-fox.png',
    isTopItem: true,
    specs: {
      'Brand': 'Fox ESS',
      'Capacity': '3.3kW',
      'Phase': '1 Phase',
      'Type': 'Grid Tie / On-grid',
      'Efficiency': '97.8%',
      'Warranty': '5 Years'
    },
    description: 'Fox ESS 3.3kW single-phase grid-tie inverter featuring advanced dual MPPT tracking. Designed to maximize harvest from shaded panels.'
  },
  {
    id: 'inv-microtek-3.3k',
    name: 'Microtek Grid Tie Inverter 3.3kW',
    category: 'Inverters',
    brand: 'Microtek',
    price: 35500.00,
    rating: 4.5,
    reviewsCount: 18,
    image: '/assets/inverter-microtek.png',
    isTopItem: false,
    specs: {
      'Brand': 'Microtek',
      'Capacity': '3.3kW',
      'Phase': '1 Phase',
      'Type': 'Grid Tie / On-grid',
      'Efficiency': '97.3%',
      'Warranty': '5 Years'
    },
    description: 'Microtek\'s billing-grade 3.3kW single-phase grid-tied inverter. Clean sine-wave output with IP65 dust and moisture defense.'
  },
  {
    id: 'inv-exide-5k-1ph',
    name: 'Exide Aditya GTI 5kW 1PH',
    category: 'Inverters',
    brand: 'Exide',
    price: 48000.00,
    rating: 4.7,
    reviewsCount: 24,
    image: '/assets/inverter-exide.png',
    isTopItem: false,
    specs: {
      'Brand': 'Exide',
      'Capacity': '5kW',
      'Phase': '1 Phase',
      'Type': 'Grid Tie / On-grid',
      'Efficiency': '97.5%',
      'Warranty': '5 Years'
    },
    description: 'Exide Aditya GTI 5kW single-phase inverter is highly responsive, optimizing mid-sized solar rooftop generation for net metering benefits.'
  },
  {
    id: 'inv-exide-8k',
    name: 'Exide 8kW Hybrid Inverter',
    category: 'Inverters',
    brand: 'Exide',
    price: 145000.00,
    rating: 4.9,
    reviewsCount: 11,
    image: '/assets/inverter-exide.png',
    isTopItem: true,
    specs: {
      'Brand': 'Exide',
      'Capacity': '8kW',
      'Phase': '3 Phase',
      'Type': 'Hybrid',
      'Efficiency': '98.0%',
      'Warranty': '7 Years'
    },
    description: 'High-end Exide 8kW 3-phase hybrid inverter with dual MPPT. Designed for off-grid battery backup support and intelligent load sharing.'
  },
  {
    id: 'inv-deye-3k-48v-hyb',
    name: 'Deye 3kW 48V 1PH Hybrid Inverter',
    category: 'Inverters',
    brand: 'Deye',
    price: 78500.00,
    rating: 4.8,
    reviewsCount: 31,
    image: '/assets/inverter-deye.png',
    isTopItem: true,
    specs: {
      'Brand': 'Deye',
      'Capacity': '3kW',
      'Phase': '1 Phase',
      'Type': 'Hybrid',
      'Efficiency': '97.5%',
      'Warranty': '5 Years'
    },
    description: 'Deye 3kW 48V low voltage hybrid inverter. Smart charge control rules support AGM, Gel and Lithium batteries seamlessly.'
  },
  {
    id: 'inv-deye-3k-48v',
    name: 'Deye 3kW 48V 1PH Inverter',
    category: 'Inverters',
    brand: 'Deye',
    price: 69000.00,
    rating: 4.7,
    reviewsCount: 14,
    image: '/assets/inverter-deye.png',
    isTopItem: false,
    specs: {
      'Brand': 'Deye',
      'Capacity': '3kW',
      'Phase': '1 Phase',
      'Type': 'Hybrid',
      'Efficiency': '97.3%',
      'Warranty': '5 Years'
    },
    description: 'The standard Deye 3kW 48V single phase solar inverter. Built-in battery charge controls make it ideal for cost-effective installations.'
  },
  {
    id: 'inv-waaree-3k',
    name: 'Waaree 3kW Grid-Tie Inverter',
    category: 'Inverters',
    brand: 'Waaree',
    price: 38200.00,
    rating: 4.6,
    reviewsCount: 20,
    image: '/assets/inverter-waaree.png',
    isTopItem: false,
    specs: {
      'Brand': 'Waaree',
      'Capacity': '3kW',
      'Phase': '1 Phase',
      'Type': 'Grid Tie / On-grid',
      'Efficiency': '97.2%',
      'Warranty': '5 Years'
    },
    description: 'Compact Waaree 3kW grid-tie inverter. Low starting voltage enables electricity generation even on overcast mornings.'
  },
  {
    id: 'inv-deye-ongrid-3k-1ph',
    name: 'Deye On-grid 3kW 1PH Inverter',
    category: 'Inverters',
    brand: 'Deye',
    price: 41500.00,
    rating: 4.7,
    reviewsCount: 16,
    image: '/assets/inverter-deye.png',
    isTopItem: false,
    specs: {
      'Brand': 'Deye',
      'Capacity': '3kW',
      'Phase': '1 Phase',
      'Type': 'Grid Tie / On-grid',
      'Efficiency': '97.5%',
      'Warranty': '5 Years'
    },
    description: 'High efficiency Deye On-grid 3kW single phase inverter. Sleek glassmorphic cover panel with LCD status displays.'
  },
  {
    id: 'inv-deye-ongrid-4k-1ph',
    name: 'Deye On-grid 4kW 1PH Inverter',
    category: 'Inverters',
    brand: 'Deye',
    price: 49000.00,
    rating: 4.8,
    reviewsCount: 19,
    image: '/assets/inverter-deye.png',
    isTopItem: false,
    specs: {
      'Brand': 'Deye',
      'Capacity': '4kW',
      'Phase': '1 Phase',
      'Type': 'Grid Tie / On-grid',
      'Efficiency': '97.6%',
      'Warranty': '5 Years'
    },
    description: 'Deye 4kW single phase on-grid solar inverter. Advanced protection checks for ground faults and surges.'
  },
  {
    id: 'inv-deye-ongrid-3k-3ph',
    name: 'Deye On-grid 3kW 3PH Inverter',
    category: 'Inverters',
    brand: 'Deye',
    price: 55000.00,
    rating: 4.7,
    reviewsCount: 12,
    image: '/assets/inverter-deye.png',
    isTopItem: false,
    specs: {
      'Brand': 'Deye',
      'Capacity': '3kW',
      'Phase': '3 Phase',
      'Type': 'Grid Tie / On-grid',
      'Efficiency': '97.8%',
      'Warranty': '5 Years'
    },
    description: 'Deye 3-phase 3kW grid-tie inverter. Distributes power evenly across phases to reduce transformer loading limits.'
  },
  {
    id: 'inv-deye-ongrid-6k-3ph',
    name: 'Deye On-grid 6kW 3PH Inverter',
    category: 'Inverters',
    brand: 'Deye',
    price: 72500.00,
    rating: 4.8,
    reviewsCount: 22,
    image: '/assets/inverter-deye.png',
    isTopItem: true,
    specs: {
      'Brand': 'Deye',
      'Capacity': '6kW',
      'Phase': '3 Phase',
      'Type': 'Grid Tie / On-grid',
      'Efficiency': '98.0%',
      'Warranty': '5 Years'
    },
    description: 'Industrial grade Deye 6kW 3-phase grid-tied inverter. Perfect for mid-scale rooftop setups.'
  },
  {
    id: 'inv-deye-hyb-5k-1ph',
    name: 'Deye Hybrid 5kW 1PH Inverter',
    category: 'Inverters',
    brand: 'Deye',
    price: 115000.00,
    rating: 4.9,
    reviewsCount: 38,
    image: '/assets/inverter-deye.png',
    isTopItem: true,
    specs: {
      'Brand': 'Deye',
      'Capacity': '5kW',
      'Phase': '1 Phase',
      'Type': 'Hybrid',
      'Efficiency': '97.6%',
      'Warranty': '5 Years'
    },
    description: 'Residential powerhouse Deye 5kW Hybrid single phase. Smart monitoring, battery matching, and zero export modes.'
  },
  {
    id: 'inv-deye-micro-1k',
    name: 'Deye Micro Inverter 1kW',
    category: 'Inverters',
    brand: 'Deye',
    price: 28000.00,
    rating: 4.7,
    reviewsCount: 9,
    image: '/assets/inverter-deye.png',
    isTopItem: false,
    specs: {
      'Brand': 'Deye',
      'Capacity': '1kW',
      'Phase': '1 Phase',
      'Type': 'Micro Inverter',
      'Efficiency': '96.5%',
      'Warranty': '10 Years'
    },
    description: 'Premium panel-level Deye 1kW micro inverter. Eliminates shade losses and offers panel-level power monitoring.'
  },
  {
    id: 'inv-deye-micro-2.2k',
    name: 'Deye Micro Inverter 2.2kW',
    category: 'Inverters',
    brand: 'Deye',
    price: 39000.00,
    rating: 4.8,
    reviewsCount: 14,
    image: '/assets/inverter-deye.png',
    isTopItem: false,
    specs: {
      'Brand': 'Deye',
      'Capacity': '2.2kW',
      'Phase': '1 Phase',
      'Type': 'Micro Inverter',
      'Efficiency': '96.8%',
      'Warranty': '10 Years'
    },
    description: 'Deye 2.2kW micro inverter. Accommodates up to 4 high-output panels with individual MPPT optimization tracks.'
  },
  {
    id: 'inv-microtek-5k-1ph',
    name: 'Microtek 5kW 1PH Inverter',
    category: 'Inverters',
    brand: 'Microtek',
    price: 55000.00,
    rating: 4.7,
    reviewsCount: 26,
    image: '/assets/inverter-microtek.png',
    isTopItem: false,
    specs: {
      'Brand': 'Microtek',
      'Capacity': '5kW',
      'Phase': '1 Phase',
      'Type': 'Hybrid',
      'Efficiency': '97.5%',
      'Warranty': '5 Years'
    },
    description: 'Microtek 5kW single phase solar inverter. Reliable heavy-duty copper transformer construction ensures long-term lifespan.'
  },
  {
    id: 'inv-microtek-3k-1ph',
    name: 'Microtek 3kW 1PH Inverter',
    category: 'Inverters',
    brand: 'Microtek',
    price: 35000.00,
    rating: 4.6,
    reviewsCount: 18,
    image: '/assets/inverter-microtek.png',
    isTopItem: false,
    specs: {
      'Brand': 'Microtek',
      'Capacity': '3kW',
      'Phase': '1 Phase',
      'Type': 'Hybrid',
      'Efficiency': '97.2%',
      'Warranty': '5 Years'
    },
    description: 'Microtek 3kW single phase solar inverter. Advanced protection checks for ground faults and surges.'
  },

  // CATEGORY 2: Solar Panels (PV Modules)
  {
    id: 'pan-microtek-550w',
    name: 'Microtek 550W N-DCR Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Microtek',
    price: 19500.00,
    rating: 4.8,
    reviewsCount: 42,
    image: '/assets/panel-microtek.png',
    isTopItem: true,
    specs: {
      'Brand': 'Microtek',
      'Wattage': '550W',
      'Technology': 'BiFacial',
      'Type': 'N-DCR',
      'Efficiency': '21.3%',
      'Dimensions': '2279 x 1134 x 35 mm'
    },
    description: 'Microtek 550W N-type DCR Bifacial solar module. High albedo gains and robust mechanical loading tolerance.'
  },
  {
    id: 'pan-waaree-535w',
    name: 'Waaree 535W DCR Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Waaree',
    price: 18000.00,
    rating: 4.6,
    reviewsCount: 29,
    image: '/assets/panel-waaree.png',
    isTopItem: false,
    specs: {
      'Brand': 'Waaree',
      'Wattage': '535W',
      'Technology': 'BiFacial',
      'Type': 'DCR',
      'Efficiency': '20.7%',
      'Dimensions': '2256 x 1134 x 35 mm'
    },
    description: 'Waaree 535W Bifacial DCR panel. Meets all domestic content parameters, making it perfect for subsidy solar programs.'
  },
  {
    id: 'pan-adani-555w',
    name: 'Adani 555W N-DCR Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Adani',
    price: 21500.00,
    rating: 4.9,
    reviewsCount: 51,
    image: '/assets/panel-adani.png',
    isTopItem: true,
    specs: {
      'Brand': 'Adani',
      'Wattage': '555W',
      'Technology': 'BiFacial',
      'Type': 'N-DCR',
      'Efficiency': '21.5%',
      'Dimensions': '2278 x 1134 x 35 mm'
    },
    description: 'Adani 555W N-type DCR Bifacial solar panel. Excellent low-light performance and cell degradation parameters.'
  },
  {
    id: 'pan-waaree-570w',
    name: 'Waaree 570W TOPCon DCR Panel',
    category: 'Solar Panels',
    brand: 'Waaree',
    price: 22000.00,
    rating: 4.8,
    reviewsCount: 16,
    image: '/assets/panel-waaree.png',
    isTopItem: false,
    specs: {
      'Brand': 'Waaree',
      'Wattage': '570W',
      'Technology': 'Topcon',
      'Type': 'DCR',
      'Efficiency': '22.0%',
      'Dimensions': '2334 x 1134 x 35 mm'
    },
    description: 'Waaree 570W high efficiency TOPCon solar module. Built using tinned copper busbars to decrease internal resistance.'
  },
  {
    id: 'pan-waaree-580w',
    name: 'Waaree 580W TOPCon DCR Panel',
    category: 'Solar Panels',
    brand: 'Waaree',
    price: 23500.00,
    rating: 4.9,
    reviewsCount: 30,
    image: '/assets/panel-waaree.png',
    isTopItem: true,
    specs: {
      'Brand': 'Waaree',
      'Wattage': '580W',
      'Technology': 'Topcon',
      'Type': 'DCR',
      'Efficiency': '22.4%',
      'Dimensions': '2384 x 1134 x 35 mm'
    },
    description: 'Waaree 580W solar panel with TOPCon technology. Ultra-low temperature coefficients guarantee peak generation on hot days.'
  },
  {
    id: 'pan-adani-550w',
    name: 'Adani 550W Half-Cut Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Adani',
    price: 19800.00,
    rating: 4.7,
    reviewsCount: 34,
    image: '/assets/panel-adani.png',
    isTopItem: false,
    specs: {
      'Brand': 'Adani',
      'Wattage': '550W',
      'Technology': 'BiFacial',
      'Type': 'Half-cut',
      'Efficiency': '21.3%',
      'Dimensions': '2278 x 1134 x 35 mm'
    },
    description: 'Adani 550W Half-cut bifacial solar panel. Reduces hot-spot risks and improves performance under partial shadow conditions.'
  },
  {
    id: 'pan-adani-580w',
    name: 'Adani 580W Mono-PERC Panel',
    category: 'Solar Panels',
    brand: 'Adani',
    price: 21800.00,
    rating: 4.8,
    reviewsCount: 27,
    image: '/assets/panel-adani.png',
    isTopItem: false,
    specs: {
      'Brand': 'Adani',
      'Wattage': '580W',
      'Technology': 'Mono Perc',
      'Type': 'Mono Perc',
      'Efficiency': '21.5%',
      'Dimensions': '2384 x 1134 x 35 mm'
    },
    description: 'High performance Adani 580W Monocrystalline PERC module. Certified for extreme wind loads up to 2400 Pascals.'
  },
  {
    id: 'pan-saatvik-585w',
    name: 'Saatvik 585W Mono-PERC Panel',
    category: 'Solar Panels',
    brand: 'Saatvik',
    price: 21200.00,
    rating: 4.8,
    reviewsCount: 15,
    image: '/assets/panel-satvik.png',
    isTopItem: false,
    specs: {
      'Brand': 'Saatvik',
      'Wattage': '585W',
      'Technology': 'Mono Perc',
      'Type': 'Mono Perc',
      'Efficiency': '21.6%',
      'Dimensions': '2384 x 1134 x 35 mm'
    },
    description: 'Saatvik 585W monocrystalline solar module. Features advanced multi-busbar cell layouts for improved grid security.'
  },
  {
    id: 'pan-saatvik-565w',
    name: 'Saatvik 565W Mono-PERC Panel',
    category: 'Solar Panels',
    brand: 'Saatvik',
    price: 19200.00,
    rating: 4.7,
    reviewsCount: 19,
    image: '/assets/panel-satvik.png',
    isTopItem: false,
    specs: {
      'Brand': 'Saatvik',
      'Wattage': '565W',
      'Technology': 'Mono Perc',
      'Type': 'Mono Perc',
      'Efficiency': '21.0%',
      'Dimensions': '2334 x 1134 x 35 mm'
    },
    description: 'Saatvik 565W solar panels offer high reliability and consistent wattage generation for residential rooftops.'
  },
  {
    id: 'pan-binmin-adani-620w',
    name: 'Binmin Adani 620W DCR TOPCon Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Adani',
    price: 25500.00,
    rating: 5.0,
    reviewsCount: 58,
    image: '/assets/panel-adani.png',
    isTopItem: true,
    specs: {
      'Brand': 'Adani',
      'Wattage': '620W',
      'Technology': 'Topcon',
      'Type': 'DCR TOPCon Bifacial',
      'Efficiency': '22.5%',
      'Dimensions': '2465 x 1134 x 40 mm'
    },
    description: 'Binmin signature Adani 620W DCR panel. Leverages double glass bifaciality and TOPCon technology to yield maximum power outputs.'
  },
  {
    id: 'pan-adani-620w',
    name: 'Adani 620W DCR TOPCon Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Adani',
    price: 24500.00,
    rating: 4.9,
    reviewsCount: 44,
    image: '/assets/panel-adani.png',
    isTopItem: false,
    specs: {
      'Brand': 'Adani',
      'Wattage': '620W',
      'Technology': 'Topcon',
      'Type': 'DCR TOPCon Bifacial',
      'Efficiency': '22.4%',
      'Dimensions': '2465 x 1134 x 40 mm'
    },
    description: 'Adani 620W DCR solar panel module. Designed with robust double-glass frame elements to prevent microcracks.'
  },
  {
    id: 'pan-waaree-560w',
    name: 'Waaree 560W TOPCon DCR Panel',
    category: 'Solar Panels',
    brand: 'Waaree',
    price: 21000.00,
    rating: 4.7,
    reviewsCount: 22,
    image: '/assets/panel-waaree.png',
    isTopItem: false,
    specs: {
      'Brand': 'Waaree',
      'Wattage': '560W',
      'Technology': 'Topcon',
      'Type': 'DCR',
      'Efficiency': '21.7%',
      'Dimensions': '2279 x 1134 x 35 mm'
    },
    description: 'Waaree 560W DCR solar panels. Perfect for residential solar systems under net metering subsidy schemes.'
  },
  {
    id: 'pan-adani-555w-dcr',
    name: 'Adani 555W DCR Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Adani',
    price: 20500.00,
    rating: 4.8,
    reviewsCount: 31,
    image: '/assets/panel-adani.png',
    isTopItem: false,
    specs: {
      'Brand': 'Adani',
      'Wattage': '555W',
      'Technology': 'BiFacial',
      'Type': 'DCR',
      'Efficiency': '21.5%',
      'Dimensions': '2278 x 1134 x 35 mm'
    },
    description: 'High efficiency Adani 555W DCR Bifacial solar module. Optimized rear side generation boosts performance.'
  },
  {
    id: 'pan-adani-545w-dcr',
    name: 'Adani 545W DCR Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Adani',
    price: 19200.00,
    rating: 4.7,
    reviewsCount: 18,
    image: '/assets/panel-adani.png',
    isTopItem: false,
    specs: {
      'Brand': 'Adani',
      'Wattage': '545W',
      'Technology': 'BiFacial',
      'Type': 'DCR',
      'Efficiency': '21.1%',
      'Dimensions': '2256 x 1134 x 35 mm'
    },
    description: 'Adani 545W DCR Bifacial solar module. Clean, reliable green energy for domestic configurations.'
  },
  {
    id: 'pan-adani-610w',
    name: 'Adani 610W NDCR TOPCon Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Adani',
    price: 23000.00,
    rating: 4.9,
    reviewsCount: 29,
    image: '/assets/panel-adani.png',
    isTopItem: true,
    specs: {
      'Brand': 'Adani',
      'Wattage': '610W',
      'Technology': 'Topcon',
      'Type': 'NDCR TOPCon Bifacial',
      'Efficiency': '22.0%',
      'Dimensions': '2465 x 1134 x 35 mm'
    },
    description: 'Premium Adani 610W NDCR solar panels. Dual glass design ensures highest conversion efficiency and durability.'
  },
  {
    id: 'pan-exide-550w',
    name: 'Exide 550W Bifacial DCR Panel',
    category: 'Solar Panels',
    brand: 'Exide',
    price: 19500.00,
    rating: 4.7,
    reviewsCount: 24,
    image: '/assets/panel-exide.png',
    isTopItem: false,
    specs: {
      'Brand': 'Exide',
      'Wattage': '550W',
      'Technology': 'BiFacial',
      'Type': 'DCR',
      'Efficiency': '21.3%',
      'Dimensions': '2279 x 1134 x 35 mm'
    },
    description: 'Exide 550W Bifacial DCR solar modules. High capacity generation with robust double frame supports.'
  },
  {
    id: 'pan-exide-500w',
    name: 'Exide 500W Bifacial DCR Panel',
    category: 'Solar Panels',
    brand: 'Exide',
    price: 17500.00,
    rating: 4.5,
    reviewsCount: 30,
    image: '/assets/panel-exide.png',
    isTopItem: false,
    specs: {
      'Brand': 'Exide',
      'Wattage': '500W',
      'Technology': 'BiFacial',
      'Type': 'DCR',
      'Efficiency': '20.5%',
      'Dimensions': '2185 x 1134 x 35 mm'
    },
    description: 'Cost-effective Exide 500W DCR Bifacial solar module. Low light responsive performance panels.'
  },
  {
    id: 'pan-waaree-545w',
    name: 'Waaree 545W DCR TOPCon Panel',
    category: 'Solar Panels',
    brand: 'Waaree',
    price: 20000.00,
    rating: 4.7,
    reviewsCount: 22,
    image: '/assets/panel-waaree.png',
    isTopItem: false,
    specs: {
      'Brand': 'Waaree',
      'Wattage': '545W',
      'Technology': 'Topcon',
      'Type': 'DCR',
      'Efficiency': '21.1%',
      'Dimensions': '2256 x 1134 x 35 mm'
    },
    description: 'Waaree 545W TOPCon solar panels. Excellent PID resistance and lower cell operational temperatures.'
  },
  {
    id: 'pan-adani-620w-ndcr',
    name: 'Adani 620W NDCR TOPCon Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Adani',
    price: 24800.00,
    rating: 4.9,
    reviewsCount: 38,
    image: '/assets/panel-adani.png',
    isTopItem: true,
    specs: {
      'Brand': 'Adani',
      'Wattage': '620W',
      'Technology': 'Topcon',
      'Type': 'NDCR TOPCon Bifacial',
      'Efficiency': '22.5%',
      'Dimensions': '2465 x 1134 x 40 mm'
    },
    description: 'Heavy duty Adani 620W NDCR solar module. Built using N-type cells for lowest power loss over time.'
  },
  {
    id: 'pan-waaree-540w',
    name: 'Waaree 540W DCR Bifacial Panel',
    category: 'Solar Panels',
    brand: 'Waaree',
    price: 19500.00,
    rating: 4.6,
    reviewsCount: 14,
    image: '/assets/panel-waaree.png',
    isTopItem: false,
    specs: {
      'Brand': 'Waaree',
      'Wattage': '540W',
      'Technology': 'BiFacial',
      'Type': 'DCR',
      'Efficiency': '20.9%',
      'Dimensions': '2256 x 1134 x 35 mm'
    },
    description: 'Waaree 540W DCR Bifacial panel. Certified for salt mist and ammonia resistance for coastal installation environments.'
  },
  {
    id: 'pan-exide-595w',
    name: 'Exide 595W NDCR Solar Panel',
    category: 'Solar Panels',
    brand: 'Exide',
    price: 23200.00,
    rating: 4.8,
    reviewsCount: 16,
    image: '/assets/panel-exide.png',
    isTopItem: false,
    specs: {
      'Brand': 'Exide',
      'Wattage': '595W',
      'Technology': 'Mono Perc',
      'Type': 'NDCR',
      'Efficiency': '21.8%',
      'Dimensions': '2415 x 1134 x 35 mm'
    },
    description: 'Exide 595W NDCR monocrystalline solar panel. Delivers high generation density for larger home setups.'
  },
  {
    id: 'pan-waaree-610w',
    name: 'Waaree 610W DCR TOPCon Panel',
    category: 'Solar Panels',
    brand: 'Waaree',
    price: 24200.00,
    rating: 4.9,
    reviewsCount: 23,
    image: '/assets/panel-waaree.png',
    isTopItem: true,
    specs: {
      'Brand': 'Waaree',
      'Wattage': '610W',
      'Technology': 'Topcon',
      'Type': 'DCR',
      'Efficiency': '22.3%',
      'Dimensions': '2465 x 1134 x 35 mm'
    },
    description: 'Ultra-efficiency Waaree 610W DCR solar panels. Utilizes N-type TOPCon cells for lowest power loss over time.'
  },
  {
    id: 'pan-microtek-580w',
    name: 'Microtek 580W Solar Panel',
    category: 'Solar Panels',
    brand: 'Microtek',
    price: 21500.00,
    rating: 4.7,
    reviewsCount: 29,
    image: '/assets/panel-microtek.png',
    isTopItem: false,
    specs: {
      'Brand': 'Microtek',
      'Wattage': '580W',
      'Technology': 'Mono Perc',
      'Type': 'Mono Perc',
      'Efficiency': '21.5%',
      'Dimensions': '2384 x 1134 x 35 mm'
    },
    description: 'Microtek 580W Monocrystalline PERC module. Certified for extreme wind loads up to 2400 Pascals.'
  },

  // CATEGORY 3: ACDB (AC Distribution Boards)
  {
    id: 'acdb-hav-5kw-1ph',
    name: 'Havells 5kW 1-Phase ACDB Board',
    category: 'ACDB',
    brand: 'Havells',
    price: 9200.00,
    rating: 4.7,
    reviewsCount: 38,
    image: '/assets/acdb-havells.png',
    isTopItem: true,
    specs: {
      'Brand': 'Havells',
      'Capacity': '5kW',
      'Phase': '1 Phase',
      'Type': 'AC Distribution Board'
    },
    description: 'Havells 5kW, 1 Phase ACDB Board with spike protection.'
  },
  {
    id: 'acdb-hav-3kw-1ph',
    name: 'Havells 3kW 1-Phase ACDB Board',
    category: 'ACDB',
    brand: 'Havells',
    price: 5800.00,
    rating: 4.5,
    reviewsCount: 19,
    image: '/assets/acdb-havells.png',
    isTopItem: false,
    specs: {
      'Brand': 'Havells',
      'Capacity': '3kW',
      'Phase': '1 Phase',
      'Type': 'AC Distribution Board'
    },
    description: 'Havells 3kW, 1 Phase ACDB Board with spike protection.'
  },

  // CATEGORY 4: DCDB (DC Distribution Boards)
  {
    id: 'dcdb-hav-5kw-1str',
    name: 'Havells 5kW 1-String DCDB Box',
    category: 'DCDB',
    brand: 'Havells',
    price: 8600.00,
    rating: 4.8,
    reviewsCount: 28,
    image: '/assets/dcdb-havells.png',
    isTopItem: true,
    specs: {
      'Brand': 'Havells',
      'Capacity': '5kW',
      'Strings': '1 String',
      'Type': 'DC Combiner Box'
    },
    description: 'Havells 5kW, 1 String DCDB Box for solar PV input line protection.'
  },
  {
    id: 'dcdb-hav-3kw-1str',
    name: 'Havells 3kW 1-String DCDB Box',
    category: 'DCDB',
    brand: 'Havells',
    price: 5200.00,
    rating: 4.5,
    reviewsCount: 17,
    image: '/assets/dcdb-havells.png',
    isTopItem: false,
    specs: {
      'Brand': 'Havells',
      'Capacity': '3kW',
      'Strings': '1 String',
      'Type': 'DC Combiner Box'
    },
    description: 'Havells 3kW, 1 String DCDB Box for solar PV input line protection.'
  },

  // CATEGORY 5: AC & DC Cables
  {
    id: 'cab-mic-ac-6mm',
    name: 'Microtek 6mm² AC Power Cable (50m)',
    category: 'Cables',
    brand: 'Microtek',
    price: 6500.00,
    rating: 4.8,
    reviewsCount: 34,
    image: '/assets/cable-microtek-ac.png',
    isTopItem: false,
    specs: {
      'Brand': 'Microtek',
      'Size': '6mm²',
      'Length': '50 meters',
      'Type': 'AC Power Cable'
    },
    description: 'Microtek 6mm² AC Power Cable (50m roll). Flame-retardant and highly flexible, optimized for grid-connect operations.'
  },
  {
    id: 'cab-mic-ac-4mm',
    name: 'Microtek 4mm² AC Power Cable (50m)',
    category: 'Cables',
    brand: 'Microtek',
    price: 4800.00,
    rating: 4.6,
    reviewsCount: 19,
    image: '/assets/cable-microtek-ac.png',
    isTopItem: false,
    specs: {
      'Brand': 'Microtek',
      'Size': '4mm²',
      'Length': '50 meters',
      'Type': 'AC Power Cable'
    },
    description: 'Microtek 4mm² AC Power Cable (50m roll). Highly reliable and durable low-loss wiring, perfect for residential solar installations.'
  },
  {
    id: 'cab-mic-dc-4mm',
    name: 'Microtek 4mm² DC Solar Cable (50m)',
    category: 'Cables',
    brand: 'Microtek',
    price: 5500.00,
    rating: 4.7,
    reviewsCount: 28,
    image: '/assets/cable-microtek-dc.png',
    isTopItem: true,
    specs: {
      'Brand': 'Microtek',
      'Size': '4mm²',
      'Length': '50 meters',
      'Type': 'DC Solar Cable'
    },
    description: 'Microtek 4mm² DC Solar Cable (50m roll). Double-insulated, tinned copper solar DC cable, UV-stabilized and weather-resistant.'
  },
  {
    id: 'cab-fin-ac-6mm',
    name: 'Finolex 6mm² AC Power Cable (50m)',
    category: 'Cables',
    brand: 'Finolex',
    price: 7200.00,
    rating: 4.8,
    reviewsCount: 42,
    image: '/assets/cable-finolex-ac.png',
    isTopItem: false,
    specs: {
      'Brand': 'Finolex',
      'Size': '6mm²',
      'Length': '50 meters',
      'Type': 'AC Power Cable'
    },
    description: 'Finolex 6mm² AC Power Cable (50m roll). High flame-retardant tri-PVC insulation, ideal for high-safety solar installations.'
  },
  {
    id: 'cab-fin-dc-6mm',
    name: 'Finolex 6mm² DC Solar Cable (50m)',
    category: 'Cables',
    brand: 'Finolex',
    price: 8100.00,
    rating: 4.9,
    reviewsCount: 51,
    image: '/assets/cable-finolex-dc.png',
    isTopItem: false,
    specs: {
      'Brand': 'Finolex',
      'Size': '6mm²',
      'Length': '50 meters',
      'Type': 'DC Solar Cable'
    },
    description: 'Finolex 6mm² DC Solar Cable (50m roll). Tinned copper layout, UV-stabilized and weather-resistant, built for 25+ years lifecycle.'
  },

  // CATEGORY 6: Earthing Systems
  {
    id: 'earth-exc-3kw',
    name: 'Excel 3kW Solar Earthing System Kit',
    category: 'Earthing',
    brand: 'Excel',
    price: 7800.00,
    rating: 4.7,
    reviewsCount: 24,
    image: '/assets/earthing-system.png',
    isTopItem: false,
    specs: {
      'Brand': 'Excel',
      'System Capacity': '3kW',
      'Rod Material': 'Copper Bonded Steel',
      'Backfill Compound': '11.36kg Bag',
      'Standards': 'ISI Certified'
    },
    description: 'Excel 3kW complete solar grounding kit. Package includes an ISI-certified copper-bonded grounding rod, solid brass clamp, and 11.36kg high-conductivity earth conditioning compound.'
  },
  {
    id: 'earth-exc-5kw',
    name: 'Excel 5kW Solar Earthing System Kit',
    category: 'Earthing',
    brand: 'Excel',
    price: 9800.00,
    rating: 4.9,
    reviewsCount: 36,
    image: '/assets/earthing-system.png',
    isTopItem: true,
    specs: {
      'Brand': 'Excel',
      'System Capacity': '5kW',
      'Rod Material': 'Pure Copper',
      'Backfill Compound': '25kg Bag',
      'Standards': 'ISI Certified'
    },
    description: 'Excel 5kW heavy-duty solar grounding kit. Package features a pure solid copper earth electrode, robust heavy-duty terminal clamp, and 25kg premium backfill soil compound for low-resistance grounding paths.'
  },

  // CATEGORY 7: Lightning Arrestor Systems
  {
    id: 'arr-exc-system',
    name: 'Excel Lightning Arrestor System',
    category: 'Lightning Arrestors',
    brand: 'Excel',
    price: 8500.00,
    rating: 4.8,
    reviewsCount: 45,
    image: '/assets/arrestor-excel.png',
    isTopItem: true,
    specs: {
      'Brand': 'Excel',
      'Conductor': '10SWG Cu Wire',
      'Pipe': '1.5" dia. GI Pipe',
      'Type': 'Complete System'
    },
    description: 'Excel Lightning Arrestor System featuring a 10SWG Cu Wire and a 1.5" diameter GI Pipe mast for robust rooftop electrostatic protection.'
  },

  // CATEGORY 8: Calibrated Energy Meters
  {
    id: 'met-lt-1ph-30a',
    name: 'L&T 1-Phase Calibrated Energy Meter (30A)',
    category: 'Energy Meters',
    brand: 'L&T',
    price: 4800.00,
    rating: 4.8,
    reviewsCount: 54,
    image: '/assets/meter-lt.png',
    isTopItem: false,
    specs: {
      'Brand': 'L&T',
      'Phase': '1 Phase',
      'Current': '30A',
      'Voltage': '240V',
      'Class': 'Class 1',
      'Type': 'AC Static Watthour Meter'
    },
    description: '1 Phase, 30A, 240V, Class: 1 Calibrated Energy Meter. Features premium optical port communication and billing calibration.'
  },
  {
    id: 'met-vt-1ph-30a',
    name: 'Vision Tech 1-Phase Calibrated Energy Meter (30A)',
    category: 'Energy Meters',
    brand: 'Vision Tech',
    price: 4200.00,
    rating: 4.6,
    reviewsCount: 18,
    image: '/assets/meter-visiontech.png',
    isTopItem: false,
    specs: {
      'Brand': 'Vision Tech',
      'Phase': '1 Phase',
      'Current': '30A',
      'Voltage': '240V',
      'Class': 'Class 1',
      'Type': 'AC Static Watthour Meter'
    },
    description: '1 Phase, 30A, 240V, Class: 1 Calibrated Energy Meter. Static KWH meter with LCD screen, ideal for domestic net metering.'
  },


  // CATEGORY 9: Main Isolator Switches
  {
    id: 'iso-hav-2p-40a',
    name: 'Havells 2-Pole AC Isolator (40A)',
    category: 'Isolators',
    brand: 'Havells',
    price: 3500.00,
    rating: 4.8,
    reviewsCount: 52,
    image: '/assets/isolator-havells.png',
    isTopItem: true,
    specs: {
      'Brand': 'Havells',
      'Poles': '2 Pole',
      'Rating': '40A',
      'Type': 'AC Isolator'
    },
    description: 'Havells 40A double-pole (DP) AC isolator switch. High-performance safety switch designed to isolate the AC output of residential grid-tied solar inverters.'
  },
  {
    id: 'iso-hav-4p-63a',
    name: 'Havells 4-Pole AC Isolator (63A)',
    category: 'Isolators',
    brand: 'Havells',
    price: 5200.00,
    rating: 4.9,
    reviewsCount: 38,
    image: '/assets/isolator-havells.png',
    isTopItem: false,
    specs: {
      'Brand': 'Havells',
      'Poles': '4 Pole',
      'Rating': '63A',
      'Type': 'AC Isolator'
    },
    description: 'Havells 63A four-pole (FP) AC isolator switch. Built for three-phase commercial solar systems, ensuring reliable contact separation under full electrical load.'
  },

  // CATEGORY 10: Batteries
  {
    id: 'bat-bin-sef5',
    name: 'Binmin SE F5 Plus Lithium Battery 5.12kWh',
    category: 'Batteries',
    brand: 'Binmin',
    price: 145000.00,
    rating: 5.0,
    reviewsCount: 74,
    image: '/assets/battery-sef5.png',
    isTopItem: true,
    specs: {
      'Brand': 'Binmin',
      'Type': 'Lithium LiFePO4',
      'Capacity': '5.12kWh',
      'Voltage': '51.2V Nominal'
    },
    description: 'The signature SE F5 Plus lithium energy storage battery. Crafted with premium A-grade LiFePO4 cells and integrated Smart BMS. Rack-mountable, scalable up to 15 modules in parallel, and compatible with all major hybrid inverters.'
  },
  {
    id: 'bat-bin-sef3',
    name: 'Binmin SE F3 Lithium Battery 2.56kWh',
    category: 'Batteries',
    brand: 'Binmin',
    price: 98000.00,
    rating: 4.9,
    reviewsCount: 42,
    image: '/assets/battery-sef5.png',
    isTopItem: false,
    specs: {
      'Brand': 'Binmin',
      'Type': 'Lithium LiFePO4',
      'Capacity': '2.56kWh',
      'Voltage': '51.2V Nominal'
    },
    description: 'Compact Binmin lithium storage unit. Perfect for small hybrid systems or scaling configurations.'
  },

  // CATEGORY 11: MC4 Connectors
  {
    id: 'mc4-mic-pair',
    name: 'Microtek MC4 Solar Connectors (Pair)',
    category: 'MC4 Connectors',
    brand: 'Microtek',
    price: 250.00,
    rating: 4.8,
    reviewsCount: 37,
    image: '/assets/mc4-microtek.png',
    isTopItem: true,
    specs: {
      'Brand': 'Microtek',
      'Type': 'Male & Female Pair',
      'Rated Voltage': '1000V DC',
      'Rated Current': '30A',
      'Protection': 'IP67 Waterproof'
    },
    description: 'Microtek MC4 Solar Connectors (1 Male & 1 Female connector with pins). Engineered with high-strength PPO plastic, featuring IP67 waterproofing and excellent UV resistance for long-term outdoor solar array connection integrity.'
  },

  // CATEGORY 12: Cabinets
  {
    id: 'cab-hav-enclosure',
    name: 'Havells IP65 Weatherproof Solar Enclosure Cabinet',
    category: 'Cabinets',
    brand: 'Havells',
    price: 4800.00,
    rating: 4.8,
    reviewsCount: 15,
    image: '/assets/cabinet-havells.png',
    isTopItem: true,
    specs: {
      'Brand': 'Havells',
      'Material': 'ABS Thermoplastic',
      'Protection': 'IP65 Weatherproof',
      'Mounting': 'Wall Mount'
    },
    description: 'Havells premium IP65 weatherproof solar distribution cabinet/enclosure. Designed with highly durable UV-stabilized ABS thermoplastic to protect solar distribution breakers and wiring components from outdoor environmental exposure.'
  }
];

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('binmin_products_v18');
    let parsed;
    try {
      parsed = saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      parsed = INITIAL_PRODUCTS;
    }
    if (!Array.isArray(parsed)) {
      parsed = INITIAL_PRODUCTS;
    }
    return parsed.map(p => {
      let stockVal = p.stock !== undefined ? parseInt(p.stock) : 50;
      if (isNaN(stockVal)) stockVal = 50;
      if (p.id === 'mc4-mic-pair') {
        stockVal = 5;
      } else if (p.id === 'met-lt-1ph-30a') {
        stockVal = 0;
      }
      return {
        ...p,
        price: parseFloat(p.price) || 0,
        stock: stockVal,
        status: p.status || 'Active',
        specs: p.specs || {}
      };
    });
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('binmin_cart');
    let parsed = [];
    try {
      parsed = saved ? JSON.parse(saved) : [];
    } catch (e) {
      parsed = [];
    }
    if (!Array.isArray(parsed)) parsed = [];
    return parsed.map(item => ({
      ...item,
      quantity: parseInt(item.quantity) || 1,
      product: {
        ...item.product,
        price: parseFloat(item.product.price) || 0,
        stock: parseInt(item.product.stock) || 0
      }
    }));
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('binmin_orders');
    let parsed = [];
    try {
      parsed = saved ? JSON.parse(saved) : [];
    } catch (e) {
      parsed = [];
    }
    if (!Array.isArray(parsed)) parsed = [];
    return parsed.map(order => ({
      ...order,
      total: parseFloat(order.total) || 0,
      items: (order.items || []).map(item => ({
        ...item,
        quantity: parseInt(item.quantity) || 1,
        product: {
          ...item.product,
          price: parseFloat(item.product.price) || 0,
          stock: parseInt(item.product.stock) || 0
        }
      }))
    }));
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('binmin_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Jane Doe',
      email: 'jane.doe@solarmail.com',
      phone: '+91 98765 43210',
      address: 'Plot 42, Green Energy Park, Sector 5',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    };
  });

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [shopFilters, setShopFilters] = useState({
    category: 'All',
    brand: 'All',
    capacity: 'All',
    phase: 'All',
    wattage: 'All',
    technology: 'All',
    priceRange: [0, 200000],
    sortBy: 'default'
  });

  // Save states
  useEffect(() => {
    localStorage.setItem('binmin_products_v18', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('binmin_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('binmin_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('binmin_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Orders operations
  const placeOrder = (billingDetails) => {
    const newOrder = {
      id: 'BMIN-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...cart],
      total: cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0),
      status: 'Processing', // Processing -> Shipped -> Out for Delivery -> Delivered
      shippingAddress: billingDetails
    };

    setOrders(prev => [newOrder, ...prev]);
    // Decrement stock for ordered items
    setProducts(prevProducts => 
      prevProducts.map(p => {
        const orderedItem = cart.find(item => item.product.id === p.id);
        if (orderedItem) {
          const newStock = Math.max(0, (p.stock !== undefined ? p.stock : 50) - orderedItem.quantity);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
    clearCart();
    return newOrder.id;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Admin Operations (CRUD)
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: 'prod-' + Date.now(),
      rating: 5.0,
      reviewsCount: 0,
      stock: newProduct.stock !== undefined ? parseInt(newProduct.stock) : 50,
      status: newProduct.status || 'Active'
    };
    setProducts(prev => [productWithId, ...prev]);
  };

  const editProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // Helper values
  const getProductById = (id) => products.find(p => p.id === id);

  return (
    <AppContext.Provider value={{
      products,
      cart,
      orders,
      userProfile,
      currentPage,
      selectedProductId,
      selectedCategory,
      searchQuery,
      isAdminMode,
      shopFilters,
      editingProduct,
      setEditingProduct,
      setCurrentPage,
      setSelectedProductId,
      setSelectedCategory,
      setSearchQuery,
      setIsAdminMode,
      setShopFilters,
      setUserProfile,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      placeOrder,
      updateOrderStatus,
      addProduct,
      editProduct,
      deleteProduct,
      getProductById
    }}>
      {children}
    </AppContext.Provider>
  );
};

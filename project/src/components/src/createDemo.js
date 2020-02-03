#!/usr/bin/env node

const provinces = require('./lib/provinces.js');

const provincesData = Object.keys(provinces).map(item => {
    return {
        area: item,
        count: (Math.random() * 10000) | 1
    };
});

const txt = JSON.stringify(provincesData, null, '\t');

require('fs').writeFileSync('demoData.json', txt);

// let count = 0;
// var client = {
//   get: function () {
//     return new Promise(function (resolve, reject) {
//       count ++;
//       setTimeout(function () {
//         if (count > 4) resolve({status:'DONE',otherStuff:'Other Stuff'});
//         else resolve({status: `count: ${count}`});
//       }, 1000);
//     });
//   }
// }


// async function someFunction() {
//   while (true) {
//     let dataResult = await client.get('/status');
//     console.log(dataResult.status);
//     if (dataResult.status == "DONE") {
//       return dataResult;
//     }
//   }
// }

// (async () => { let r = await someFunction(); console.log(r); })();





// //---
// function poll(pollFn, interval = 100) {
//     var intervalHandle = null

//     return {
//         until(conditionFn) {
//             return new Promise((resolve, reject) => {
//                 intervalHandle = setInterval(() => {
//                     pollFn().then((data) => {
//                         let passesCondition = false;
//                         try {
//                             passesCondition = conditionFn(data);
//                         } catch(e) {
//                             reject(e);
//                         }
//                         if (passesCondition) {
//                             resolve(data);
//                             clearInterval(intervalHandle);
//                         }
//                     }).catch(reject)
//                 }, interval)
//             })
//         }
//     }
// }

// var counter = 0;

// function getStatus() {
//     if (counter++ === 5) {
//        return Promise.resolve({ status: 'DONE', otherStuff: 'hi' });
//     }
//     console.log('not DONE, keep going')
//     return Promise.resolve({ status: 'WORKING' });
// }

// poll(getStatus, 500)
//   .until(data => data.status === 'DONE')
//   .then((data) => {
//     // do something with the data
//     console.log('status is DONE', data)
//   })


//   const http = require('http');

// const poll = {
//     pollB: function() {
//         http.get('http://serverB/status', (res) => {
//             const { statusCode } = res;

//             let error;
//             if (statusCode !== 200) {
//                 error = new Error(`Request Failed.\n` +
//                     `Status Code: ${statusCode}`);
//             }

//             if (error) {
//                 console.error(error.message);
//                 res.resume();
//             } else {
//                 res.setEncoding('utf8');
//                 let rawData = '';
//                 res.on('data', (chunk) => { rawData += chunk; });
//                 res.on('end', () => {
//                     try {
//                         const parsedData = JSON.parse(rawData);

//                         // The important logic comes here
//                         if (parsedData.status === 'BUSY') {
//                             setTimeout(poll.pollB, 10000); // request again in 10 secs
//                         } else {
//                             // Call the background process you need to
//                         }
//                     } catch (e) {
//                         console.error(e.message);
//                     }
//                 });
//             }
//         }).on('error', (e) => {
//             console.error(`Got error: ${e.message}`);
//         });
//     }
// }

// poll.pollB();



// new Vue({
//   el: '#pollingExample',
//   data: {
//     discountedProducts: []
//   },
//   methods: {
//     loadData: function () {
//       $.get('/store/discounts', function (response) {
//         this.discountedProducts = response.discountedProducts;
//       }.bind(this));
//     }
//   },
//   mounted: function () {
//     //Initial Load
//     this.loadData();
//     //Run every 30 seconds
//    var loadData = function(){
//         this.loadData();</span>
//         // Do stuff
//         setTimeout(loadData, 30000);
//    };
//      setTimeout(loadData,30000);
//   }
// });





// new Vue({
//   el: '#app',
//   data: {
//     items: [],
//     interval: null,
//   },
//   methods: {
//     loadData: function () {
//       $.get('/api/data', function (response) {
//         this.items = response.items;
//       }.bind(this));
//     }
//   },
//   ready: function () {
//     this.loadData();

//     this.interval = setInterval(function () {
//       this.loadData();
//     }.bind(this), 30000); 
//   },

//  beforeDestroy: function(){
// clearInterval(this.interval);
// }
// });

// <div id="app">
//   <div v-for="item in items">{{ item.prop }}</div>
// </div>




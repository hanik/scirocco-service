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
//   el: '#app',
//   data: {
//     items: []
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

//     setInterval(function () {
//       this.loadData();
//     }.bind(this), 30000); 
//   }
// });



// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10
// 11
// 12
// 13
// 14
// 15
// 16
// 17
// 18
// 19
// 20
// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
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




// (function poll(){
//    setTimeout(function(){
//       $.ajax({ url: "server", success: function(data){
//         //Setup the next poll recursively if order status is not updated
//         if (orderStatus not update)
//             poll()
//         else
//             display order status
//       }, dataType: "json"});
//   }, 30000);
// })();
// With Deferred:

// // The polling function
// function poll(fn, timeout, interval) {
//     var dfd = new Deferred();
//     var endTime = Number(new Date()) + (timeout || 2000);
//     interval = interval || 100;

//     (function p() {
//             // If the condition is met, we're done! 
//             if(fn()) {
//                 dfd.resolve();
//             }
//             // If the condition isn't met but the timeout hasn't elapsed, go again
//             else if (Number(new Date()) < endTime) {
//                 setTimeout(p, interval);
//             }
//             // Didn't match and too much time, reject!
//             else {
//                 dfd.reject(new Error('timed out for ' + fn + ': ' + arguments));
//             }
//     })();

//     return dfd.promise;
// }

// // Usage:  ensure order status is updated
// poll(function() {
//     return response.body.order_status == "updated";
// }, 2000, 150);





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







// data () {
// 	return {
// 		polling: null
// 	}
// },
// methods: {
// 	pollData () {
// 		this.polling = setInterval(() => {
// 			this.$store.dispatch('RETRIEVE_DATA_FROM_BACKEND')
// 		}, 3000)
// 	}
// },
// beforeDestroy () {
// 	clearInterval(this.polling)
// },
// created () {
// 	this.pollData()
// }

//   //agenda은 투 머치..

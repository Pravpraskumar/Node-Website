const request = require('request');

const indexForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');
const tab1 = document.querySelector('#tab1');

//mag1.textContent = 'From Javascript';

indexForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    msg1.textContent = 'Loading Data.....'
    msg2.textContent = ''
    const address  = searchElement.value;


const getWeth = (address, callback) => {
    const llurl =   'http://localhost:3000/weather?address='+address;
        
        request({url: llurl, json:true},function(error,response){
            if(error){
                console.log('Unable to connect to rest Connect Services');
            }else if(response.body.error){
                console.log(response.body.error);
                msg1.textContent = response.body.error;
            }else{
                msg1.textContent = '';
                var keyVal = []; 
                for (var key in data) {
                    if (keyVal.indexOf(key) === -1) {
                        keyVal.push(key);
                    }
                }
            
                var pairVal = []
                for (var j = 0; j < keyVal.length; j++) {
                    pairVal.push(data[keyVal[j]]); 
                }

                for (i= 0; i< keyVal.length; i++){
                    var tr = tab1.insertRow(-1);
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = keyVal[i].toUpperCase();
                    tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = pairVal[i];
                    //tdata = tdata + '<tr><td>'+keyVal[i]+'</td><td>'+pairVal[i]+'</td></tr>' 
                }
            }
        });
}
});

module.exports = getWeth; 
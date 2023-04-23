function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let totalCid = cid.map(a => a[1]).reduce((a,b) => a + b ,0);
  const currency = {
    'PENNY' : 0.01,
    'NICKEL': 0.05,
    'DIME' : 0.1,
    'QUARTER' : 0.25,
    'ONE' : 1,
    'FIVE' : 5,
    'TEN': 10,
    'TWENTY' : 20,
    'ONE HUNDRED': 100,  
    };

  if (change > totalCid){
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (change === totalCid){
    return {status: "CLOSED", change : cid};
  }else {
  let totalChange=[];
  cid = cid.reverse();
  cid.forEach(slot => {
    let newCondition = [slot[0],0];
    let key = slot[0];
    let value = slot[1];
    while (change >= currency[key] && value > 0){
      change = change.toFixed(2);
      change -= currency[key];
      value -= currency[key];
      newCondition[1] += currency[key];
    }
    if(newCondition[1] > 0){
      totalChange.push(newCondition);
    }
    });

    if(change > 0){
      return {status: "INSUFFICIENT_FUNDS", change: []};
    } 
    
  return {status: "OPEN", change: totalChange}; 
  }
  }
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
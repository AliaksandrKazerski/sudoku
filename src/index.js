module.exports = function solveSudoku(arr) {
// Algorithm that is searching for a singles.
  function bustSingles(arr, done) { 
    let countIn = 0;
    while (countIn < 6) {
      for (let y = 0; y < arr.length; y++) { // Moving between items and searching zeros.
        for (let x = 0; x < arr[y].length; x++) {
          if (arr[y][x] === 0) {
            let range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let m = 0; m < arr[y].length; m++) { // Searching range items on x.
              for (let h = 0; h < range.length; h++) {
                if (range[h] === arr[y][m]) {
                  range.splice(h, 1);
                }
              }
            }
            for (let m = 0; m < arr[x].length; m++) { // Searching range items on y.
              for (let h = 0; h < range.length; h++) {
                if (range[h] === arr[m][x]) {
                  range.splice(h, 1);
                }
              }
            } 
            if (x < 3 && y < 3) { // Searching range items on squares.
              for (let k = 0; k < 3; k++) {
                for (let m = 0; m < 3; m++) {
                  for (let h = 0; h < range.length; h++) {
                    if(range[h] === arr[k][m]) {
                      range.splice(h, 1);
                    }
                  }
                } 
              } 
            }
            if (x >= 3 && x < 6 && y < 3) {
              for (let k = 0 ; k < 3; k++) {
                for (let m = 3; m < 6; m++) {
                  for (let h = 0; h < range.length; h++) {
                    if(range[h] === arr[k][m]) {
                      range.splice(h, 1);
                    }
                  }
                } 
              } 
            }
            if (x >= 6 && y < 3) {
              for (let k = 0 ; k < 3; k++) {
                for (let m = 6; m < 9; m++) {
                  for (let h = 0; h < range.length; h++) {
                    if(range[h] === arr[k][m]) {
                      range.splice(h, 1);
                    }
                  }
                } 
              }
            }
            if (x < 3 && y >= 3 && y < 6) {
              for (let k = 3; k < 6; k++) {
                for (let m = 0; m < 3; m++) {
                  for (let h = 0; h < range.length; h++) {
                    if(range[h] === arr[k][m]) {
                      range.splice(h, 1);
                    }
                  }
                } 
              } 
            }
            if (x >= 3 && x < 6 &&  y >= 3 && y < 6) {
              for (let k = 3; k < 6; k++) {
                for (let m = 3; m < 6; m++) {
                  for (let h = 0; h < range.length; h++) {
                    if(range[h] === arr[k][m]) {
                      range.splice(h, 1);
                    }
                  }
                } 
              }
            }
            if (x >= 6 &&  y >= 3 && y < 6) {
              for (let k = 3; k < 6; k++) {
                for (let m = 6; m < 9; m++) {
                  for (let h = 0; h < range.length; h++) {
                    if(range[h] === arr[k][m]) {
                      range.splice(h, 1);
                    }
                  }
                } 
              } 
            }
            if (x < 3 && y >= 6) {
              for (let k = 6; k < 9; k++) {
                for (let m = 0; m < 3; m++) {
                  for (let h = 0; h < range.length; h++) {
                    if(range[h] === arr[k][m]) {
                      range.splice(h, 1);
                    }
                  }
                } 
              } 
            }
            if (x >=3 && x < 6 && y >= 6) {
              for (let k = 6; k < 9; k++) {
                for (let m = 3; m < 6; m++) {
                  for (let h = 0; h < range.length; h++) {
                    if(range[h] === arr[k][m]) {
                      range.splice(h, 1);
                    }
                  }
                } 
              }
            }
            if (x >= 6 && y >= 6) {
              for (let k = 6; k < 9; k++) {
                for (let m = 6; m < 9; m++) {
                  for (let h = 0; h < range.length; h++) {
                    if(range[h] === arr[k][m]) {
                      range.splice(h, 1);
                    }
                  }
                } 
              } 
            }
            if(countIn === 5) { // On last turn on the loop define the range.
            arr[y][x] = range;
            }
            if (range.length === 1) { // If range heave only one item this item its single.
              arr[y][x] = range[0];
            }
          } 
        }
      }
      countIn++
    }
    if (done) { // Recursion if done true.
    return bustHiddenSingles(arr);
    }
    return arr;
  }

  // Algorithm that is searching for a hidden singles.
  function bustHiddenSingles(arr) {
    let def = [];
    for (let y = 0; y < arr.length; y++) { // Moving between items and searching arrays.
      for (let x = 0; x < arr[y].length; x++) {
        if (typeof arr[y][x] === "object") { 
          def = arr[y][x];
          for (let m = 0; m < arr[y].length; m++) { // Searching other arrays on x and delete difference.
            if (typeof arr[y][m] === "object" && x !== m) {
              def = def.filter(function(el) { return !arr[y][m].includes(el); });
            }
          }
          if (def.length === 1){ // If difference heave only one item this item its hidden single.
            arr[y][x] = def[0];
            return  bustOpenPairs(arr);
          }
        }
      }
    }
    def = [];
    for (let y = 0; y < arr.length; y++) { // Moving between items and searching arrays.
      for (let x = 0; x < arr[y].length; x++) { 
        if (typeof arr[y][x] === "object"){  
          def = arr[y][x];
          for (let m = 0; m < arr[x].length; m++) { // Searching other arrays on y and delete difference.
            if (typeof arr[m][x] === "object" && y !== m) {
              def = def.filter(function(el) { return !arr[m][x].includes(el); });
            }
          }
          if (def.length === 1){ // If difference heave only one item this item its hidden single.
            arr[y][x] = def[0];
            return  bustOpenPairs(arr);
          }
        }
      }
    }
    def = [];
    for (let y = 0; y < arr.length; y++) { // Moving between items and searching arrays.
      for (let x = 0; x < arr[y].length; x++) {
        if (typeof arr[y][x] === "object"){   
          def = arr[y][x];
          if (x < 3 && y < 3) { // Searching other arrays on squares and delete difference.
            for (let k = 0; k < 3; k++) {
              next:
              for (let m = 0; m < 3; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                def = def.filter(function(el) { return !arr[k][m].includes(el); });
              } 
            }
          }
          if (x >= 3 && x < 6 && y < 3) {
            for (let k = 0 ; k < 3; k++) {
              next:
              for (let m = 3; m < 6; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                def = def.filter(function(el) { return !arr[k][m].includes(el); });
              } 
            }
          }
          if (x >= 6 && y < 3) {
            for (let k = 0 ; k < 3; k++) {
              next:
              for (let m = 6; m < 9; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                def = def.filter(function(el) { return !arr[k][m].includes(el); });                    
              } 
            }  
          }
          if (x < 3 && y >= 3 && y < 6) {
            for (let k = 3; k < 6; k++) {
              next:
              for (let m = 0; m < 3; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                def = def.filter(function(el) { return !arr[k][m].includes(el); });
              } 
            } 
          }
          if (x >= 3 && x < 6 &&  y >= 3 && y < 6) {
            for (let k = 3; k < 6; k++) {
              next:
              for (let m = 3; m < 6; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                def = def.filter(function(el) { return !arr[k][m].includes(el); }); 
              } 
            }
          }
          if (x >= 6 &&  y >= 3 && y < 6) {
            for (let k = 3; k < 6; k++) {
              next:
              for (let m = 6; m < 9; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                def = def.filter(function(el) { return !arr[k][m].includes(el); }); 
              } 
            }  
          }
          if (x < 3 && y >= 6) {
            for (let k = 6; k < 9; k++) {
              next:
              for (let m = 0; m < 3; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                def = def.filter(function(el) { return !arr[k][m].includes(el); });
              } 
            } 
          }
          if (x >=3 && x < 6 && y >= 6) {
            for (let k = 6; k < 9; k++) {
              next:
              for (let m = 3; m < 6; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                def = def.filter(function(el) { return !arr[k][m].includes(el); });
              } 
            }  
          }
          if (x >= 6 && y >= 6) {
            for (let k = 6; k < 9; k++) {
              next:
              for (let m = 6; m < 9; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                def = def.filter(function(el) { return !arr[k][m].includes(el); });
              } 
            } 
          }
          if (def.length === 1){ // If difference heave only one item this item its hidden single.
            arr[y][x] = def[0];
            return bustOpenPairs(arr);          
          }   
        } 
      }
    }
    return  bustOpenPairs(arr); // Recursion.
  }

  // Algorithm that is searching for a opens pairs.
  function bustOpenPairs(arr){
    for (let y = 0; y < arr.length; y++) { // Moving between items and searching arrays who have 2 items and they are the same on x.
      for (let x = 0; x < arr[y].length; x++) {
        if (typeof arr[y][x] === "object" && arr[y][x].length === 2) { 
          for (let m = 0; m < arr[y].length; m++) {
            if (typeof arr[y][m] === "object" && arr[y][m].length === 2 && JSON.stringify(arr[y][m]) === JSON.stringify(arr[y][x]) && x !== m) {
              next:
              for (let k = 0; k < arr[y].length; k++) {
                if (x === k || m === k) {
                  continue next;
                }
                if (typeof arr[y][k] === "object") { 
                  arr[y][k].splice(arr[y][k].indexOf(arr[y][x][0]), 1);
                  arr[y][k].splice(arr[y][k].indexOf(arr[y][x][1]), 1);
                }
              }
            }
          }
        }
      }
    }
    for (let y = 0; y < arr.length; y++) { // Moving between items and searching arrays who have 2 items and they are the same on y.
      for (let x = 0; x < arr[y].length; x++) {
        if (typeof arr[y][x] === "object" && arr[y][x].length === 2){
          for (let m = 0; m < arr[x].length; m++) {
            if (typeof arr[m][x] === "object" && arr[m][x].length === 2 && JSON.stringify(arr[m][x]) === JSON.stringify(arr[y][x]) && y !== m) {
              next:
              for (let k = 0; k < arr[x].length; k++) {
                if ( y === k || m === k ) {
                  continue next;
                }
                if (typeof arr[k][x] === "object") { 
                  arr[k][x].splice(arr[k][x].indexOf(arr[y][x][0]), 1);
                  arr[k][x].splice(arr[k][x].indexOf(arr[y][x][1]), 1);
                }
              }
            }
          }
        }
      }
    }
    for (let y = 0; y < arr.length; y++) { // Moving between items and searching arrays who have 2 items and they are the same on squares.
      for (let x = 0; x < arr[y].length; x++) {
        if (typeof arr[y][x] === "object" && arr[y][x].length === 2){  
          if (x < 3 && y < 3) {
            for (let k = 0; k < 3; k++) {
              next:
              for (let m = 0; m < 3; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                if (arr[k][m].length === 2 && JSON.stringify(arr[k][m]) === JSON.stringify(arr[y][x])) {
                  for (let n = 0; n < 3; n++) {
                    for (let p = 0; p < 3; p++) {
                      if (JSON.stringify(arr[n][p]) !== JSON.stringify(arr[y][x]) && typeof arr[n][p] === "object") {
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][0]), 1);
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][1]), 1);
                      } 
                    }
                  } 
                }
              }
            }
          }
          if (x >= 3 && x < 6 && y < 3) {
            for (let k = 0 ; k < 3; k++) {
              next:
              for (let m = 3; m < 6; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                if (arr[k][m].length === 2 && JSON.stringify(arr[k][m]) === JSON.stringify(arr[y][x])) {
                  for (let n = 0; n < 3; n++) {
                    for (let p = 3; p < 6; p++) {
                      if (JSON.stringify(arr[n][p]) !== JSON.stringify(arr[y][x]) && typeof arr[n][p] === "object") {
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][0]), 1);
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][1]), 1);
                      }
                    }
                  } 
                }
              }
            }
          }
          if (x >= 6 && y < 3) {
            for (let k = 0 ; k < 3; k++) {
              next:
              for (let m = 6; m < 9; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                if (arr[k][m].length === 2 && JSON.stringify(arr[k][m]) === JSON.stringify(arr[y][x])) {
                  for (let n = 0; n < 3; n++) {
                    for (let p = 6; p < 9; p++) {
                      if (JSON.stringify(arr[n][p]) !== JSON.stringify(arr[y][x]) && typeof arr[n][p] === "object") {
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][0]), 1);
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][1]), 1);
                      }
                    }
                  } 
                }
              }
            }
          }
          if (x < 3 && y >= 3 && y < 6) {
            for (let k = 3; k < 6; k++) {
              next:
              for (let m = 0; m < 3; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                if (arr[k][m].length === 2 && JSON.stringify(arr[k][m]) === JSON.stringify(arr[y][x])) {
                  for (let n = 3; n < 6; n++) {
                    for (let p = 0; p < 3; p++) {
                      if (JSON.stringify(arr[n][p]) !== JSON.stringify(arr[y][x]) && typeof arr[n][p] === "object") {
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][0]), 1);
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][1]), 1);
                      }
                    }
                  } 
                }
              }
            }
          }
          if (x >= 3 && x < 6 &&  y >= 3 && y < 6) {
            for (let k = 3; k < 6; k++) {
              next:
              for (let m = 3; m < 6; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                if (arr[k][m].length === 2 && JSON.stringify(arr[k][m]) === JSON.stringify(arr[y][x])) {
                  for (let n = 3; n < 6; n++) {
                    for (let p = 3; p < 6; p++) {
                      if (JSON.stringify(arr[n][p]) !== JSON.stringify(arr[y][x]) && typeof arr[n][p] === "object") {
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][0]), 1);
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][1]), 1);
                      }
                    }
                  } 
                }
              }
            }
          }
          if (x >= 6 &&  y >= 3 && y < 6) {
            for (let k = 3; k < 6; k++) {
              next:
              for (let m = 6; m < 9; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                if (arr[k][m].length === 2 && JSON.stringify(arr[k][m]) === JSON.stringify(arr[y][x])) {
                  for (let n = 3; n < 6; n++) {
                    for (let p = 6; p < 9; p++) {
                      if (JSON.stringify(arr[n][p]) !== JSON.stringify(arr[y][x]) && typeof arr[n][p] === "object") {
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][0]), 1);
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][1]), 1);
                      }
                    }
                  } 
                }
              }
            }
          }
          if (x < 3 && y >= 6) {
            for (let k = 6; k < 9; k++) {
              next:
              for (let m = 0; m < 3; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                if (arr[k][m].length === 2 && JSON.stringify(arr[k][m]) === JSON.stringify(arr[y][x])) {
                  for (let n = 6; n < 9; n++) {
                    for (let p = 0; p < 3; p++) {
                      if (JSON.stringify(arr[n][p]) !== JSON.stringify(arr[y][x]) && typeof arr[n][p] === "object") {
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][0]), 1);
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][1]), 1);
                      }
                    }
                  } 
                }
              }
            }
          }
          if (x >=3 && x < 6 && y >= 6) {
            for (let k = 6; k < 9; k++) {
              next:
              for (let m = 3; m < 6; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                if (arr[k][m].length === 2 && JSON.stringify(arr[k][m]) === JSON.stringify(arr[y][x])) {
                  for (let n = 6; n < 9; n++) {
                    for (let p = 3; p < 6; p++) {
                      if (JSON.stringify(arr[n][p]) !== JSON.stringify(arr[y][x]) && typeof arr[n][p] === "object") {
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][0]), 1);
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][1]), 1);
                      }
                    }
                  } 
                }
              }
            }
          }
          if (x >= 6 && y >= 6) {
            for (let k = 6; k < 9; k++) {
              next:
              for (let m = 6; m < 9; m++) {
                if (typeof arr[k][m] !== "object" || typeof arr[k][m] === "object" && k === y && m === x) {
                  continue next;
                }
                if (arr[k][m].length === 2 && JSON.stringify(arr[k][m]) === JSON.stringify(arr[y][x])) {
                for (let n = 6; n < 9; n++) {
                  for (let p = 6; p < 9; p++) {
                      if (JSON.stringify(arr[n][p]) !== JSON.stringify(arr[y][x]) && typeof arr[n][p] === "object") {
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][0]), 1);
                        arr[n][p].splice(arr[n][p].indexOf(arr[y][x][1]), 1);
                      }
                    }
                  } 
                }
              } 
            } 
          }  
        } 
      }
    }
    return insertZeros(arr); // Recursion.
  }

  // Algoritm that is insert zeros on array
  function insertZeros(arr){
    for (let y = 0; y < arr.length; y++) { 
      for (let x = 0; x < arr[y].length; x++) {
        if (typeof arr[y][x] === "object") {
          arr[y][x] = 0;
        }
      }
    }
    return arr;
  }

  // Validation of the inserted value
  function validation(arr, y, x) {
    for (let k = 0; k < arr[y].length; k++) {
      if (arr[y][x] === arr[y][k] && x!==k) {
        return false;
      }
    }
    for (let m = 0; m < arr[x].length; m++)  {
      if (arr[y][x] === arr[m][x] && y!==m) {
        return false;
      }
    }
    if (x < 3 && y < 3) {
      for (k = 0; k < 3; k++) {
        next:
        for (m = 0; m < 3; m++) {
          if (y === k && x === m) {
            continue next;
          }
          if(arr[y][x] === arr[k][m]) {
            return false;
          }
        }
      } 
    } 
    if (x >= 3 && x < 6 && y < 3) {
      for (k = 0 ; k < 3; k++) {
        next:
        for (m = 3; m < 6; m++) {
          if (y === k && x === m) {
            continue next;
          }
          if(arr[y][x] === arr[k][m]) {
            return false;
          }
        }
      } 
    } 
    if (x >= 6 && y < 3) {
      for (k = 0 ; k < 3; k++) {
        next:
        for (m = 6; m < 9; m++) {
          if (y === k && x === m) {
            continue next;
          }
          if(arr[y][x] === arr[k][m]) {
            return false;
          }
        } 
      }
    }
    if (x < 3 && y >= 3 && y < 6) {
      for (k = 3; k < 6; k++) {
        next:
        for (m = 0; m < 3; m++) {
          if (y === k && x === m) {
            continue next;
          }
          if(arr[y][x] === arr[k][m]) {
            return false;
          }
        }
      } 
    } 
    if (x >= 3 && x < 6 &&  y >= 3 && y < 6) {
      for (k = 3; k < 6; k++) {
        next:
        for (m = 3; m < 6; m++) {
          if (y === k && x === m) {
            continue next;
          }
          if(arr[y][x] === arr[k][m]) {
            return false;
          }
        }
      } 
    }
    if (x >= 6 &&  y >= 3 && y < 6) {
      for (k = 3; k < 6; k++) {
        next:
        for (m = 6; m < 9; m++) {
          if (y === k && x === m) {
            continue next;
          }
          if(arr[y][x] === arr[k][m]) {
            return false;
          }
        }
      } 
    } 
    if (x < 3 && y >= 6) {
      for (k = 6; k < 9; k++) {
        next:
        for (m = 0; m < 3; m++) {
          if (y === k && x === m) {
            continue next;
          }
          if(arr[y][x] === arr[k][m]) {
            return false;
          }
        }
      } 
    } 
    if (x >=3 && x < 6 && y >= 6) {
      for (k = 6; k < 9; k++) {
        next:
        for (m = 3; m < 6; m++) {
          if (y === k && x === m) {
            continue next;
          }
          if(arr[y][x] === arr[k][m]) {
            return false;
          }
        }
      } 
    }
    if (x >= 6 && y >= 6) {
      for (k = 6; k < 9; k++) {
        next:
        for (m = 6; m < 9; m++) {
          if (y === k && x === m) {
            continue next;
          }
          if(arr[y][x] === arr[k][m]) {
            return false;
          }
        }
      } 
    }
    return arr;
  }

  // Recursive function of searching the remaining values
  function recSearch(arr, done, solvedArr, yItem, xItem) {
    let recArr = JSON.parse(JSON.stringify(arr));
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (typeof arr[y][x] === "object") {
          let i = 0;
          while ( i < arr[y][x].length) { 
            recArr[y][x] = arr[y][x][i];
            //console.log("значение=" + arr[y][x][i]);
            let result = validation(recArr, y, x);
            if (y === yItem && x === xItem && result){
              done[0] = true; // Use the array property to display the desired value.
              solvedArr[0] = result; 
            }
            if (done[0]) { 
              return solvedArr[0]; 
            }
            if (result && !done[0]) {
              recSearch(recArr, done, solvedArr, yItem, xItem);
            }  
            i++;
          }
          return;
        }
      }
    }
  }

  // Function of determining y and x the last undefined element.
  function lastArr(arr) {
    for (let y = 8; y > 0; y--) {
      for (let x = 8; x > 0; x--) {
        if (typeof arr[y][x] === "object") {
          return [y, x];
        }
      }
    }
  }

  
  let countOut = 0;
  while (countOut < 8){ // Loop recursion.
    arr = bustSingles(arr, true); 
    countOut++;
  }
  arr = bustSingles(arr, false);
  let yx = lastArr(arr);
  if (!yx) {
    return arr;
  }
  return recSearch(arr, [false], [0], yx[0], yx[1]);         
}

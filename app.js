var width = 900
var height = 800
const visibleButtonIndices = {};
let upScrollStack = []; // scroll left
let downScrollStack = []; //scroll right
let currentFrameStack = [];
let temp = [];
let inStack = false;
let scrolled = false;
let allColumns;
var margin  = {
    top: 40,
    bottom: 40,
    left: 60,
    right: 60
}

var viewport = {
    width: 150,
    height: 150
}

function resetStack(){
  upScrollStack = [];
  downScrollStack = [];
  currentFrameStack = [];
}
// Idea: make 3 SVG Canvases in order to hold all the buttons

// Sample data for orders, buttons, and values
var ordersData = [];

const dataframeData = [
  {
    name: 'All Rice',
    columns: ['Rice 1 SRV', 'Rice 2 SRV', 'Rice 4 SRV'],
    values: [
      ['HBR 1 Serv', 'HCR 1 Serv','HCR 1 Serv S','HSR 1 Serv','HSR 1 Serv S','Veg Fd Rice 1Sv','Vg Fd Rice1Sv S','Brown Rice 1 Sv','Brwn Rice 1Sv S','Steam Rice 1 Sv','Steam Rice 1 SvS','Sushi Rice 1 Sv','SushiRice 1Sv S'],
      ['HBR 2 Srv S','HCR 2 Srv S','HSR 2 Srv S','Ben S Rice 2 Sv','Brown Rice 2 Sv','Steam Rice 2 Sv'],
      ['HBR 4 Srv S','HCR 4 Srv S','HSR 4 Srv S','VFR 4 Srv S']
    ]
  },
  {
    name: 'Lunch Specials',
    columns: [undefined, 'BOATS', undefined,'MEAT',"SEAFOOD",undefined],
    values: [
      ['Steak Juli L','Filet Mignon L','Hib Chicken L','Hib Shrimp L','Hib Steak L','L Sushi Combo','Scallops L','Spcy Hib Ckn L'],
      ['Boat Col Shrimp', 'Boat FM', 'Boat Spcl Steak','Boat Spcl Chick','Boat Spcl Salm'],
      ['Lunch Duet','Pick Yaki L',undefined,undefined,'HCR 1 Serv','HBR 1 Serv','HSR 1 Serv'],
      ['Steak Juli L','Hib Chicken L S','Hib Lem Ch L S','Filet Mignon LS','Hib Steak L S','Spcy Hib CH L S'],
      ['Hib Shrimp L S','Scallops L S','L Sushi Combo S','Bwl Poke Salm','Bwl Poke Tuna'],
      ['Lunch Duet S','Pick Yaki L S',undefined,undefined,"HCR 1 Serv S",'HBR 1 Serv S','HSR 1 Serv S']
    ]
  },
  {
    name: 'Specialties',
    columns: [undefined, undefined, undefined, "Hospitality"],
    values: [
      ['Beni Delight', 'Beni Excellence', 'Beni Special','Benihana Trio','Deluxe Treat','Emperors Feast','Hib Supreme',"Land 'N Sea"],
      ['Ribeye', 'Ribeye & Ckn', 'Ribeye & Col Sh','Ribeye & Lob','Ribeye & Scal',"Rocky's Choice",'Samurai Treat','Splsh N Meadow'],
      ['HCR 1 Serv','HBR 1 Serv','HSR 1 Serv',undefined,'Soup','Salad','Rice Bowl'],
      ['Hosp Cali','Hosp Ch Shp RL','Hosp Eda','Hosp LV RL','Hosp Shr Crn RL','Hosp Spicy Tuna']
    ]
  },
  {
    name: 'Meat/Seafood',
    columns: ['MEAT', 'SEAFOOD', undefined],
    values: [
      ['Filet Mignon', 'Hib Chateaubrnd', 'Hibachi Chicken','Hibachi Steak','Ribeye','Spicy Hib Chk','Teriyaki Chk','Teriyaki Steak'],
      ['Colossal Shrimp', 'Hibachi Scallop', 'Hibachi Shrimp','Hib Sal Avo Tar', 'Hib Tuna Steak','Ocean Treasure','Sp Hib Shrimp','Surf Side','Twin Lob Tails'],
      ['HCR 1 Serv','HBR 1 Serv','HSR 1 Serv',undefined,undefined,undefined,undefined,'Soup','Salad','Rice Bowl']
    ]
  },
  {
    name: 'Noodle/Tofu',
    columns: ['UDON', 'TOFU', undefined,'YAKISOBA','RAMEN',undefined],
    values: [
      ['Seafood Diablo'],
      ['Spcy Tofu Steak'],
      ['HCR 1 Serv','HBR 1 Serv','HSR 1 Serv'],
      ['Yaki Chicken','Yaki Shrimp','Yaki Steak','Yaki Trio'],
      ['RAMEN Chashu','RAMEN Sp Ch Gar','RAMEN Tonkotsu'],
      ['Soup','Salad','Rice Bowl']
    ]
  },
  {
    name: 'Apps/Side Order',
    columns: ['SAL/VG/SP/NDL', 'TEMPURA', 'SAUTE','TEMP/NOODLE','SEAFOOD','SAUTÈ'],
    values: [
      ['Benihana Salad', 'Edamame', 'Edamame Spicy','Miso Soup','Onion Soup','Pick Seawed Sal','White Noodle','Yakisoba Appt'],
      ['Calamari Temp', 'Chicken Temp', 'Scallop Tempura','Shrimp Tempura','Veg Tempura'],
      ['Calamari Saute', 'Scallop Saute', 'Shrimp Saute','Veg Mix Saute','HBR 1 Serv','HCR 1 Serv','HSR 1 Serv'],
      ['Calamari Temp S','Chicken Temp S','Scallop Temp S','Veg Tempura S','White Noodle S','Yakisoba Appt S'],
      ['Calamari Ste S','Chili Pnz YTail','Sashimi Sampler','Seared Tuna','Soft Shell Crab','Sushi Sampler'],
      ['Scallop Saute S','Shrimp Saute S','Veg Mix Saute S','HBR 1 Serv S','HCR 1 Serv S','HSR 1 Serv S']
    ]
  },
  {
    name: 'Kabuki Kids',
    columns: ['SIDES/ROLLS', 'MEAT/SEAFOOD', 'COMBINATIONS'],
    values: [
      ['Pick Kids Drinks','Kid Cali Roll', 'Kid Edamame','Kid Noodle Side','Kid HCR 1 Serv','Kid HBR 1 Serv','Kid HSR 1 Serv'],
      ['Soup','Kid Chicken', 'Kid Ckn Temp', 'Kid Ckn Tender','Kid FM', 'Kid Shrimp','Kid Steak'],
      ['Salad','Kid FM & Ckn','Kid FM & Shrimp','Kid Ckn & Shr','Kid Ckn & Stk','Kid Stk & Shr']
    ]
  }
];

const allMenuData = dataframeData.reduce((accumulator, dataframe) => {
    // Concatenate values from each sublist into the accumulator, filtering out undefined values
    return accumulator.concat(
      dataframe.values.reduce((valuesAccumulator, sublist) => {
        return valuesAccumulator.concat(sublist.filter(value => value !== undefined));
      }, [])
    );
  }, []);


// Select sections using D3
const ordersSection = d3.select('#ordersSection');
const buttonsSection = d3.select('#buttonsSection');
const valuesSection = d3.select('#valuesSection');
const difficultySection = d3.select('#difficultySection');
const challengeSection = d3.select("#challengeSection")
const timerSection = d3.select("#timerSection");
const leaderboard = d3.select("#leaderboard")




// var randValueArray = Math.floor(Math.random() * allMenuData.length)
function resetChallenge(){
    challengeSection.html("")
    updateOrdersSection(null,false)
    
    
}
// Used to hold times for a leaderboard
const leaderboardData = [];

var easyDifficultyButton = difficultySection.select('#difficultyButton-easy');
var mediumDifficultyButton = difficultySection.select('#difficultyButton-medium');
var hardDifficultyButton = difficultySection.select('#difficultyButton-hard');

easyDifficultyButton.on("click",function(){createTask('easy')})
mediumDifficultyButton.on("click",function(){createTask('medium')})
hardDifficultyButton.on("click",function(){createTask('hard')})

let difficultyDictionary = {"easy":1,"medium":5,"hard":10}
function createTask(difficulty) {
    
    resetChallenge();
    const startTime = new Date().getTime(); // Record the start time
    var randMenuIndex = Math.floor(Math.random() * allMenuData.length);
    var randMenuItem = allMenuData[randMenuIndex];
    var correctItemList = [];
    var clickCounter = 0;

    switch (difficulty) {
        case 'easy':
            
            challengeSection.append('p').attr("class", 'task').text('Easy - Find "' + randMenuItem + '"');
            break;
        // Add cases for medium and hard here when needed
        case 'medium':
            
            var randMenuIndex = Math.floor(Math.random() * allMenuData.length);
            var randMenuItem = allMenuData[randMenuIndex];
            correctItemList.push(randMenuItem);
            challengeSection.append('p').attr("class", 'task').text('Medium - Find:' );

            // Append the items as an unnumbered list
            var list = challengeSection.append('ul').attr("class", 'task listItem');
            list.append('li').text('"' + randMenuItem + '"');
            for (let i = 0; i < 4; i++){
                var randMenuIndex = Math.floor(Math.random() * allMenuData.length);
                var randMenuItem = allMenuData[randMenuIndex];
                correctItemList.push(randMenuItem);
                // Append each item as a list item
                list.append('li').text('"' + randMenuItem + '"');
            }

            break;
        case 'hard':
            console.log("Do hard diff stuff here")
            break;
        default:
            console.error('Invalid difficulty level:', difficulty);
            return;
    }

    // Set up event listener for orders
    valuesSection.on('click', function () {
        // Get the clicked order (you might need to modify this based on your actual structure)
        var cleanedOrderData = ordersData.filter(value => value !== undefined);
    
        if (clickCounter >= difficultyDictionary[difficulty] - 1 &&  cleanedOrderData.length >= difficultyDictionary[difficulty]){
        var clickedOrder = cleanedOrderData
        
        if (correctItemList.length > 0){
            handleOrderClick(clickedOrder, correctItemList, difficulty,startTime,difficulty);
        }else{
            handleOrderClick(clickedOrder, randMenuItem, difficulty,startTime,difficulty);
        }
        }
        clickCounter++;
        
    });

}

function handleOrderClick(clickedOrder, correctOrder, difficulty,startTime, difficulty) {
    var taskCompleted = false; // Used to check if the task has been successfully completed
    switch(difficulty){
        case 'easy':
            // console.log(clickedOrder)
            if (clickedOrder[clickedOrder.length-1] === correctOrder) {
                taskCompleted = true; // Mark the task as completed
        
                // Calculate the completion time
                const endTime = new Date().getTime();
                const completionTime = endTime - startTime;
        
                // Save the completion time in the local leaderboard array
                leaderboardData.push({
                    user: "Player", // You might want to use an actual user name
                    difficultyLvl: difficulty,
                    time: completionTime,
                });
        
                // Display completion message
                challengeSection.selectAll('p').remove('p')
                if (challengeSection.selectAll('p').size() < 2){
                challengeSection.append('p').attr("class", 'intro').text('Great Job! Creating New Easy Task...');
                }
        
                setTimeout(function(){createTask(difficulty);},1000)
                
                // Display the local leaderboard
                displayLeaderboard();
            }else if (clickedOrder === undefined){
                console.log("Scroll")
            }else{
                if (challengeSection.selectAll('p').size() < 2){
                challengeSection.append('p').attr("class", 'intro').text('Incorrect, Try Again');
                }
                
            }
            break;


        case 'medium':
            console.log(correctOrder)
            var mismatch = false;
            for (let i = 0; i < correctOrder.length; i++){
                if (clickedOrder[i] != correctOrder[i]){
                    taskCompleted = false;
                    mismatch = true;
                }
            }
            if (!mismatch){
                
                taskCompleted = true; // Mark the task as completed
        
                // Calculate the completion time
                const endTime = new Date().getTime();
                const completionTime = endTime - startTime;
        
                // Save the completion time in the local leaderboard array
                leaderboardData.push({
                    user: "Player", // You might want to use an actual user name
                    difficultyLvl: difficulty,
                    time: completionTime,
                });
        
                // Display completion message
                challengeSection.selectAll('p').remove('p')
                if (challengeSection.selectAll('p').size() < 2){
                challengeSection.append('p').attr("class", 'intro').text('Great Job! Creating New Medium Task...');
                }
        
                setTimeout(function(){createTask(difficulty);},1000)
                
                // Display the local leaderboard
                displayLeaderboard();
            }else{
                challengeSection.select('ul').remove('ul')
                challengeSection.append('p').attr("class", 'intro').text('Values did not match! Resetting Medium Task...');
                setTimeout(function(){createTask(difficulty);},1000)
            }
            break;
        case 'hard':
            break;
        default:
            console.error('Invalid difficulty level:', difficulty);
            return;
    }
    
}

// Usage example:
// createTask('easy'); // Triggering an easy task

displayLeaderboard();

function displayLeaderboard() {
    leaderboard.html("")
    // Sort the leaderboard data by time (ascending)
    var sortedLeaderboard = leaderboardData.sort((a, b) => a.time - b.time);
    if (sortedLeaderboard.length > 3){
        sortedLeaderboard = sortedLeaderboard.slice(0,3)
    }
    // Display the leaderboard
    leaderboard.append('p').attr("class", 'leaderboard-data').text('Local Leaderboard:');
    sortedLeaderboard.forEach((entry, index) => {
        leaderboard.append('p').attr("class", 'leaderboard-data').text(`${index + 1}. ${entry.user} - ${entry.time/1000} seconds (${entry.difficultyLvl})`);
    });
}



function addResetButton(){
    ordersSection.append('button').attr("class",'button').text("Reset Order").on("click",function(){
        updateOrdersSection(null,false)
    })
}
addResetButton()
// Initial update of orders, buttons, and values
// updateOrders();
updateButtons(dataframeData);
updateValues(dataframeData[0]['columns'],dataframeData[0]['values'],0,7,7,3);

// Function to update the orders section
function updateOrders() {
    ordersSection.selectAll('p')
        .data(ordersData)
        .enter()
        .append('p')
        .attr('class','orderData')
        .text(d => d);
  }

function updateOrdersSection(value,flag=false) {
    if (value == null){
        ordersData = [];
        ordersSection.html("")
        addResetButton()
    }
    else if (flag==true) {
      // Append the value to the existing order
      ordersData.push(value);
    } else {
      // Clear the existing order and set the new value
      ordersSection.html("")
      addResetButton()
      ordersData = [];
      if (value.classList.contains("scroll-button")){
          ordersData.push(" ");
        }else{
      ordersData.push(value);
        }
    }
    updateOrders();
}

// Function to update the buttons section
function updateButtons(dataframeData) {
  
  const buttons = buttonsSection.selectAll('button')
    .data(dataframeData);

  buttons.enter()
    .append('button')
    .attr('class','button buttons-section-button')

    .text(d => d.name)
    .on('click', function (pointerEvent, dataframe) {
      resetStack();
      // On button click, update the values section with the columns and values of the selected dataframe
      updateValues(dataframe.columns, dataframe.values);
    });

  buttons.exit().remove();
}

function updateValues(columns, valuesData, startIndex = 0, endIndex = 7, step = 7, columnStep = 3) {
  // Clear the existing content
  if (!scrolled){scrolled=false;}
  valuesSection.html('');
  let currentlyDisplayedValues = [];
  let currentlyDisplayedColumns = [];

  // Display column names
  if (Array.isArray(columns)) {
    for (let i = 0; i < columnStep; i++) {
      // Create a container for each column
      const columnContainer = valuesSection.append('div')
        .attr('class', 'column-container');

      // Add a button to the column container
      const button = columnContainer.append('button')
        .attr('class', 'no-hover-button')
        .text(columns[i]);
      if (columns[i] == undefined) {
        button.remove('button');
      }
      currentlyDisplayedColumns.push(columns[i]);
      // Initialize the visibleButtonIndices for each column
      visibleButtonIndices[i] = 0;
    }
  }

  // Display each value as a button corresponding to a column
  let rValuesList = []; // will hold remaining values - values yet to be displayed.
  let newValuesData = [];

  valuesData.forEach((list, colIndex) => {
    if (list.slice(0, step).length < list.length) {
      rValuesList.push(list.slice(step, list.length))
    } else if (colIndex > 2) {
      rValuesList.push(list)
    }
    const columnContainer = valuesSection.select(`.column-container:nth-child(${colIndex + 1})`);
    if (columnContainer.empty()) {
      return; // Skip columns with no data
    }
    for (let i = startIndex; i < endIndex; i++) {
      const value = list[i];
      currentlyDisplayedValues.push(list[i]);

      const button = columnContainer.append('button')
        .attr('class', 'button values-section-button')
        .text(value || '') // Ensure value is not undefined
        .on('click', function () {
          // Handle button click and update the orders section
          updateOrdersSection(value, true);
        })
        .classed(`column-${colIndex + 1}`, true) // Add a class indicating the column index
        .classed('blank-space-button', value === undefined || value === " ");
    }
    newValuesData.push(list);
    // Update the visibleButtonIndices for each column
    visibleButtonIndices[colIndex] += endIndex - startIndex;
  });

  // console.log("Remaining Values: ",rValuesList);
  // console.log("Values to Save to stack: ",newValuesData);

  console.log("Down Stack (Next Values): ", downScrollStack);
  console.log("Up Stack (Prev. Values): ", upScrollStack);
  console.log("Current Frame Stack: ", currentFrameStack);
  
// Best working scroll
  // // Add a separate scroll down button if there are more columns to show
  if (columns.length > columnStep || valuesData.some((list, colIndex) => visibleButtonIndices[colIndex] < list.length) ) {
    if (rValuesList.length == 0){scrolled=false;}
    const scrollDownButton = valuesSection.append('button')
      .text('Scroll Down')
      .classed('scroll-button-down', true)
      .on('click', function () {
        
        // Filter columns to include only those that haven't been displayed or have values yet to be displayed
        const remainingColumns = columns.filter((col, colIndex) => {
          
          const isDisplayed = currentlyDisplayedColumns.includes(col); // Check if the column is already displayed
          const hasData = valuesData[colIndex].slice(startIndex, endIndex).some(value => value !== undefined && value !== " ");

          console.log(`Column: ${col}, isDisplayed: ${isDisplayed}, hasData: ${hasData}, visibleButtonIndices: ${visibleButtonIndices[colIndex]}`);
          if (scrolled){return ((isDisplayed || (hasData)) && ((visibleButtonIndices[colIndex] < valuesData[colIndex].length) || visibleButtonIndices[colIndex] == undefined));}
          return ((!isDisplayed || (hasData)) && ((visibleButtonIndices[colIndex] < valuesData[colIndex].length) || visibleButtonIndices[colIndex] == undefined));
        });
        
        
        // console.log("Remaining Columns: ", remainingColumns);
        
        // push the current frame to the "scroll up" stack so we have something to return to
        if(downScrollStack.length == 0 ){
        currentFrameStack.push({
          name: 'df1', // replace with actual name
          columns: currentlyDisplayedColumns.slice(),
          values: newValuesData.slice()
        });
      }
      
      if (downScrollStack.length >= 1 && upScrollStack.length == 0){ /* at the beginning of the stack, but with information about next */ 
        // upScrollStack.push(downScrollStack.pop());currentFrameStack.push(upScrollStack.pop());
        upScrollStack.push(currentFrameStack.pop());
        currentFrameStack.push(downScrollStack.pop());
        console.log("ooooo")
      }

        // push next screen to "scroll down" stack 
        downScrollStack.push({
          name: 'df1', // replace with actual name
          columns: remainingColumns.slice(),
          values: rValuesList.slice()
        })
        const currentFrame = downScrollStack.pop();
        
        // Change scrolled value in order to enable left clicking
        scrolled = true;
        upScrollStack.push(currentFrameStack.pop());
        currentFrameStack.push(currentFrame);
        // scroll
        updateValues(currentFrame.columns, currentFrame.values, startIndex, endIndex, step, columnStep);
      });
  }

  // Scroll Up 
  console.log("Can Scroll Left? ", scrolled)
  // Add a separate scroll up button if scrolling left is possible
  if (upScrollStack.length == 0) scrolled = false;
  if (scrolled) {
    const scrollUpButton = valuesSection.append('button')
      .text('Scroll Up')
      .classed('scroll-button-up', true)
      .on('click', function () {
        // Pop the previous frame from the stack
        // const currentFrame = down
        const previousFrame = upScrollStack.pop();
        if (previousFrame){
          
        }
        downScrollStack.push(currentFrameStack.pop())
        const currentFrame = currentFrameStack.push(previousFrame);
        
        
        if (upScrollStack.length == 0){
        scrolled = false;inStack = false;}
        if (previousFrame) {
          updateValues(previousFrame.columns, previousFrame.values, startIndex, endIndex, step, columnStep);
        }
      });
  }
}
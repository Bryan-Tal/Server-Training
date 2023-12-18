var width = 900
var height = 800
const visibleButtonIndices = {};

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
      ['HBR 4 Srv S','HCR 4 Srv S','HSR 4 Srv S','VFR 4 Srv S'],
      ['HCR 1 Serv','HCR 2 Srv S','HCR 4 Srv S']
    ]
  },
  {
    name: 'Dataframe 2',
    columns: ['Column 2A', 'Column 2B', 'Column 2C'],
    values: [
      ['Value 1A', 'Value 1B', 'Value 1C'],
      ['Value 2A', 'Value 2B', 'Value 2C'],
      ['Value 3A', 'Value 3B', 'Value 3C']
    ]
  },
  {
    name: 'Dataframe 3',
    columns: ['Column 3A', 'Column 3B', 'Column 3C'],
    values: [
      ['Value 1A', 'Value 1B', 'Value 1C'],
      ['Value 2A', 'Value 2B', 'Value 2C'],
      ['Value 3A', 'Value 3B', 'Value 3C']
    ]
  },
  {
    name: 'Dataframe 4',
    columns: ['Column 1A', 'Column 1B', 'Column 1C'],
    values: [
      ['Value 1A', 'Value 1B', 'Value 1C'],
      ['Value 2A', 'Value 2B', 'Value 2C'],
      ['Value 3A', 'Value 3B', 'Value 3C']
    ]
  },
  {
    name: 'Dataframe 5',
    columns: ['Column 2A', 'Column 2B', 'Column 2C'],
    values: [
      ['Value 1A', 'Value 1B', 'Value 1C'],
      ['Value 2A', 'Value 2B', 'Value 2C'],
      ['Value 3A', 'Value 3B', 'Value 3C']
    ]
  },
  {
    name: 'Dataframe 6',
    columns: ['Column 3A', 'Column 3B', 'Column 3C'],
    values: [
      ['Value 1A', 'Value 1B', 'Value 1C'],
      ['Value 2A', 'Value 2B', 'Value 2C'],
      ['Value 3A', 'Value 3B', 'Value 3C']
    ]
  }
];

// Select sections using D3
const ordersSection = d3.select('#ordersSection');
const buttonsSection = d3.select('#buttonsSection');
const valuesSection = d3.select('#valuesSection');

function addResetButton(){
    ordersSection.append('button').attr("class",'button').text("Reset Order").on("click",function(){
        updateOrdersSection(null,false)
    })
}
addResetButton()
// Initial update of orders, buttons, and values
// updateOrders();
updateButtons(dataframeData);
updateValues(dataframeData[0]['columns'],dataframeData[0]['values']);

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
      console.log(value.classList)
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
        
      // On button click, update the values section with the columns and values of the selected dataframe
      updateValues(dataframe.columns, dataframe.values);
    });

  buttons.exit().remove();
}




// best working 
// function updateValues(columns, valuesData, startindex=0,endindex=7) {
//     // Clear the existing content
//     valuesSection.html('');
  
//     // Display column names
//     if (Array.isArray(columns)) {
//         columns.forEach((col, colIndex) => {
//         // Create a container for each column
//         const columnContainer = valuesSection.append('div')
//             .attr('class', 'column-container');

//         // Add a button to the column container
//         columnContainer.append('button')
//             .attr('class', 'no-hover-button')
//             .text(col);
        
//         // Initialize the visibleButtonIndices for each column
//         visibleButtonIndices[colIndex] = 0;
//         });
//     }
  
//     // Display each value as a button corresponding to a column
//     valuesData.forEach((list, colIndex) => {
//     // Create a container for each column
//     const columnContainer = valuesSection.select(`.column-container:nth-child(${colIndex + 1})`);

//     // Determine the start and end indices for the current set of buttons
//     const startIndex = startindex
//     const endIndex = Math.min(startIndex + 7, list.length);

//     // Add buttons to the column container
//     for (let i = startIndex; i < endIndex; i++) {
//       const value = list[i];
//       const button = columnContainer.append('button').attr("class",'button')
//         .text(value || '') // Ensure value is not undefined
//         .on('click', function () {
//           // Handle button click and update the orders section
//           updateOrdersSection(value, true);
//         })
//         .classed(`column-${colIndex + 1}`, true) // Add a class indicating the column index
//         .classed('blank-space-button', value === undefined);
//     }

//     // Update the visibleButtonIndices for each column
//     visibleButtonIndices[colIndex] = endIndex;
//     });

//     // Add a separate scroll button if there are more buttons to show
//     if (valuesData.some((list, colIndex) => visibleButtonIndices[colIndex] < list.length)) {
//         const scrollButton = valuesSection.append('button')
//         .text('Scroll')
//         .classed('scroll-button', true)
//         .on('click', function () {
//             // Handle scroll button click by updating the visible set of buttons
//             updateValues(columns, valuesData, startindex+7, endindex+7);
//         });
//   }
// }

function updateValues(columns, valuesData, startIndex = 0, endIndex = 7, step = 7) {
    // Clear the existing content
    valuesSection.html('');
  
    // Display column names
    if (Array.isArray(columns)) {
      columns.forEach((col, colIndex) => {
        // Create a container for each column
        const columnContainer = valuesSection.append('div')
          .attr('class', 'column-container');
  
        // Add a button to the column container
        columnContainer.append('button')
          .attr('class', 'no-hover-button')
          .text(col);
  
        // Initialize the visibleButtonIndices for each column
        visibleButtonIndices[colIndex] = 0;
      });
    }
  
    // Display each value as a button corresponding to a column
    valuesData.forEach((list, colIndex) => {
      // Create a container for each column
      const columnContainer = valuesSection.select(`.column-container:nth-child(${colIndex + 1})`);
  
      // Add buttons to the column container
      for (let i = startIndex; i < endIndex; i++) {
        const value = list[i];
        const button = columnContainer.append('button').attr("class",'button values-section-button')
          .text(value || '') // Ensure value is not undefined
          .on('click', function () {
            // Handle button click and update the orders section
            updateOrdersSection(value, true);
          })
          .classed(`column-${colIndex + 1}`, true) // Add a class indicating the column index
          .classed('blank-space-button', value === undefined);
      }
  
      // Update the visibleButtonIndices for each column
      visibleButtonIndices[colIndex] = endIndex;
    });
  
    // Add a separate scroll up button if scrolling up is possible
    if (startIndex >= step) {
      const scrollUpButton = valuesSection.append('button')
        .text('Scroll Up')
        .classed('scroll-button-up', true)
        .on('click', function () {
          // Handle scroll up button click by updating the visible set of buttons
          updateValues(columns, valuesData, startIndex - step, endIndex - step, step);
        });
    }
  
    // Add a separate scroll down button if there are more buttons to show
    if (valuesData.some((list, colIndex) => visibleButtonIndices[colIndex] < list.length)) {
      const scrollDownButton = valuesSection.append('button')
        .text('Scroll Down')
        .classed('scroll-button-down', true)
        .on('click', function () {
          // Handle scroll down button click by updating the visible set of buttons
          updateValues(columns, valuesData, startIndex + step, endIndex + step, step);
        });
    }
  }
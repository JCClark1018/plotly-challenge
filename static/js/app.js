// create function to draw bar graph
// various code taken from office hours with instructor
function DrawBars(sampleID) {
    console.log(`DrawBars(${sampleID})`);

    d3.json("samples.json").then((data) => {
        
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        // code taken from office hours with instructor
        var yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(), 
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }
    
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }
    
        Plotly.newPlot("bar", [barData], barLayout);
    });
}

// create a function to draw the bubble chart
function DrawBubbles(sampleID) {
    //console.log(`DrawBubblechart(${sampleID})`);

    d3.json("samples.json").then((data) => {
        // reusing the above code s
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        
        var Bubbles = {
            x: otu_ids,
            y: sample_values,
            type: "scatter",
            mode: "markers",
            marker: {
                color: otu_ids,
                opacity: [1, 0.8, 0.6, 0.4],
                size: sample_values
            },
            text: otu_labels
        };

        var bubblesLayout = {
            title: "Sample Bacteria Cultures Found",
            margin:{t: 30, l: 150}
        };
        
        Plotly.newPlot("bubble", [Bubbles], bubblesLayout)
    });
}

// Display Metadata
function MetaDisp(sampleID)
{
    console.log(`MetaDisp(${sampleID})`);

    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == sampleID);
        var result = resultArray[0];

        var panel = d3.select("#sample-metadata");
        panel.html("");

        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

// function to update all graphs and other information with new selection
// code from office hours with instructor
function optionChanged(newSampleID) {
    console.log(`User selected ${newSampleID}`);

    DrawBars(newSampleID);
    DrawBubbles(newSampleID);
    MetaDisp(newSampleID);
}

function InitDashboard()
{
    console.log('calling InitDashboard');
    // select the selector ID
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data);

        var sampleNames = data.names;

        // populate the slector with all sample IDs
        sampleNames.forEach((sampleID) => {
            selector.append("option")
                .text(sampleID)
                .property("value", sampleID);
            
        });
        var sampleID = sampleNames[0];
        console.log("Starting Sample: ", sampleID);

        DrawBars(sampleID);
        DrawBubbles(sampleID);
        MetaDisp(sampleID);
    });
}

InitDashboard();
// Collapses all output
function webdeveloper_collapseAllOutput(event)
{
    webdeveloper_pivotAllOutput(event, false);
}

// Expands all output
function webdeveloper_expandAllOutput(event)
{
    webdeveloper_pivotAllOutput(event, true);
}

// Makes all output on the page pivotable
function webdeveloper_makeOutputPivotable()
{
    var collapseAll       = document.getElementById("webdeveloper-generated-tool-collapse-all");
    var expandAll         = document.getElementById("webdeveloper-generated-tool-expand-all");
    var spanElementList   = webdeveloper_evaluateXPath(document, "//span[@class='expanded pivot']");
    var spanElementLength = spanElementList.length;

    // Loop through the span elements
    for(var i = 0; i < spanElementLength; i++)
    {
        spanElementList[i].addEventListener("click", webdeveloper_pivotOutput, false);
    }

    // If the collapse all element is found
    if(collapseAll)
    {
        collapseAll.addEventListener("click", webdeveloper_collapseAllOutput, false);
    }

    // If the expand all element is found
    if(expandAll)
    {
        expandAll.addEventListener("click", webdeveloper_expandAllOutput, false);
    }
}

// Pivots all output
function webdeveloper_pivotAllOutput(event, expand)
{
    var divElementList    = null;
    var divElementLength  = null;
    var spanElementList   = null;
    var spanElementLength = null;

    // If expanding
    if(expand)
    {
        divElementList    = webdeveloper_evaluateXPath(document, "//div[@class='collapsed output']");
        divElementLength  = divElementList.length;
        spanElementList   = webdeveloper_evaluateXPath(document, "//span[@class='collapsed pivot']");
        spanElementLength = spanElementList.length;

        // Loop through the div elements
        for(var i = 0; i < divElementLength; i++)
        {
            divElementList[i].setAttribute("class", "output");
        }

        // Loop through the span elements
        for(i = 0; i < spanElementLength; i++)
        {
            spanElementList[i].setAttribute("class", "expanded pivot");
        }
    }
    else
    {
        divElementList    = webdeveloper_evaluateXPath(document, "//div[@class='output']");
        divElementLength  = divElementList.length;
        spanElementList   = webdeveloper_evaluateXPath(document, "//span[@class='expanded pivot']");
        spanElementLength = spanElementList.length;

        // Loop through the div elements
        for(var i = 0; i < divElementLength; i++)
        {
            divElementList[i].setAttribute("class", "collapsed output");
        }

        // Loop through the span elements
        for(i = 0; i < spanElementLength; i++)
        {
            spanElementList[i].setAttribute("class", "collapsed pivot");
        }
    }

    event.preventDefault();
}

// Pivots output
function webdeveloper_pivotOutput(event)
{
    // If the event is set
    if(event)
    {
        var pivot  = event.target;
        var output = pivot.parentNode.nextSibling;

        // If the output element is found
        if(output)
        {
            // If the output class attribute is set to collapsed
            if(output.getAttribute("class") == "collapsed output")
            {
                output.setAttribute("class", "output");
                pivot.setAttribute("class", "expanded pivot");
            }
            else if(output.getAttribute("class") == "output")
            {
                output.setAttribute("class", "collapsed output");
                pivot.setAttribute("class", "collapsed pivot");
            }
        }
    }
}

webdeveloper_makeOutputPivotable();

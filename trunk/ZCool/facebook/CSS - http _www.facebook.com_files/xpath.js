// Evaluates an XPath against a given node
function webdeveloper_evaluateXPath(node, xPath)
{
    var namespaceResolver = null;
    var namespaceURI      = webdeveloper_getNamespaceURI(node);
    var result            = null;
    var resultList        = new Array();
    var results           = null;
    
    // If the node has a namespace URI
    if(namespaceURI)
    {
        namespaceResolver = new WebDeveloperNamespaceResolver(namespaceURI);
        xPath             = xPath.replace(/\/\//gi, "//webdeveloper:");
    }
    
    results = new XPathEvaluator().evaluate(xPath, node, namespaceResolver, XPathResult.ANY_TYPE, null);

    // Loop through the results
    while((result = results.iterateNext()) != null)
    {
        resultList.push(result);
    }

    return resultList;
}

// Returns the namespace URI for a node 
function webdeveloper_getNamespaceURI(node)
{
    // If the node has an owner document
    if(node.ownerDocument)
    {
        return node.ownerDocument.documentElement.namespaceURI;
    }

    return node.documentElement.namespaceURI;
}

// Constructs a namespace resolver object
function WebDeveloperNamespaceResolver(namespaceURI)
{
    this.namespaceURI = namespaceURI;
}

// Looks up the namespace URI
WebDeveloperNamespaceResolver.prototype.lookupNamespaceURI = function(prefix)
{
    return this.namespaceURI;
}



function fn(){
    const links = [
        {
          label: "Week1 notes",
          url: "week1/index.html"
        },
        {
            label: "Week2 notes",
            url: "week1/index.html"
        }
      ]
    for (let i = 0; i < links.length; i++) {
        // Create anchor element.
        var a = document.createElement('a'); 

        // Create the text node for anchor element.
        var link = document.createTextNode(links[i].label);

        // Append the text node to anchor element.
        a.appendChild(link); 

        // Set the title.
        a.label = links[i].label; 

        // Set the href property.
        a.href = links[i].url; 

        // Append the anchor element to the body.
        document.body.prepend(a); 
        //var list = document.getElementById("list");

        var node = document.createElement('li');
        node.appendChild(a);
        
        document.querySelector('ol').appendChild(node);
    }
 }
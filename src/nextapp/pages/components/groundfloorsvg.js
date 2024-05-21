import React, { useState } from 'react';

function Groundfloor() {

  const [hoveredPaths, setHoveredPaths] = useState([]);

  const handleMouseEnter = (pathId) => {
    if (!hoveredPaths.includes(pathId)) {
      setHoveredPaths([...hoveredPaths, pathId]);
    }
  };

  const handleMouseLeave = (pathId) => {
    setHoveredPaths(hoveredPaths.filter((id) => id !== pathId));
  };
    

    

return (
  <div style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>



<svg
   version="1.1"
   id="svg1"
   width="100%"
   height="60%"
   viewBox="0 0 525.59998 254.39999"
   sodipodi:docname="groundfloor.svg"
   inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)"
   xmlnsinkscape="http://www.inkscape .org/namespaces/inkscape"
   xmlnssodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlnsXlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlnssvg="http://www.w3.org/2000/svg">
  <defs
     id="defs1" />
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     showgrid="false"
     inkscape:zoom="1.8215803"
     inkscape:cx="236.33325"
     inkscape:cy="203.39482"
     inkscape:window-width="1920"
     inkscape:window-height="1001"
     inkscape:window-x="-9"
     inkscape:window-y="-9"
     inkscape:window-maximized="1"
     inkscape:current-layer="g1" />
  <g
     inkscape:groupmode="layer"
     inkscape:label="Image"
     id="g1">
    <image
       width="525.59998"
       height="254.39999"
       preserveAspectRatio="none"
       xlinkHref="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsK&#10;CwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQU&#10;FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAE+ApEDASIA&#10;AhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA&#10;AAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3&#10;ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm&#10;p6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA&#10;AwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx&#10;BhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK&#10;U1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3&#10;uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KK&#10;KACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoooo&#10;AKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigA&#10;ooooAKKKKACiiigAooooAKKKKACiiigAooooAKK+RdD1S9b/AIKoeIdPN3ObBfhaswtTK3lCT+0Y&#10;Bv25xuwSM4zX11QAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABR&#10;RRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFF&#10;FABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUU&#10;AFFFFAHx3oP/ACli8R/9koT/ANOUFfYlfHeg/wDKWLxH/wBkoT/05QV9iUAFFFFABRRRQAUUUUAF&#10;FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUU&#10;UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRR&#10;QAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFeeeK/jl4b8G/GDwP8ADW/W9PiPxhFeTaa0&#10;MIaALbRGWXzH3Ar8qnGAcn0oA9DooooA/JTw/wDs++KY/wDgrpe6MdX1f+w7WZvFLXH2yXLaYSs8&#10;dtndkwi5ZISh+X5Twa/WusCPwLosfjyfxkLJP+Eim02PSGvf4vsqSvKI/pvcn8q36ACiivPPA/xy&#10;8N/EH4n+P/AWlrejXPBL2iao1xCFhJuY2kj8pgxLcIc5Ax70Aeh0UUUAFFFFABRRRQAUUUUAFfnl&#10;8F5v2mv2oLr4j6/ofx/h8EaTovjLUvD9tpP/AAitndhI4DGyEOVBxtlC85Py5JOa/Q2vjv8A4Jm/&#10;8iL8aP8Asqet/wDou1oAP+Gcf2sP+jrYP/CIsaP+Gcf2sP8Ao62D/wAIixr7EooA+O/+Gcf2sP8A&#10;o62D/wAIixo/4Zx/aw/6Otg/8Iixr7EooA+O/wDhnH9rD/o62D/wiLGj/hnH9rD/AKOtg/8ACIsa&#10;+xKKAPjv/hnH9rD/AKOtg/8ACIsaP+Gcf2sP+jrYP/CIsa+xKKAPjv8A4Zx/aw/6Otg/8Iixo/4Z&#10;x/aw/wCjrYP/AAiLGvsSigD47/4Zx/aw/wCjrYP/AAiLGj/hnH9rD/o62D/wiLGvsSigD47/AOGc&#10;f2sP+jrYP/CIsaP+Gcf2sP8Ao62D/wAIixr7EooA+O/+Gcf2sP8Ao62D/wAIixo/4Zx/aw/6Otg/&#10;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&#10;ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACi&#10;iigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKK&#10;KACiiigAooooAK8J/aq+AetfHj/hVv8AY2oWFh/wifjTT/Et39uLjzYIN+9I9qt853DGcD3Fe7UU&#10;AFFFFAGRqXi/QtH13S9Ev9a06x1nVfM/s/Trm7jjuLzy13SeTGSGk2jk7QcDrWvXx3+0v/yf5+yd&#10;9PEX/pEtfYlABXhNx8A9am/bVtvjINQsBoEXgs+GjYkv9qM/2tpt+Nu3ZtbH3s57V7tRQAUUUUAF&#10;FFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUU&#10;UUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRR&#10;QAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfHf7S/wDyf5+yd9PEX/pE&#10;tfYlfD/7UHjrw3Y/t7fszzXPiHSreLRf7eXU5Jb2JVsTJZqIxOS37st23Yz2r7dhmS4hSWJ1kidQ&#10;yuhyrA8gg9xQA+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKK&#10;ACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA&#10;KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAo&#10;oooA/MD9uL9j8/Ez/goJ8JLuCzL6H452f2yyrwfsADXJY9t1qIlGepB61+nyqFUKoAUDAA6Cq1xp&#10;lpdXtreTW0Ut1a7/ACJnQF4tww209sjg1aoAKKKKACiiigAooooAKKKKACiiigD/2Q==&#10;"
      id="image1"
      style={{ opacity: 0.98734177 }}
      />
      <a href="lg27page">

      <path
        onMouseEnter={() => handleMouseEnter('pathlg27')}
        onMouseLeave={() => handleMouseLeave('pathlg27')}
        d="m 145.47163,68.805462 -31.97658,-0.145568 0.14557,5.386041 v 0.266876 l -1.62552,-0.02426 -0.0759,-5.495261 -13.724344,-0.01716 -0.0772,4.031527 -0.0062,0.528628 -2.438479,0.0032 0.102933,-4.426102 -4.769211,0.05147 0.137244,146.198597 54.526017,0.18116 z"
        id="pathlg27"
        style={{
          opacity: hoveredPaths.includes('pathlg27') ? 1 : 0,
          fill: '#000000',
          stroke: hoveredPaths.includes('pathlg27') ? '#063970' : 'none',
          strokeWidth: hoveredPaths.includes('pathlg27') ? 2 : 0,
          transition: 'opacity 0.3s ease'
          
        }}
      />
      </a>
      <a href="lg26page">
  <path
    onMouseEnter={() => handleMouseEnter('pathlg26')}
    onMouseLeave={() => handleMouseLeave('pathlg26')}
    d="m 246.45496,69.513816 h -7.2396 l -0.0343,2.676247 -1.95572,-0.03431 -0.0343,-2.573315 -19.48857,-0.102933 h -0.41173 l 0.14036,3.304834 -1.35864,0.02426 -0.0485,-3.275295 -5.08071,0.254997 -64.01589,-0.497612 0.58227,145.859821 98.59852,0.097 z"
    style={{
      opacity: hoveredPaths.includes('pathlg26') ? 1 : 0,
      fill: '#000000',
      stroke: hoveredPaths.includes('pathlg26') ? '#063970' : 'none',
      strokeWidth: hoveredPaths.includes('pathlg26') ? 2 : 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'auto' // Make the path interactive
    }}
  />
</a>

<a href="lg25page">
  <path
    onMouseEnter={() => handleMouseEnter('pathlg25')}
    onMouseLeave={() => handleMouseLeave('pathlg25')}
    d="m 348.15176,69.533306 h -8.97674 l 0.0485,3.105465 h -1.31011 l -0.0971,-3.153988 -19.36063,0.145568 0.097,4.464107 -1.74682,0.04852 -0.14557,-4.36706 -68.65989,-0.242614 -0.097,145.811296 h 100.10273 z"
    id="pathlg25"
    style={{
      opacity: hoveredPaths.includes('pathlg25') ? 1 : 0,
      fill: '#000000',
      stroke: hoveredPaths.includes('pathlg25') ? '#063970' : 'none',
      strokeWidth: hoveredPaths.includes('pathlg25') ? 2 : 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'auto' // Make the path interactive
    }}
  />
</a>


<a href="lg25page">
  <path
    onMouseEnter={() => handleMouseEnter('pathlg25')}
    onMouseLeave={() => handleMouseLeave('pathlg25')}
    d="m 348.15176,69.533306 h -8.97674 l 0.0485,3.105465 h -1.31011 l -0.0971,-3.153988 -19.36063,0.145568 0.097,4.464107 -1.74682,0.04852 -0.14557,-4.36706 -68.65989,-0.242614 -0.097,145.811296 h 100.10273 z"
    id="pathlg25"
    style={{
      opacity: hoveredPaths.includes('pathlg25') ? 1 : 0,
      fill: '#000000',
      stroke: hoveredPaths.includes('pathlg25') ? '#063970' : 'none',
      strokeWidth: hoveredPaths.includes('pathlg25') ? 2 : 0,
      transition: 'opacity 0.3s ease'
    }}
  />
</a>


      <text
        xmlSpace="preserve"
       style={{
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "normal",
        fontStretch: "normal",
        fontSize: "11.2552px",
        fontFamily: "Sans",
        WebkitFontSmoothing: "antialiased", // Note: The original "-inkscape-font-specification" is not valid JSX or CSS, so it has been omitted
        opacity: 0.924051,
        fill: "#ffffff",
        fillOpacity: 0.988235,
        strokeWidth: "0.937931px"
      }}
      
       x="101.09734"
       y="114.16307"
       id="text3"
       transform="scale(0.99971512,1.000285)"><tspan
         sodipodi:role="line"
         id="tspan3"
         x="101.09734"
         y="114.16307"
         style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "bold",
            fontStretch: "normal",
            fontFamily: "Arial",
            fill: "#ffffff",
            fillOpacity: 0.988235,
            strokeWidth: 0.937931
          }}
          >LG. 27</tspan><tspan
         sodipodi:role="line"
         x="101.09734"
         y="128.36234"
         style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontStretch: "normal",
  fontFamily: "Sans",
  fill: "#ffffff",
  fillOpacity: 0.988235,
  strokeWidth: 0.937931
}}

         id="tspan4" /><tspan
         sodipodi:role="line"
         x="101.09734"
         y="142.43132"
         style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontStretch: "normal",
  fontFamily: "Sans",
  fill: "#ffffff",
  fillOpacity: 0.988235,
  strokeWidth: 0.937931
}}

         id="tspan5" /></text>
    <text
        xmlSpace="preserve"
       style={{
        fontSize: "10.6054px",
        opacity: "0.924051",
        fill: "#ffffff",
        fillOpacity: "0.988235",
        strokeWidth: "0.883786"
      }}
      
       x="179.20155"
       y="114.06036"
       id="text6"
       transform="scale(1.0084313,0.99163919)"><tspan
         sodipodi:role="line"
         id="tspan6"
         x="179.20155"
         y="114.06036"
         style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "bold",
            fontStretch: "normal",
            fontFamily: "Arial",
            WebkitFontSmoothing: "antialiased", // for -inkscape-font-specification
            strokeWidth: "0.883786"
          }}
          >LG. 26</tspan></text>
    <text
        xmlSpace="preserve"
       style={{
        fontSize: "11.0583px",
        opacity: 0.924051,
        fill: "#ffffff",
        fillOpacity: 0.988235,
        strokeWidth: "0.921527"
      }}
      
       x="265.77023"
       y="119.50848"
       id="text7"
       transform="scale(1.0514956,0.95102637)"><tspan
         sodipodi:role="line"
         id="tspan7"
         x="265.77023"
         y="119.50848"
         style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "bold",
            fontStretch: "normal",
            fontFamily: "Arial",
            WebkitFontSmoothing: "antialiased", // for -inkscape-font-specification
            strokeWidth: "0.921527"
          }}
          >LG. 25</tspan></text>
    <text
        xmlSpace="preserve"
       style={{
        fontSize: "8.64875px",
        opacity: 0.924051,
        fill: "#ffffff",
        fillOpacity: 0.988235,
        strokeWidth: "1.08109"
      }}
             x="100.09658"
       y="137.44179"
       id="text8"
       transform="scale(0.98132539,1.01903)"><tspan
         sodipodi:role="line"
         id="tspan8"
         x="100.09658"
         y="137.44179"
         style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontStretch: "normal",
            fontSize: "8.64875px",
            fontFamily: "Arial",
            WebkitFontSmoothing: "antialiased", // for -inkscape-font-specification
            strokeWidth: "1.08109"
          }}
          >Projects</tspan><tspan
         sodipodi:role="line"
         x="100.09658"
         y="148.35284"
         style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontStretch: "normal",
            fontSize: "8.64875px",
            fontFamily: "Arial",
            WebkitFontSmoothing: "antialiased", // for -inkscape-font-specification
            strokeWidth: "1.08109"
          }}
                   id="tspan9"> 53 - 70</tspan></text>
    <text
        xmlSpace="preserve"
       style={{
        fontSize: "8px",
        whiteSpace: "pre",
        inlineSize: "46.4852",
        display: "inline",
        opacity: 0.924051,
        fill: "#ffffff",
        fillOpacity: 0.988235
      }}
      
       x="181.16138"
       y="138.8904"
       id="text10"
       transform="matrix(1.0913569,0,0,1.2033335,-18.25585,-25.907234)"><tspan
         x="181.16138"
         y="138.8904"
         id="tspan2"><tspan
           style={{
  fontFamily: "Arial",
}}
           id="tspan1">Projects
</tspan></tspan><tspan
         x="181.16138"
         y="148.983"
         id="tspan19"><tspan
           style={{
  fontFamily: "Arial",
}}
           id="tspan11"> 27 - 52</tspan></tspan></text>
    <text
        xmlSpace="preserve"
       style={{
        fontSize: "9.4822px",
        opacity: 0.924051,
        fill: "#ffffff",
        fillOpacity: 0.988235,
        strokeWidth: "1.18528"
      }}
             x="283.01874"
       y="139.64565"
       id="text12"
       transform="scale(0.98499295,1.0152357)"><tspan
         sodipodi:role="line"
         id="tspan12"
         x="283.01874"
         y="139.64565"
         style={{
            fontSize: "9.4822px",
            opacity: 0.924051,
            fill: "#ffffff",
            fillOpacity: 0.988235,
            strokeWidth: "1.18528"
          }}
          >Projects</tspan><tspan
         sodipodi:role="line"
         x="283.01874"
         y="151.60815"
         id="tspan13"
         style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontStretch: "normal",
            fontFamily: "Arial",
            strokeWidth: "1.18528"
          }}
          >  1 - 26</tspan></text>
    <text
        xmlSpace="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "bold",
  fontStretch: "normal",
  fontSize: "8px",
  fontFamily: "Sans",
  opacity: "0.924051",
  fill: "#000000",
  fillOpacity: "0.988235"
}}

       x="474.8624"
       y="18.665112"
       id="text14"><tspan
         sodipodi:role="line"
         id="tspan14"
         x="474.8624"
         y="18.665112"
        style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "bold",
  fontStretch: "normal",
  fontFamily: "Arial"}}

>   Main</tspan><tspan
         sodipodi:role="line"
         x="474.8624"
         y="28.757719"
         id="tspan15"
        style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "bold",
  fontStretch: "normal",
  fontFamily: "Arial"}}

>Entrance</tspan></text>
    <text
        xmlSpace="preserve"
       style={{
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "bold",
        fontStretch: "normal",
        fontSize: "12px",
        fontFamily: "Sans",
        WebkitFontSmoothing: "antialiased", // for -inkscape-font-specification
        opacity: 0.924051,
        fill: "#000000",
        fillOpacity: 0.988235
      }}
      
       x="425.45477"
       y="133.40063"
       id="text16"><tspan
         sodipodi:role="line"
         id="tspan16"
         x="425.45477"
         y="133.40063"
         style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "bold",
            fontStretch: "normal",
            fontSize: "12px",
            fontFamily: "Sans",
            WebkitFontSmoothing: "antialiased",
            opacity: 0.924051,
            fill: "#000000",
            fillOpacity: 0.988235
          }}
          >Main Foyer</tspan></text>
    <text
        xmlSpace="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "bold",
  fontStretch: "normal",
  fontSize: "8px",
  fontFamily: "Sans",
  opacity: "0.924051",
  fill: "#000000",
  fillOpacity: "0.988235"
}}

       x="359.0289"
       y="176.76958"
       id="text17"><tspan
         sodipodi:role="line"
         id="tspan17"
         x="359.0289"
         y="176.76958"
        style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "bold",
  fontStretch: "normal",
  fontFamily: "Arial",}}

>Toilets</tspan></text>
<a xlinkHref="firstfloor" >

    <text
        xmlSpace="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "bold",
  fontStretch: "normal",
  fontSize: "8px",
  fontFamily: "Sans",
  opacity: "0.924051",
  fill: "#000000",
  fillOpacity: "0.988235"
}}

       x="376.59607"
       y="239.90158"
       id="text18">
        
        <tspan
         sodipodi:role="line"
         id="tspan18"
         x="376.59607"
         y="239.90158"
         style={{
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "bold",
            fontStretch: "normal",
            fontSize: "8px",
            fontFamily: "Arial",
            WebkitFontSmoothing: "antialiased" // for -inkscape-font-specification
          }}
          >To first floor projects</tspan></text> </a>
  </g>
</svg>


         

</div> 


);
}

export default Groundfloor;
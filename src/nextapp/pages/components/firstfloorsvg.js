import React, { useState } from 'react';

function firstfloor() {

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
  <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>



<svg
   version="1.1"
   id="svg1"
   width="100%"
   height="60%"
   viewBox="0 5 521.59998 189.60001"
   sodipodi:docname="firstfloor.svg"
   inkscape:version="1.3.2 (091e20e, 2023-11-25, custom)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlnsXlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs1">
    <rect
       x="20.417133"
       y="53.161593"
       width="52.005906"
       height="13.483013"
       id="rect5" />
  </defs>
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#000000"
     borderopacity="0.25"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:zoom="1.8355495"
     inkscape:cx="292.01065"
     inkscape:cy="103.23884"
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
       width="521.59998"
       height="189.60001"
       preserveAspectRatio="none"
       xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsK&#10;CwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQU&#10;FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCADtAowDASIA&#10;AhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQA&#10;AAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3&#10;ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWm&#10;p6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEA&#10;AwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSEx&#10;BhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElK&#10;U1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3&#10;uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6K+&#10;c/2yPjL4c0j9mz4q22keONKs/EsGi3cMMNnq0SXkcwUqVVVfeHByMDkGvnr9nr9h/wCFvxh+E/g3&#10;Wm+LPjq+8R3+g2Go6rZ6Z4vRjbTywI8imMIzRgOzDDcjGKAP0Ror47/4df8Aw8/6KD8Uf/Cn/wDt&#10;VH/Dr/4ef9FB+KP/AIU//wBqoA+xKK+O/wDh1/8ADz/ooPxR/wDCn/8AtVH/AA6/+Hn/AEUH4o/+&#10;FP8A/aqAPsSivjv/AIdf/Dz/AKKD8Uf/AAp//tVH/Dr/AOHn/RQfij/4U/8A9qoA+xKK+O/+HX/w&#10;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&#10;"
       id="image1"
       style={{ opacity: 1 }}
 />
      <a href="/l128page">

<path
     onMouseEnter={() => handleMouseEnter('pathl128')}
     onMouseLeave={() => handleMouseLeave('pathl128')}
     style={{
        opacity: hoveredPaths.includes('pathl128') ? 1 : 0, 
        fill: '#000000',
        stroke: hoveredPaths.includes('pathl128') ? '#063970' : 'none', 
        strokeWidth: hoveredPaths.includes('pathl128') ? 2 : 0, 
        transition: 'opacity 0.3s ease'     }}

       d="m 87.712153,36.365132 h -6.80995 l 0.204299,4.766965 h -2.247284 v -4.766965 l -14.505193,-0.136199 0.0681,4.766965 -2.451582,-0.136199 -0.0681,-4.358368 -54.6157977,-0.204299 -0.068099,145.256228 0.068099,0.6129 80.8341037,-0.0681 z"
       id="pathl128" />
       </a>

      <a href="/l125page">
    <path
        onMouseEnter={() => handleMouseEnter('pathl125')}
        onMouseLeave={() => handleMouseLeave('pathl125')}
        style={{
           opacity: hoveredPaths.includes('pathl125') ? 1 : 0, 
           fill: '#000000',
           stroke: hoveredPaths.includes('pathl125') ? '#063970' : 'none', 
           strokeWidth: hoveredPaths.includes('pathl125') ? 2 : 0, 
           transition: 'opacity 0.3s ease'     }}
       d="m 97.58658,36.228933 -7.286646,0.0681 0.0681,145.460527 86.486366,-0.1362 -0.2043,-31.05337 h -4.76697 v -1.77059 l 4.56267,-0.1362 0.0681,-14.77759 h -4.69887 v -2.24728 h 4.83507 l -0.2043,-95.271197 -62.31104,-0.0681 0.0681,4.698866 h -2.38348 V 36.297032 H 99.152869 l 0.0681,4.630766 h -1.770587 z"
       id="pathl125" />

       </a>

       <a href="/l114page">

    <path
       onMouseEnter={() => handleMouseEnter('pathl114')}
       onMouseLeave={() => handleMouseLeave('pathl114')}
       style={{
          opacity: hoveredPaths.includes('pathl114') ? 1 : 0, 
          fill: '#000000',
          stroke: hoveredPaths.includes('pathl114') ? '#063970' : 'none', 
          strokeWidth: hoveredPaths.includes('pathl114') ? 2 : 0, 
          transition: 'opacity 0.3s ease'     }}

       d="m 364.67281,8.9891337 -90.29993,-0.0681 -0.0681,122.9195963 h 2.65588 l -0.0681,1.90678 -2.65588,-0.0681 -0.0681,15.04999 2.99638,-0.0681 -0.1362,2.04299 -2.58778,-0.1362 0.0681,3.26878 90.16373,0.20429 -0.0681,-3.54117 -2.99638,0.0681 v -1.90679 l 2.72398,-0.0681 0.2043,-14.77759 -2.86018,0.1362 -0.1362,-2.24728 3.06448,-0.0681 z"
       id="l114" />

      </a>

   <a href="/l101page">

    <path
        onMouseEnter={() => handleMouseEnter('pathl101')}
        onMouseLeave={() => handleMouseLeave('pathl101')}
        style={{
           opacity: hoveredPaths.includes('pathl101') ? 1 : 0, 
           fill: '#000000',
           stroke: hoveredPaths.includes('pathl101') ? '#063970' : 'none', 
           strokeWidth: hoveredPaths.includes('pathl101') ? 2 : 0, 
           transition: 'opacity 0.3s ease'     }}

       d="m 515.5813,8.7848352 0.0681,144.5071348 -93.84111,0.2724 -0.1362,-3.06448 h 3.06448 v -1.90679 l -3.13258,0.0681 v -14.91379 h 3.33688 l -0.0681,-2.04298 h -3.13258 L 421.67209,8.8529347 Z"
       id="path4" />
       </a>
    <text
       xml:space="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontStretch: "normal",
  fontSize: "10.0227px",
  fontFamily: "Arial",
  WebkitFontSmoothing: "antialiased",  
  inlineSize: "45.7462",
  display: "inline",
  opacity: 0.971154,
  fill: "#f9f9f9"
}}

       x="104.05603"
       y="121.4895"
       id="text7-58"
       transform="matrix(1.148232,0,0,1.2484396,178.82816,-108.67107)"><tspan
         x="104.05603"
         y="121.4895"
         id="tspan3"><tspan
           style={{ fontWeight: "bold" }}

           id="tspan1">L1.14</tspan></tspan></text>
    <text
       xml:space="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontStretch: "normal",
  fontSize: "10.0227px",
  fontFamily: "Arial",
  WebkitFontSmoothing: "antialiased",  
  inlineSize: "45.7462",
  display: "inline",
  opacity: 0.971154,
  fill: "#f9f9f9"
}}

       x="104.05603"
       y="121.4895"
       id="text7-2"
       transform="matrix(1.148232,0,0,1.2484396,332.18653,-107.9045)"><tspan
         x="104.05603"
         y="121.4895"
         id="tspan5"><tspan
           style={{ fontWeight: "bold" }}

           id="tspan4">L1.01</tspan></tspan></text>
    <text
       xml:space="preserve"
       style={{
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "normal",
        fontStretch: "normal",
        fontSize: "9.71404px",
        fontFamily: "Arial",
        WebkitFontSmoothing: "antialiased", 
        whiteSpace: "pre",
        inlineSize: "45.7462",
        display: "inline",
        opacity: 0.971154,
        fill: "#f9f9f9"
      }}
      
       x="104.05603"
       y="121.4895"
       id="text7-5"
       transform="matrix(1.222348,0,0,1.2484396,-98.504324,-67.598808)"><tspan
         x="104.05603"
         y="121.4895"
         id="tspan12"><tspan
           style={{ fontWeight: "bold",
           fill: "#f9f9f9"
        }}

           id="tspan8">L1.28</tspan></tspan></text>
    
    <text
       xml:space="preserve"
style={{
  opacity: 0.455128,
  fill: "#ffffff"
}}
       x="120.39993"
       y="78.450615"
       id="text6"><tspan
         sodipodi:role="line"
         id="tspan6"
         x="120.39993"
         y="78.450615"
        style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "bold",
  fontStretch: "normal",
  fontFamily: "Arial",
  WebkitFontSmoothing: "antialiased", 
  opacity: 0.971154,
  fill: "#f9f9f9"
}}
 /></text>
    <text
       xml:space="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontStretch: "normal",
  fontSize: "10.0227px",
  fontFamily: "Arial",
  WebkitFontSmoothing: "antialiased",  
  inlineSize: "45.7462",
  display: "inline",
  opacity: 0.971154,
  fill: "#f9f9f9"
}}

       x="104.05603"
       y="121.4895"
       id="text7"
       transform="matrix(1.148232,0,0,1.2484396,-5.7545565,-67.265321)"><tspan
         x="104.05603"
         y="121.4895"
         id="tspan17"><tspan
           style={{ fontWeight: "bold" }}

           id="tspan16">L1.25</tspan></tspan></text>
    <text
       xml:space="preserve"
       style={{
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: "normal",
        fontStretch: "normal",
        fontFamily: "Arial",
        WebkitFontSmoothing: "antialiased",   
        opacity: 0.971154,
        fill: "#f9f9f9"
      }}
      
       x="26.150208"
       y="119.31032"
       id="text8"><tspan
         sodipodi:role="line"
         x="26.150208"
         y="119.31032"
         id="tspan10"
         style={{ fontSize: "10.6667px" }}
>Projects</tspan><tspan
         sodipodi:role="line"
         x="26.150208"
         y="134.31032"
         id="tspan11"
         style={{ fontSize: "10.6667px" }}
> 71-101</tspan><tspan
         sodipodi:role="line"
         x="26.150208"
         y="149.31032"
         id="tspan9" /></text>
    <text
       xml:space="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontStretch: "normal",
  fontSize: "10.6667px",
  fontFamily: "Arial",
  WebkitFontSmoothing: "antialiased",   
  opacity: 0.971154,
  fill: "#f9f9f9",
  strokeWidth: "1.01906"
}}

       x="107.95602"
       y="121.58383"
       id="text12"
       transform="scale(1.0190554,0.98130092)"><tspan
         sodipodi:role="line"
         x="107.95602"
         y="121.58383"
         id="tspan13"
         style={{
  fontSize: "10.6667px",
  strokeWidth: "1.01906"
}}
>Projects</tspan><tspan
         sodipodi:role="line"
         x="107.95602"
         y="134.91721"
         id="tspan14"
         style={{
  fontSize: "10.6667px",
  strokeWidth: "1.01906"
}}
>102-142</tspan></text>
    <text
       xml:space="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontStretch: "normal",
  fontSize: "10.6667px",
  fontFamily: "Arial",
  WebkitFontSmoothing: "antialiased",   
  opacity: 0.971154,
  fill: "#f9f9f9"
}}

       x="294.27603"
       y="88.045036"
       id="text12-8"><tspan
         sodipodi:role="line"
         id="tspan12-8"
         x="294.27603"
         y="88.045036"
         style={{ fontSize: "10.6667px" }}
>Projects</tspan><tspan
         sodipodi:role="line"
         x="294.27603"
         y="101.37841"
         id="tspan13-3"
         style={{ fontSize: "10.6667px" }}
>143-172</tspan></text>
    <text
       xml:space="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontStretch: "normal",
  fontSize: "10.6667px",
  fontFamily: "Arial",
  WebkitFontSmoothing: "antialiased",   
  opacity: 0.971154,
  fill: "#f9f9f9"
}}

       x="448.4552"
       y="88.597084"
       id="text12-4"><tspan
         sodipodi:role="line"
         id="tspan12-4"
         x="448.4552"
         y="88.597084"
         style={{ fontSize: "10.6667px" }}
>Projects</tspan><tspan
         sodipodi:role="line"
         x="448.4552"
         y="101.93046"
         id="tspan13-6"
         style={{ fontSize: "10.6667px" }}
>173-207</tspan></text>
    <text
       xml:space="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontStretch: "normal",
  fontSize: "8.66667px",
  fontFamily: "Arial",
  WebkitFontSmoothing: "antialiased",   
  opacity: 0.971154,
  fill: "#f9f9f9"
}}

       x="206.47769"
       y="172.70032"
       id="text15"><tspan
         sodipodi:role="line"
         id="tspan15"
         x="206.47769"
         y="172.70032"
         style={{
  fontSize: "8.66667px",
  fill: "#000000"
}}
>Mens</tspan></text>
    <text
       xml:space="preserve"
       style={{
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  fontStretch: "normal",
  fontSize: "8.66667px",
  fontFamily: "Arial",
  WebkitFontSmoothing: "antialiased",   
  opacity: 0.971154,
  fill: "#f9f9f9"
}}

       x="370.57391"
       y="172.72504"
       id="text15-5"><tspan
         sodipodi:role="line"
         id="tspan15-8"
         x="370.57391"
         y="172.72504"
         style={{
  fontSize: "8.66667px",
  fill: "#000000"
}}
>Ladies</tspan></text>
  </g>
</svg>



         

</div> 


);
}

export default firstfloor;
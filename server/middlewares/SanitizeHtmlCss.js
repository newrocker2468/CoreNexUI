const sanitizeHtml = require("sanitize-html");


function SanitizeHtmlCss(req, res, next) {

  const htmlSanitizeOptions = {
        parser: {
      lowerCaseAttributeNames: false
    },
    allowedTags: [
      "button",
      "a",
      "input",
      "div",
      "svg",
      "path",
      "img",
      "span",
      "label",
      "form",
      "fieldset",
      "legend",
      "select",
      "option",
      "rect",
      "textarea",
      "progress",
      "datalist",
      "output",
      "details",
      "summary",
      "figure",
      "figcaption",
      "picture",
      "source",
      "track",
      "audio",
      "video",
      "canvas",
      "noscript",
      "map",
      "area",
      "math",
      "meter",
      "time",
      "mark",
    ],
    allowedAttributes: {
      "*": ["class", "id", "name", "style"],
      path: ['d', 'fill'],
      rect: ['x', 'y', 'width', 'height', 'fill'],
      a: ["href", "name", "target", "rel"],
      
      button: [
        "name",
        "type",
        "disabled",
        "value",
        "form",
        "formaction",
        "formenctype",
        "formmethod",
        "formnovalidate",
        "formtarget",
      ],
      input: [
        "type",
        "name",
        "placeholder",
        "value",
        "checked",
        "disabled",
        "readonly",
        "required",
        "size",
        "maxlength",
        "minlength",
        "pattern",
        "step",
        "list",
        "min",
        "max",
        "autocomplete",
        "multiple",
      ],
      div: ["data-role", "data-bind", "aria-*"],
      svg: [
        "width",
        "height",
        "viewBox",
        "xmlns",
        "fill",
        "version",
        "x",
        "y",
        "preserveAspectRatio",
      ],
      img: [
        "src",
        "alt",
        "title",
        "width",
        "height",
        "srcset",
        "sizes",
        "usemap",
        "ismap",
        "loading",
      ],
      span: ["role", "aria-*"],
      label: ["for", "form"],
      form: [
        "action",
        "method",
        "enctype",
        "accept-charset",
        "autocomplete",
        "novalidate",
        "target",
      ],
      select: ["name", "size", "disabled", "required", "multiple", "form"],
      option: ["value", "selected", "disabled", "label"],
      textarea: [
        "name",
        "rows",
        "cols",
        "disabled",
        "readonly",
        "required",
        "maxlength",
        "minlength",
        "wrap",
        "form",
      ],
      progress: ["value", "max"],
      datalist: ["id"],
      output: ["for", "form", "name"],
      details: ["open"],
      summary: [],
      figure: [],
      figcaption: [],
      picture: [],
      source: ["src", "type", "srcset", "sizes", "media"],
      track: ["default", "kind", "label", "src", "srclang"],
      audio: ["src", "controls", "autoplay", "loop", "muted", "preload"],
      video: [
        "src",
        "controls",
        "autoplay",
        "loop",
        "muted",
        "preload",
        "width",
        "height",
        "poster",
      ],
      canvas: ["width", "height"],
      script: ["type", "src", "async", "defer", "crossorigin", "integrity"],
      noscript: [],
      iframe: [
        "src",
        "width",
        "height",
        "name",
        "sandbox",
        "seamless",
        "allow",
        "allowfullscreen",
        "frameborder",
        "loading",
      ],
      map: ["name"],
      area: ["shape", "coords", "href", "alt", "target"],
      math: [],
      meter: ["value", "min", "max", "low", "high", "optimum"],
      time: ["datetime"],
      mark: [],
    },
    exclusiveFilter: (frame) => {
      return frame.tag === "img" && !frame.attribs.src;
    },
  };


  if (req.body.html) {
    req.body.html = sanitizeHtml(req.body.html, htmlSanitizeOptions);
  }


  if (req.body.css) {
    req.body.css = req.body.css.replace(/@import\s+[^;]+;/gi, ""); // Remove @import statements
    req.body.css = req.body.css.replace(/url\((.*?)\)/gi, ""); // Remove url()

  }

  next();
}

module.exports = SanitizeHtmlCss;

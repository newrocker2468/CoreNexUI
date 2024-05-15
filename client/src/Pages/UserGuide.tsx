const UserGuide = () => {
  const sectionStyle = { margin: "0 0 2rem 0" } as const;
  const ulStyle = {
    margin: "1rem",
    gap: "1rem",
    listStyleType: "disc",
    paddingLeft: "1.25rem",
  } as const;

  const pStyle = {
    margin: "10px 5rem",
    display: "flex",
    flexDirection: "column" ,
    gap: "0.5rem",
    alignItems: "center",
  } as const;
  const liStyle ={
    margin:"1rem"
  }

  return (
    <div className='user-guide flex justify-center items-center flex-col'>
      <h1 className='font-bold '>User Guide: Safe HTML and CSS Practices</h1>
      <section style={sectionStyle}>
        <h2 className='text-center font-bold'>Introduction</h2>
        <p style={pStyle}>
          When creating content for the web, it’s important to use HTML and CSS
          safely to ensure that your website remains secure and functions as
          intended. This guide outlines the best practices for using HTML and
          CSS within our platform, based on our sanitization rules.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 className='text-center font-bold'>HTML Elements and Attributes</h2>
        <p style={pStyle}>
          Our platform supports a wide range of HTML elements, each with
          specific attributes that you can use to create rich and interactive
          content. Below is a list of some commonly used elements and the
          attributes that are safe to use:
        </p>

        <h3 className='text-center font-bold'>Basic Elements</h3>
        <ul style={ulStyle}>
          <li > 
            <strong>Divs</strong>: Use <code>div</code> elements to structure
            your content. You can assign classes, IDs, and styles for layout and
            design. <span style={{ color: "green" }}>✅</span>
          </li>
          <li style={liStyle}>
            <strong>Spans</strong>: Ideal for styling small sections of text or
            inline elements. They support classes, roles, and ARIA attributes
            for accessibility. <span style={{ color: "green" }}>✅</span>
          </li>
          <li style={liStyle}>
            <strong>Images</strong>: To include images, use the <code>img</code>{" "}
            tag with attributes like <code>src</code>, <code>alt</code>,{" "}
            <code>title</code>, and dimensions. Ensure your images are hosted on
            trusted sources. <span style={{ color: "green" }}>✅</span>
          </li>
        </ul>

        <h3 className='text-center font-bold'>Form Elements</h3>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong>Buttons</strong>: Create clickable buttons with the{" "}
            <code>button</code> tag. Define button types, names, and other
            form-related attributes. <span style={{ color: "green" }}>✅</span>
          </li>
          <li style={liStyle}>
            <strong>Inputs</strong>: Use <code>input</code> elements for user
            inputs. Specify the input type (text, checkbox, radio, etc.), and
            include validation attributes like <code>required</code> and{" "}
            <code>pattern</code>. <span style={{ color: "green" }}>✅</span>
          </li>
          <li style={liStyle}>
            <strong>Textareas</strong>: For multi-line text inputs,{" "}
            <code>textarea</code> is your go-to element. Control its size and
            limitations with attributes like <code>rows</code> and{" "}
            <code>maxlength</code>. <span style={{ color: "green" }}>✅</span>
          </li>
        </ul>

        <h3 className='text-center font-bold'>Media Elements</h3>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong>Audio and Video</strong>: Embed media using{" "}
            <code>audio</code> and <code>video</code> tags. Control playback
            with attributes like <code>autoplay</code>, <code>controls</code>,
            and <code>loop</code>. <span style={{ color: "green" }}>✅</span>
          </li>
          <li style={liStyle}>
            <strong>Canvas</strong>: Draw graphics on the fly with the{" "}
            <code>canvas</code> element. Define its width and height to set up
            your drawing area. <span style={{ color: "green" }}>✅</span>
          </li>
        </ul>

        <h3 className='text-center font-bold'>Structural Elements</h3>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong>Forms</strong>: Group your input elements within a{" "}
            <code>form</code> tag. Set up form actions, methods, and other
            settings to control data submission.{" "}
            <span style={{ color: "green" }}>✅</span>
          </li>
          <li style={liStyle}>
            <strong>Tables</strong>: Although not listed in the allowed tags,
            tables can be used for tabular data. Use <code>table</code>,{" "}
            <code>tr</code>, <code>td</code>, and related tags to create grids.{" "}
            <span style={{ color: "red" }}> ✅</span>
            {/* <span style={{ color: "red" }}> ❌</span> */}
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 className='text-center font-bold'>CSS Best Practices</h2>
        <p style={pStyle}>
          CSS is used to style your HTML content. To maintain security, follow
          these guidelines:
        </p>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong>Inline Styles</strong>: Apply styles directly to elements
            using the <code>style</code> attribute when necessary. Keep in mind
            that external stylesheets are preferred for maintainability.{" "}
            <span style={{ color: "green" }}>✅</span>
          </li>
          <li style={liStyle}>
            <strong>Classes and IDs</strong>: Use classes and IDs to apply
            styles defined in external stylesheets or within <code>style</code>{" "}
            tags in the head of your document.{" "}
            <span style={{ color: "green" }}>✅</span>
          </li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 className='text-center font-bold'>Security Measures</h2>
        <p style={pStyle}>
          Our platform employs a sanitization middleware to ensure that the
          content you create is safe and secure. Here’s how it works:
        </p>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <strong>Sanitization Process</strong>: When you submit HTML or CSS
            content, our system automatically removes any unsafe tags,
            attributes, or properties. This process is designed to prevent
            security vulnerabilities such as Cross-Site Scripting (XSS) attacks.{" "}
            <span style={{ color: "green" }}>✅</span>
          </li>
          <li style={liStyle}>
            <strong>Allowed Content</strong>: The middleware allows a wide range
            of HTML elements and attributes that are considered safe for web
            content creation. It ensures that only non-harmful tags and
            attributes are permitted. <span style={{ color: "green" }}>✅</span>
          </li>
          <li style={liStyle}>
            <strong>CSS Safety</strong>: In CSS, potentially harmful properties
            like <code>@import</code> and <code>url()</code> are removed to
            prevent the loading of malicious resources.{" "}
            <span style={{ color: "green" }}>✅</span>
          </li>
        </ul>
      </section>

      <div className='container mx-auto p-4'>
        <h1 className='text-center text-xl font-bold mb-6'>
          What Not To Do<span style={{ color: "red" }}> ❌</span>
        </h1>

        <section className='mb-4'>
          <h2 className='text-xl font-semibold mb-2'>Prohibited Practices</h2>
          <p className='text-gray-700 mb-2'>
            To ensure the safety and integrity of our platform, please avoid the
            following:
          </p>
          <ul className='list-disc pl-5'>
            <li className='mb-1'>
              <span style={{ color: "red" }}> ❌</span>Submitting code that
              attempts to interact with our backend services or databases.
            </li>
            <li className='mb-1'>
              <span style={{ color: "red" }}> ❌</span>Using any form of
              scripting that could interfere with the normal operation of the
              website.
            </li>
            <li className='mb-1'>
              <span style={{ color: "red" }}> ❌</span> Embedding external
              resources that are not approved by our platform.
            </li>
            <li className='mb-1'>
              <span style={{ color: "red" }}> ❌</span>Attempting to inject
              styles or scripts that could compromise the user experience.
            </li>
            <li className='mb-1'>
              <span style={{ color: "red" }}> ❌</span> Including any content
              that violates our community standards or terms of service.
            </li>
          </ul>
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-2'>General Security Tips</h2>
          <p className='text-gray-700 mb-2'>
            Keep these tips in mind when creating content:
          </p>
          <ul className='list-disc pl-5'>
            <li className='mb-1'>
              Always respect the privacy and rights of others.
            </li>
            <li className='mb-1'>
              Ensure that your submissions do not contain sensitive personal
              information.
            </li>
            <li className='mb-1'>
              Be mindful of the size and type of content you upload to avoid
              impacting site performance.
            </li>
          </ul>
        </section>
        <section style={sectionStyle}>
          <h1 className='text-center font-bold text-3xl'>Conclusion</h1>
          <p style={pStyle}>
            By adhering to the guidelines provided in this user guide, you can
            create content confidently, knowing that it will be both safe and
            functional. Remember to always preview your content within our
            platform to ensure it appears as expected after the sanitization
            process.
          </p>
          <p style={pStyle}>
            For a complete list of allowed HTML elements and attributes, please
            refer to our comprehensive documentation or contact our support
            team.
          </p>
        </section>
      </div>
    </div>
  );
};

export default UserGuide;

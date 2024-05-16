import "@/Styles/NotFoundPage.css";
export default function NotFoundPage() {
  return (
<div className="container">
  <form className="four-oh-four-form">
    <input type="text" className="404-input"/>
  </form>

  <div className="terminal">
      <p className="prompt">The page you requested cannot be found right meow. Try typing 'kittens'.</p>
      <p className="prompt output new-output"></p>
  </div>
</div>
  );
}
import "../Styles/Loader.css";
export default function  Loader(){
    return (
      <>
        <div className='flex justify-center items-center w-[100dvw] h-[70dvh] '>
          <div className='loader'>
            <p>Loading</p>
            <div className='words'>
              <span className='word'>Buttons</span>
              <span className='word'>Forms</span>
              <span className='word'>Switches</span>
              <span className='word'>Cards</span>
              <span className='word'>Loaders</span>
              <span className='word'>Inputs</span>
              <span className='word'>Check Boxes</span>
              <span className='word'>Radio Buttons</span>
              <span className='word'>Tooltips</span>
              <span className='word'>Patterns</span>
              <span className='word'></span>
            </div>
          </div>
        </div>
      </>
    );
}
import { useCallback, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavComponent.module.css';

export default function Navbar():JSX.Element{
  const location = useLocation();

  const callBackSetCursorWhenPageRefresh = useCallback(() =>{
    setTimeout(() => {
      let path:string = location.pathname;
      
      if(ulRef.current){
        switch(path){
          case "/":
            setCursorBelow(ulRef.current.childNodes[0]);
            break;
          case "/dashboard":
            setCursorBelow(ulRef.current.childNodes[2]);
            break;
        }
      }
    }, 0);
  },[location.pathname]);

  const callbackRef = useCallback((node: HTMLElement) => {
    if(node){
      callBackSetCursorWhenPageRefresh();
    }
  },[callBackSetCursorWhenPageRefresh]); 

  useEffect(() => {
    window.addEventListener('resize', callBackSetCursorWhenPageRefresh);
    
    return () => {
      window.removeEventListener('resize', callBackSetCursorWhenPageRefresh);
    }
  }, [callBackSetCursorWhenPageRefresh]); 

  const cursorRef = useRef<HTMLSpanElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const setCursorBelow = (element:EventTarget | ChildNode) =>{
    let HTMLElement:Element = element as Element;

    let positionLeft = HTMLElement.getBoundingClientRect().left + 24 - 6;
    //let middle = Math.floor(HTMLElement.getBoundingClientRect().width / 2);
    //let position = positionLeft + middle;
    let width = HTMLElement.getBoundingClientRect().width - 24 - 4;
    if(cursorRef.current){
      cursorRef.current.style.transform = "translateX("+ positionLeft +"px)";
      cursorRef.current.style.width = width.toString()+"px";
      cursorRef.current.style.opacity = "1";
    }
  }

  return(
      <nav ref={callbackRef} className={styles.nav}>
        
        <div>
          <ul ref={ulRef}>
            <li onClick={(e) => setCursorBelow(e.currentTarget)} className="navAccueil">
              <Link to="/">
                  <span className="material-icons ">home</span>ACCUEIL
              </Link>
            </li>
            
            <li onClick={(e) => setCursorBelow(e.currentTarget)} className="navDoc">
              <Link to="">
                <span className="material-icons ">library_books</span>DOCUMENTATION
              </Link>
            </li>
            
            <li onClick={(e) => setCursorBelow(e.currentTarget)} className="navDashboard">
              <Link to="/dashboard">
                <span className='material-icons'>space_dashboard</span>DASHBOARD
              </Link>
            </li>
          </ul>
        </div>
        <span ref={cursorRef} className={styles.cursor}></span>
      </nav>
    )
  }
import '../components.css';
import { Link } from 'react-router-dom';

export default function Bookingbutton() {
    return (
      <button className="button">
        <p className="button__text">
          <span style={{ '--index': 0 } as React.CSSProperties}>B</span>
          <span style={{ '--index': 1 } as React.CSSProperties}>O</span>
          <span style={{ '--index': 2 } as React.CSSProperties}>O</span>
          <span style={{ '--index': 3 } as React.CSSProperties}>K</span>
          <span style={{ '--index': 4 } as React.CSSProperties}></span>
          <span style={{ '--index': 5 } as React.CSSProperties}>N</span>
          <span style={{ '--index': 6 } as React.CSSProperties}>O</span>
          <span style={{ '--index': 7 } as React.CSSProperties}>W</span>
          <span style={{ '--index': 8 } as React.CSSProperties}></span>
          <span style={{ '--index': 9 } as React.CSSProperties}>B</span>
          <span style={{ '--index': 10 } as React.CSSProperties}>O</span>
          <span style={{ '--index': 11 } as React.CSSProperties}>O</span>
          <span style={{ '--index': 12 } as React.CSSProperties}>K</span>
          <span style={{ '--index': 13 } as React.CSSProperties}></span>
          <span style={{ '--index': 14 } as React.CSSProperties}>N</span>
          <span style={{ '--index': 15 } as React.CSSProperties}>O</span>
          <span style={{ '--index': 16 } as React.CSSProperties}>W</span>
          <span style={{ '--index': 17 } as React.CSSProperties}></span>
        </p>
<Link to="/booktable">
        <div className="button__circle">
          <svg
            width="14"
            className="button__icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path
              fill="currentColor"
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            ></path>
          </svg>
          <svg
            className="button__icon button__icon--copy"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            fill="none"
            viewBox="0 0 14 15"
          >
            <path
              fill="currentColor"
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            ></path>
          </svg>
        </div>
</Link>
      </button>
    );
}

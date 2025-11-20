import '../components.css';

export default function Bookingbutton() {
    return (
<button class="button">
<p class="button__text">
    <span style={{"--index: 0;"}}>B</span>
    <span style={{"--index: 1;"}}>O</span>
    <span style={{"--index: 2;"}}>O</span>
    <span style={{"--index: 3;"}}>K</span>
    <span style={{"--index: 4;"}}></span>
    <span style={{"--index: 5;"}}>N</span>
    <span style={{"--index: 6;"}}>O</span>
    <span style={{"--index: 7;"}}>W</span>
    <span style={{"--index: 8;"}}></span>
    <span style={{"--index: 9;"}}>B</span>
    <span style={{"--index: 10;"}}>O</span>
    <span style={{"--index: 11;"}}>O</span>
    <span style={{"--index: 12;"}}>K</span>
    <span style={{"--index: 13;"}}></span>
    <span style={{"--index: 14;"}}>N</span>
    <span style={{"--index: 15;"}}>O</span>
    <span style={{"--index: 16;"}}>W</span>
    <span style={{"--index: 17;"}}></span>
</p>

  <div class="button__circle">
    <svg
      width="14"
      class="button__icon"
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
      class="button__icon button__icon--copy"
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
</button>

    );
}
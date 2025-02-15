"use client"
// app/page.js
import Link from 'next/link'


import React from'react';
import {useRef} from'react';

export default function Home() {
  // -------------------------------------
  let firstName = useRef();
  let lastName = useRef();

  const change = () => {
    let fName = firstName.current.value;
    let lName = lastName.current.value;
    
    alert(fName + lName);
    // myImg.current.src="https://placehold.co/600x400/000000/FFF";
    // myImg.current.setAttribute('height','200px');
    // myImg.current.setAttribute('width','300px');
    
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Welcome to My Blog</h1>
      <p>
        <Link href="/blog">Go to Blog</Link>
      </p>
      <div>
        <input ref={firstName} placeholder='FirstName' /> <br />
        <input ref={lastName} placeholder='LastName' /> <br />

        <button onClick={change}>Click</button>
      </div>
    </main>
    
  )
}

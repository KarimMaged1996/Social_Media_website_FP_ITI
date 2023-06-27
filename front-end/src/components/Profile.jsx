import React from 'react'

export  function Profile() {
  return (
        <main className="profile-page layout layout--3 text-white ">
   
   <div className="container">
    {/* Topics Start */}
    <div className="topics my-3">
    <div className="topics__header">
      <h2>Your Communities</h2>
    </div>
    
    <ul className="topics__list">
      <li>
        <a href="/" className="active">All <span>553</span></a>
      </li>
      <li>
        <a href="/">Python <span>232</span></a>
      </li>
      <li>
        <a href="/">JavaScript <span>122</span></a>
      </li>
      <li>
        <a href="/">React <span>57</span></a>
      </li>
      <li>
        <a href="/">Database <span>90</span></a>
      </li>
    </ul>
    <button className="btn btn--link" href="/">
      More
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <title>chevron-down</title>
        <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
      </svg>
    </button>
    </div>
{/* Topics End */}


     {/* Room List Start */}
     <div className="roomList my-3">
       <div className="profile">
         <div className="profile__avatar">
           <div className="avatar avatar--large active">
             <img src="https://randomuser.me/api/portraits/men/11.jpg" />
           </div>
         </div>
         <div className="profile__info">
           <h3>Karim Maged</h3>

           <div style={{ fontSize: '2rem' }}>Techbin: <span>250</span></div>

           <a href="edit-user.html" className="btn btn--main btn--pill text-white">Edit Profile</a>
         </div>
         <div className="profile__about">
           <h3>About</h3>
           <p>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illo tenetur facilis sunt nemo
             debitis quisquam hic atque aut? Ducimus alias placeat optio accusamus repudiandae quis ab ex
             exercitationem rem?
           </p>
         </div>
       </div>

       <div className="roomListRoom">
         <div className="roomListRoom__header">
           <a href="profile.html" className="roomListRoom__author text-decoration-none">
             <div className="avatar avatar--small active">
               <img src="https://randomuser.me/api/portraits/men/11.jpg" />
             </div>
             <span>@dennis_ivy</span>
           </a>
           <div className="roomListRoom__actions">
             <span>3 days ago</span>
           </div>
         </div>
         <div className="roomListRoom__content">
           <a href="room.html">100 Days of coding challenge</a>
           <p>
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur ducimus harum dolorem, obcaecati
             mollitia omnis quasi aut consequuntur enim itaque labore.
           </p>
         </div>
         <div className="roomListRoom__meta">
           <a className="roomListRoom__joined">
             <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
               <title>user-group</title>
               <path
                 d="M30.539 20.766c-2.69-1.547-5.75-2.427-8.92-2.662 0.649 0.291 1.303 0.575 1.918 0.928 0.715 0.412 1.288 1.005 1.71 1.694 1.507 0.419 2.956 1.003 4.298 1.774 0.281 0.162 0.456 0.487 0.456 0.85v4.65h-4v2h5c0.553 0 1-0.447 1-1v-5.65c0-1.077-0.56-2.067-1.461-2.584z"
               ></path>
               <path
                 d="M22.539 20.766c-6.295-3.619-14.783-3.619-21.078 0-0.901 0.519-1.461 1.508-1.461 2.584v5.65c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-5.651c0-1.075-0.56-2.064-1.461-2.583zM22 28h-20v-4.65c0-0.362 0.175-0.688 0.457-0.85 5.691-3.271 13.394-3.271 19.086 0 0.282 0.162 0.457 0.487 0.457 0.849v4.651z"
               ></path>
               <path
                 d="M19.502 4.047c0.166-0.017 0.33-0.047 0.498-0.047 2.757 0 5 2.243 5 5s-2.243 5-5 5c-0.168 0-0.332-0.030-0.498-0.047-0.424 0.641-0.944 1.204-1.513 1.716 0.651 0.201 1.323 0.331 2.011 0.331 3.859 0 7-3.141 7-7s-3.141-7-7-7c-0.688 0-1.36 0.131-2.011 0.331 0.57 0.512 1.089 1.075 1.513 1.716z"
               ></path>
               <path
                 d="M12 16c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.859 0-7 3.141-7 7s3.141 7 7 7zM12 4c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5c0-2.757 2.243-5 5-5z"
               ></path>
             </svg>
             5.3k Joined
           </a>
           <p className="roomListRoom__topic">Python</p>
         </div>
       </div>
       <div className="roomListRoom">
         <div className="roomListRoom__header">
           <a href="profile.html" className="roomListRoom__author">
             <div className="avatar avatar--small">
               <img src="https://randomuser.me/api/portraits/women/11.jpg" />
             </div>
             <span>@sulamita_ivy</span>
           </a>
           <div className="roomListRoom__actions">
             <span>5 days ago</span>
           </div>
         </div>
         <div className="roomListRoom__content">
           <a href="room.html">JavaScript made Simple</a>
           <p>
             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur ducimus harum dolorem, obcaecati
             mollitia omnis quasi aut consequuntur enim itaque labore.
           </p>
         </div>
         <div className="roomListRoom__meta">
           <a href="room.html" className="roomListRoom__joined">
             <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
               <title>user-group</title>
               <path
                 d="M30.539 20.766c-2.69-1.547-5.75-2.427-8.92-2.662 0.649 0.291 1.303 0.575 1.918 0.928 0.715 0.412 1.288 1.005 1.71 1.694 1.507 0.419 2.956 1.003 4.298 1.774 0.281 0.162 0.456 0.487 0.456 0.85v4.65h-4v2h5c0.553 0 1-0.447 1-1v-5.65c0-1.077-0.56-2.067-1.461-2.584z"
               ></path>
               <path
                 d="M22.539 20.766c-6.295-3.619-14.783-3.619-21.078 0-0.901 0.519-1.461 1.508-1.461 2.584v5.65c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-5.651c0-1.075-0.56-2.064-1.461-2.583zM22 28h-20v-4.65c0-0.362 0.175-0.688 0.457-0.85 5.691-3.271 13.394-3.271 19.086 0 0.282 0.162 0.457 0.487 0.457 0.849v4.651z"
               ></path>
               <path
                 d="M19.502 4.047c0.166-0.017 0.33-0.047 0.498-0.047 2.757 0 5 2.243 5 5s-2.243 5-5 5c-0.168 0-0.332-0.030-0.498-0.047-0.424 0.641-0.944 1.204-1.513 1.716 0.651 0.201 1.323 0.331 2.011 0.331 3.859 0 7-3.141 7-7s-3.141-7-7-7c-0.688 0-1.36 0.131-2.011 0.331 0.57 0.512 1.089 1.075 1.513 1.716z"
               ></path>
               <path
                 d="M12 16c3.859 0 7-3.141 7-7s-3.141-7-7-7c-3.859 0-7 3.141-7 7s3.141 7 7 7zM12 4c2.757 0 5 2.243 5 5s-2.243 5-5 5-5-2.243-5-5c0-2.757 2.243-5 5-5z"
               ></path>
             </svg>
             5.3k Joined
           </a>
           <p className="roomListRoom__topic">Python</p>
         </div>
       </div>
     </div>
     {/* Room List End */}

     {/* Activities Start */}
     <div className="activities my-3">
       <div className="activities__header">
         <h2>Recent Activities</h2>
       </div>
       <div className="activities__box">
         <div className="activities__boxHeader roomListRoom__header">
           <a href="profile.html" className="roomListRoom__author text-decoration-none">
             <div className="avatar avatar--small ">
               <img src="https://randomuser.me/api/portraits/women/11.jpg" />
             </div>
             <p>
               @sulamita_ivy
               <span>5 days ago</span>
             </p>
           </a>
           <div className="roomListRoom__actions">
             <a href="#" className="text-decoration-none">
               <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                 <title>delete</title>
                 <path
                   d="M30 4h-8v-3c0-0.553-0.447-1-1-1h-10c-0.553 0-1 0.447-1 1v3h-8v2h2v24c0 1.104 0.897 2 2 2h20c1.103 0 2-0.896 2-2v-24h2v-2h-0zM12 2h8v2h-8v-2zM26.002 30l-0.002 1v-1h-20v-24h20v24h0.002z"
                 ></path>
               </svg>
             </a>
           </div>
         </div>
         <div className="activities__boxContent">
           <p>replied to post “<a href="room.html">100 Days of code challenge!</a>”</p>
           <div className="activities__boxRoomContent">
             I’ll have to try this sometime. Really like this idea. Wanna talk about it? I ‘m....
           </div>
         </div>
       </div>

       <div className="activities__box">
         <div className="activities__boxHeader roomListRoom__header">
           <a href="profile.html" className="roomListRoom__author">
             <div className="avatar avatar--small active">
               <img src="https://randomuser.me/api/portraits/men/13.jpg" />
             </div>
             <p>
               @mr_spshuvo
               <span>5 days ago</span>
             </p>
           </a>
           <div className="roomListRoom__actions">
             <a href="#">
               <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                 <title>delete</title>
                 <path
                   d="M30 4h-8v-3c0-0.553-0.447-1-1-1h-10c-0.553 0-1 0.447-1 1v3h-8v2h2v24c0 1.104 0.897 2 2 2h20c1.103 0 2-0.896 2-2v-24h2v-2h-0zM12 2h8v2h-8v-2zM26.002 30l-0.002 1v-1h-20v-24h20v24h0.002z"
                 ></path>
               </svg>
             </a>
           </div>
         </div>
         <div className="activities__boxContent">
           <p>replied to post “<a href="room.html">100 Days of code challenge!</a>”</p>
           <div className="activities__boxRoomContent">
             I’ll have to try this sometime. Really like this idea. Wanna talk about it? I ‘m....
           </div>
         </div>
       </div>
     </div>
     {/* Activities End */}
   </div>
 </main>    
  )
}

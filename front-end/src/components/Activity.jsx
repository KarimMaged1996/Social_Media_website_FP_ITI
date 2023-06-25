import React from 'react'

export  function Activity() {
  return (
    <main class="layout text-white">

    <div class="container ">
      <div class="layout__box">
        <div class="layout__boxHeader">
          <div class="layout__boxTitle">
            <a href="index.html">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>arrow-left</title>
                <path
                  d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                ></path>
              </svg>
            </a>
            <h3>Recent Activities</h3>
          </div>
        </div>

        <div class="activities-page layout__body">
          <div class="activities__box">
            <div class="activities__boxHeader roomListRoom__header">
              <a href="profile.html" class="roomListRoom__author">
                <div class="avatar avatar--small">
                  <img src="https://scontent.fcai20-1.fna.fbcdn.net/v/t31.18172-8/1276831_589092761204726_7990303463526666031_o.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=K61Lp5OFy8MAX_SRFMN&_nc_ht=scontent.fcai20-1.fna&oh=00_AfAuhFeQ3UXtMYGTgE1XV3mmDrMp3ve1TRaaud_38-PDcQ&oe=64BFFE96" />
                </div>
                <p>
                  @ِAbanop
                  <span>5 days ago</span>
                </p>
              </a>
              <div class="roomListRoom__actions">
                <a href="#">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>remove</title>
                    <path
                      d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="activities__boxContent">
              <p>replied to post “<a href="room.html">100 Days of code challenge!</a>”</p>
              <div class="activities__boxRoomContent">
                I’ll have to try this sometime. Really like this idea. Wanna talk about it? I ‘m....
              </div>
            </div>
          </div>

          <div class="activities__box">
            <div class="activities__boxHeader roomListRoom__header">
              <a href="profile.html" class="roomListRoom__author">
                <div class="avatar avatar--small active">
                  <img src="https://randomuser.me/api/portraits/men/13.jpg" />
                </div>
                <p>
                  @Amr
                  <span>5 days ago</span>
                </p>
              </a>
              <div class="roomListRoom__actions">
                <a href="#">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                    <title>remove</title>
                    <path
                      d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="activities__boxContent">
              <p>replied to post “<a href="room.html">100 Days of code challenge!</a>”</p>
              <div class="activities__boxRoomContent">
                I’ll have to try this sometime. Really like this idea. Wanna talk about it? I ‘m....
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  </main>
  )
}
